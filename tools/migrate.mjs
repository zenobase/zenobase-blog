import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const BLOG_URL = 'https://blog.zenobase.com';
const POSTS_DIR = join(import.meta.dirname, '..', 'source', '_posts');

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});
turndown.use(gfm);

// Keep iframes (e.g. embedded videos) as-is
turndown.addRule('iframe', {
  filter: 'iframe',
  replacement: (content, node) => node.outerHTML,
});

async function fetchPosts() {
  const allPosts = [];
  const batchSize = 50;
  let start = 0;

  while (true) {
    const url = `${BLOG_URL}/api/read/json?start=${start}&num=${batchSize}`;
    console.log(`Fetching ${url}...`);
    const resp = await fetch(url);
    const text = await resp.text();

    // Strip JSONP wrapper: var tumblr_api_read = {...};
    const jsonStr = text.replace(/^var tumblr_api_read = /, '').replace(/;\s*$/, '').trim();
    let data;
    try {
      data = JSON.parse(jsonStr);
    } catch (err) {
      // Debug: show around the error position
      const pos = err.message.match(/position (\d+)/)?.[1];
      if (pos) {
        const p = parseInt(pos);
        console.error(`Parse error near position ${p}: ...${jsonStr.slice(Math.max(0, p - 50), p + 50)}...`);
      }
      throw err;
    }

    const posts = data.posts || [];
    if (posts.length === 0) break;

    allPosts.push(...posts);
    console.log(`  Got ${posts.length} posts (total: ${allPosts.length}/${data['posts-total']})`);

    if (allPosts.length >= parseInt(data['posts-total'])) break;
    start += batchSize;
  }

  return allPosts;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function downloadImage(imageUrl, assetDir) {
  try {
    const resp = await fetch(imageUrl);
    if (!resp.ok) {
      console.warn(`  Failed to download ${imageUrl}: ${resp.status}`);
      return null;
    }

    const buffer = Buffer.from(await resp.arrayBuffer());
    mkdirSync(assetDir, { recursive: true });

    // Extract filename from URL
    const urlPath = new URL(imageUrl).pathname;
    let filename = urlPath.split('/').pop();
    if (!extname(filename)) filename += '.jpg';

    const filepath = join(assetDir, filename);
    writeFileSync(filepath, buffer);
    return filename;
  } catch (err) {
    console.warn(`  Error downloading ${imageUrl}: ${err.message}`);
    return null;
  }
}

async function processPost(post) {
  const postId = post.id;
  const date = new Date(post['date-gmt']);
  const dateStr = date.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
  const datePrefix = date.toISOString().slice(0, 10);
  const tags = (post.tags || []).map(t => `  - ${t}`).join('\n');
  const type = post.type;

  let title = '';
  let body = '';

  if (type === 'regular') {
    title = post['regular-title'] || '';
    body = post['regular-body'] || '';
  } else if (type === 'photo') {
    title = post['photo-caption'] || `Photo ${postId}`;
    // Get largest photo
    const photoUrl = post['photo-url-1280'] || post['photo-url-500'] || post['photo-url-250'];
    body = post['photo-caption'] || '';
    if (photoUrl) {
      body = `<img src="${photoUrl}" />\n\n${body}`;
    }
  } else if (type === 'video') {
    title = post['video-caption'] || `Video ${postId}`;
    body = (post['video-player'] || '') + '\n\n' + (post['video-caption'] || '');
  } else if (type === 'link') {
    title = post['link-text'] || post['link-url'] || `Link ${postId}`;
    body = `<a href="${post['link-url']}">${post['link-text'] || post['link-url']}</a>\n\n${post['link-description'] || ''}`;
  } else {
    console.warn(`  Unknown post type: ${type} for post ${postId}`);
    title = `Post ${postId}`;
    body = JSON.stringify(post, null, 2);
  }

  // Strip HTML tags from title
  title = title.replace(/<[^>]+>/g, '').trim();
  if (!title) title = `Post ${postId}`;

  const slug = post.slug || slugify(title);
  const postName = `${datePrefix}-${slug}`;
  const assetDir = join(POSTS_DIR, postName);

  // Find and download images in body
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  const imageDownloads = [];

  while ((match = imgRegex.exec(body)) !== null) {
    const imgUrl = match[1];
    if (imgUrl.startsWith('http')) {
      imageDownloads.push({ original: imgUrl, match: match[0] });
    }
  }

  for (const img of imageDownloads) {
    const filename = await downloadImage(img.original, assetDir);
    if (filename) {
      body = body.replace(img.original, filename);
    }
  }

  // Convert HTML to Markdown
  let markdown = turndown.turndown(body);

  // Build frontmatter
  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: ${dateStr}`,
    tags ? `tags:\n${tags}` : '',
    `alias: post/${postId}/index.html`,
    '---',
  ].filter(Boolean).join('\n');

  const content = `${frontmatter}\n\n${markdown}\n`;

  const filename = `${postName}.md`;
  const filepath = join(POSTS_DIR, filename);
  writeFileSync(filepath, content);
  console.log(`  Wrote ${filename} (${type})`);
}

async function main() {
  mkdirSync(POSTS_DIR, { recursive: true });

  console.log('Fetching posts from Tumblr API...');
  const posts = await fetchPosts();
  console.log(`\nProcessing ${posts.length} posts...\n`);

  for (const post of posts) {
    await processPost(post);
  }

  console.log(`\nDone! Migrated ${posts.length} posts.`);
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
