---
name: seo-guardrails
description: SEO checklist for this blog. Use when adding or editing posts, pages, layouts, images or assets, or when asked about SEO, meta descriptions, titles, image weight, headings or accessibility.
---

# SEO guardrails

These come from the SEOJuice audit of the site (`docs/public-report-*.pdf`). Check them before finishing any content or layout change.

## Meta descriptions and titles
- Every post needs `description:` in front matter, **70-160 characters**. Count it; don't eyeball it. Longer ones get truncated and the audit flags them.
- Descriptions must be unique per page. Don't copy the site description or another post's.
- Keep the post `title:` short. The rendered `<title>` is `page.title | site.title`, and the site title is already ~45 characters. The audit flagged one at 125; aim for <= 70 where possible.
- Pages without front matter (new `.html`, `.md` outside `_posts/`) need `title:` and `description:`.
- Paginated pages (`/blog/2/` ...) get " – page N" appended in `_layouts/default.html`; keep that when editing the head.

## Images and media
- Post images: WebP, max 1200px wide, aim for **<= 200 KB each**. Over that, warn the user and offer to recompress.
  - Check: `find assets -newer _config.yml -size +200k`
  - Convert: `cwebp -q 80 -resize 1200 0 in.png -o out.webp` (JPEG/PNG only as sources, don't commit them).
- Every `<img>` and `![]()` needs meaningful `alt` text; decorative images use `alt=""`.
- The first image in a post is the LCP cover: don't lazy-load it manually. `_layouts/post.html` already adds `loading="lazy"` to the rest and `fetchpriority="high"` to the first.
- Large `.mp4` files hurt load time; warn if one is added and prefer a link or a short clip.

## Headings and content
- The layout already renders the post title as the single `<h1>`. In post bodies start at `##` and don't skip levels (`##` then `####`).
- Every page needs exactly one H1, and the title keywords should appear in the content/headings.
- Avoid thin pages (very little text); don't add stub posts or empty tag pages.
- Link text must be descriptive and never empty. Icon-only links/buttons need `aria-label`.
- Check text/background contrast >= 4.5:1 in light and dark mode for new styles.

## Standalone HTML and assets
- Generated or demo `.html` files under `assets/` are blocked in `robots.txt` (`Disallow: /assets/*.html$`). They lack H1, canonical, description and ARIA basics, so don't remove that rule and don't put real pages there.
- New real pages belong in the Jekyll layouts so they inherit canonical, OG and Twitter tags.

## Other
- Use `relative_url` for internal links in templates.
- After adding tags, run `python scripts/generate_tags.py`; after CSS/JS edits, run `sh scripts/reduce.sh`.
- Verify with `scripts/run.sh`; there is no CI.
