# Michał Cichoń – Blog

Personal technical blog powered by [Jekyll](https://jekyllrb.com/) and hosted via [GitHub Pages](https://pages.github.com/).

🌐 **Live site:** [https://michalcichon.github.io](https://michalcichon.github.io)

---

## 🧰 Requirements

- **Ruby** `>= 3.2`
- **Bundler** (recommended to manage gems)

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

Use the provided run script:

```bash
./run.sh
```

That script:

1. Executes `reduce.sh` (custom preprocessing step)
2. Starts a local Jekyll server.

---

## 🧩 Project Structure

```
.
├── _posts/              # Blog posts
├── _layouts/            # Jekyll layouts
├── _includes/           # Partial HTML snippets
├── _config.yml          # Jekyll configuration
├── Gemfile              # Ruby dependencies
├── reduce.sh            # Custom preprocessing script
├── run.sh               # Run script (reduce + serve)
└── README.md
```

---

## 🪄 Deployment

The site is automatically built and deployed by **GitHub Pages** from the `main` branch.

To publish new content:

1. Commit and push changes to `main`
2. GitHub Pages will rebuild and update your live site at
   👉 [https://michalcichon.github.io](https://michalcichon.github.io)

---

## 📄 License

This blog’s content © [Michał Cichoń](https://michalcichon.github.io), unless otherwise stated.
Code portions and configuration may be shared under an open-source license (add one if applicable).
