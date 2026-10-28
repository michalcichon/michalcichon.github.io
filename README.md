# Michał Cichoń – Blog

Personal technical blog powered by [Jekyll](https://jekyllrb.com/) and hosted via [GitHub Pages](https://pages.github.com/).

🌐 **Live site:** [https://michalcichon.github.io](https://michalcichon.github.io)

---

## 🧰 Requirements

- **Ruby** `>= 3.2`
- **Bundler** (recommended to manage gems)
- **Python 3** – only for `scripts/generate_tags.py`
- **ImageMagick** – only for `scripts/generate_icons.sh`

All required gems are listed in [`Gemfile`](./Gemfile), including:
- `github-pages` – the official GitHub Pages gem (includes Jekyll and dependencies)
- `jekyll-feed` and `jekyll-sitemap` – for RSS and SEO
- Utility gems: `reduce`, `csv`, `fiddle`, `webrick`

---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/michalcichon/michalcichon.github.io.git
cd michalcichon.github.io

bundle install
````

---

## 🚀 Running Locally

```bash
make run     # minify CSS/JS, then serve on http://127.0.0.1:4000
make icons   # regenerate favicons from img/michal.jpeg (needs ImageMagick)
make all     # icons, then minify CSS/JS and serve
```

`make run` is a wrapper for `scripts/run.sh`, which:

1. Executes `scripts/reduce.sh` (minifies `css/main.css` and `js/main.js` into the `.min` files)
2. Starts a local Jekyll server.

Edit `css/main.css` / `js/main.js`, never the `.min` files.

---

## ✍️ Adding a Post

1. Create `_posts/YYYY-MM-DD-title.md` with `tags:` in the front matter.
2. If it introduces a new tag, run `python scripts/generate_tags.py` and commit the new `tag/` pages.

---

## 🧩 Project Structure

```
.
├── _posts/              # Blog posts (YYYY-MM-DD-title.md)
├── _case_studies/       # Case study pages
├── _layouts/            # Jekyll layouts (default, post)
├── _includes/           # Partial HTML snippets
├── _data/               # Site data (e.g. recommendations)
├── css/, js/            # Sources (main.css / main.js) and generated .min files
├── img/                 # Images; michal.jpeg is the source of all favicons
├── tag/                 # Generated tag pages (committed)
├── _config.yml          # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── Makefile             # run / icons / all shortcuts
├── scripts/             # run.sh (reduce + serve), reduce.sh (minify CSS/JS),
│                        # generate_icons.sh, generate_tags.py
└── README.md
```

---

## 🪄 Deployment

The site is automatically built and deployed by **GitHub Pages** from the `master` branch.

---

## 📄 License

This blog’s content © [Michał Cichoń](https://michalcichon.github.io), unless otherwise stated.
