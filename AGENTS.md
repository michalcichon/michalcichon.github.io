# AGENTS.md

Personal blog: Jekyll site on GitHub Pages (`github-pages` gem, Ruby >= 3.2). See `README.md` for setup.

## Commands
- `./run.sh` – minifies CSS/JS (`reduce.sh`) then `bundle exec jekyll serve` on 127.0.0.1.
- `sh reduce.sh` – regenerates `css/main.min.css` and `js/main.min.js` from `css/main.css` / `js/main.js`.
- `python generate_tags.py` – regenerates the `tag/` pages from post front matter.
- `./generate_icons.sh` – regenerates all favicons from `img/michal.jpeg` (needs ImageMagick).

## Conventions
- **Edit `css/main.css` / `js/main.js`, never the `.min` files**, then run `reduce`. The layout loads `main.min.css`, so forgetting to minify means your change doesn't show up.
- Both `.min` files and generated tag pages are committed.
- `_site/` is build output; don't edit it.
- New posts go in `_posts/` (`YYYY-MM-DD-title.md`) with `tags:` in front matter; run `generate_tags.py` after adding a new tag.
- Layouts: `_layouts/default.html` (head, icons, header) and `_layouts/post.html` (bio, comments, prev/next, footer links).
- Profile photo: `img/michal.jpeg`. It is used in the header and the post bio, and the favicons derive from it. After changing it, run `./generate_icons.sh` (override the face crop with `CROP=WxH+X+Y` if needed).

## CSS gotchas
- `#main-space a:link/:visited` adds a light `border-bottom` to every link. New link or card styles inside `#main-space` need the `#main-space` prefix (and `:link`/`:visited`) to override it.
- Some button rules use `!important` (e.g. `.btn--solid` border, `.post-footer-actions .btn` colour); check specificity before restyling buttons.
- CSS comments are a mix of Polish and English; write new ones in English.

## Style preferences
- Keep the post footer calm: one clear action at most, others as quiet text links.
- Use `relative_url` for internal links in templates.
- Analytics hooks use `data-event` / `data-section` / `data-element` / `data-position` attributes; keep `data-section` accurate for the page it's on.
- No tests or CI exist; verify visual changes with `./run.sh`.
