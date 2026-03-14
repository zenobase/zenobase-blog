#!/bin/bash
# Organize blog posts into year subfolders based on YYYY-MM-DD- prefix

set -euo pipefail

POSTS_DIR="source/_posts"

cd "$(dirname "$0")/.."

for entry in "$POSTS_DIR"/[0-9][0-9][0-9][0-9]-*; do
  [ -e "$entry" ] || continue
  year="${entry##*/}"
  year="${year:0:4}"

  mkdir -p "$POSTS_DIR/$year"
  mv "$entry" "$POSTS_DIR/$year/"
done

echo "Done. Posts organized by year:"
ls "$POSTS_DIR"
