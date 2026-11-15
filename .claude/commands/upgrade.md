# Dependency upgrade pass

Each item below is one commit. PR description: before/after version table,
decisions on any major-version bumps, follow-up notes.

## Policy

- **24-hour cool-down**: do not apply any release less than 24 hours old.
- **Majors**: for each available major-version bump, summarize what changed
  (breaking changes, new features, migration effort) and ask whether to go
  ahead, skip, or defer. Record the decision and reasoning in the PR.
- Run `pnpm audit` to surface CVE findings.

## Verification

There are no tests. Before upgrading, run `pnpm hexo clean && pnpm build` and
copy `public/` to the scratchpad; after each upgrade, clean-build again and
`diff -r` against that copy (incremental builds skip unchanged pages). Expected
noise: the Hexo version in the generator tag, randomized mailto obfuscation, and
tag order on multi-tag posts. Explain or fix any other changes before
committing.

## Upgrades

- **npm packages** in `package.json` (Hexo, its generators/renderers, and
  `turndown*` used by `tools/migrate.mjs`). Hexo rewrites `hexo.version` in
  `package.json` on its own; keep that change in the same commit
- **GitHub Actions** in `.github/workflows/` — third-party actions use exact
  versions, GitHub-provided ones (`actions/*`) use major versions only. After
  editing refs, run `gh actions-lock --no-narrow` (never without `--no-narrow`:
  it rewrites refs) and `gh actions-lock --verify`, and commit
  `.github/workflows/actions.lock` with the workflow change. `gh` needs network
  access to GitHub, so run it outside the sandbox if blocked.
- **Node.js / pnpm** — keep in step with zenobase-web: `.nvmrc`, and the
  `engines` and `packageManager` fields in `package.json` (copy the latter,
  including its hash, from zenobase-web when the versions match)
