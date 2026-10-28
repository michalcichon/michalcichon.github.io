.PHONY: run icons all

# Minify CSS/JS and serve the site (scripts/run.sh minifies first).
run:
	scripts/run.sh

# Regenerate favicons from img/michal.jpeg (needs ImageMagick).
icons:
	scripts/generate_icons.sh

# Icons, then minify CSS/JS and serve.
all: icons run
