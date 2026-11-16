---
name: export-badges
description: Turn certificate badge images (PNG/JPG/SVG) into small WebP files and wire them into the certificates page. Use when the user sends or asks to add, replace or fix a badge on /certificates/.
---

# Export certificate badges

Badges live in `img/badges/<slug>.webp`. An entry in `_data/certificates.yml` shows one when it has `badge: <slug>`. `certificates.html` and `css/main.css` (`.cert-badge`, 80px) already handle rendering.

## Steps
1. **Source**: use the user's file (usually `~/Downloads`). If they only give a credential link, the page may be JS-rendered; look for the issuer's public badge image instead and say which one you used.
2. **SVG source**: `magick` fails on some SVGs. Rasterize with `qlmanage -t -s 320 -o /tmp/x file.svg` (output is `file.svg.png`, opaque white).
3. **Transparent background** (only if the source has a solid one): flood-fill from the four corners so inner whites survive:
   `magick in.png -alpha set -fuzz 8% -fill none -draw "color 0,0 floodfill" -draw "color W,0 floodfill" -draw "color 0,H floodfill" -draw "color W,H floodfill" out.png` (W,H = width-1, height-1). Check it by flattening onto grey and viewing.
4. **Export**: `cwebp -q 85 -alpha_q 100 -resize 160 0 in.png -o img/badges/<slug>.webp`. 160px is 2x the 80px display size; each file should be well under 10 KB. Keep the slug short, lowercase and hyphenated (`aws-ai-practitioner`). Don't commit the PNG/SVG source.
5. **Wire up**: append `, badge: <slug>` inside the braces of the matching line in `_data/certificates.yml`.
6. **Verify**: with the server running (`make start`), `curl -s http://127.0.0.1:4000/certificates/ | grep -c cert-badge` should equal the number of entries with a badge; open the page to check it.

## Notes
- Only use badges the user supplied or the issuer publishes for sharing; check brand rules if unsure.
- The alt text is generated from the certificate name, so nothing to write by hand.
- Don't commit or open a PR unless asked.
