---
name: linkedin-cert-urls
description: Add public LinkedIn Learning certificate URLs to _data/certificates.yml from a saved LinkedIn page (.webarchive). Use when the user sends a LinkedIn webarchive or asks why LinkedIn certificates lack links.
---

# LinkedIn certificate URLs

Entries in `_data/certificates.yml` link out when they have `url:`. LinkedIn Learning links look like `https://www.linkedin.com/learning/certificates/<64 hex>`.

## Steps
1. **Source**: a `.webarchive` saved by the user (usually `~/Downloads`). The profile page only lists the newest certificates; the page that shows *all* certificates is needed for older ones. If courses are missing from the archive, ask for a fuller one.
2. **Copy it to a scratch dir** (`/tmp/wa`), never read it in place. Run Python with `-I`.
3. **Extract**: it's a plist. `plistlib.load(f)['WebMainResource']['WebResourceData']` is the HTML (also check `WebSubresources`). For each `certificates/([0-9a-f]{20,})` match, take the course title from the last `>text</p>` before it (then `LinkedIn`, `Issued Mon YYYY`).
4. **Match by exact course name** to entries in the yml, add `url: "https://www.linkedin.com/learning/certificates/<hex>"`. Don't add courses that aren't on the site; list them for the user instead.
5. **Verify**: no `LinkedIn Learning` line is left without `url:`, and no conflict markers.
6. Branch off master, PR to master (see AGENTS.md; don't edit `_site/`).
