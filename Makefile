.PHONY: setup run start minify stop icons all

# Check required tools and install gems. Does not install system tools.
setup:
	@command -v ruby >/dev/null || { echo "Missing ruby (>= 3.2); install it, e.g. via rbenv"; exit 1; }
	@ruby -e 'exit RUBY_VERSION >= "3.2"' || { echo "Ruby >= 3.2 required, found $$(ruby -v)"; exit 1; }
	@command -v bundle >/dev/null || { echo "Missing bundler: gem install bundler"; exit 1; }
	@command -v python3 >/dev/null || { echo "Missing python3 (needed for scripts/generate_tags.py)"; exit 1; }
	@command -v magick >/dev/null || echo "Warning: ImageMagick missing (only needed for 'make icons'): brew install imagemagick"
	bundle install

# Minify CSS/JS and serve the site (scripts/run.sh minifies first).
run:
	scripts/run.sh

# Serve in the background and return to the terminal (log: .jekyll.log).
start:
	@if [ -f .jekyll.pid ] && kill -0 $$(cat .jekyll.pid) 2>/dev/null; then \
		echo "Already running (pid $$(cat .jekyll.pid))"; \
	else \
		sh scripts/reduce.sh; \
		nohup bundle exec jekyll serve --host=127.0.0.1 >.jekyll.log 2>&1 & echo $$! >.jekyll.pid; \
		echo "Started on http://127.0.0.1:4000 (pid $$(cat .jekyll.pid)); 'make stop' to stop"; \
	fi

# Re-minify CSS/JS; the running server rebuilds on file change.
minify:
	sh scripts/reduce.sh

stop:
	@if [ -f .jekyll.pid ]; then kill $$(cat .jekyll.pid) 2>/dev/null && echo Stopped || echo "Not running"; rm -f .jekyll.pid; else echo "Not running"; fi

# Regenerate favicons from img/michal.jpeg (needs ImageMagick).
icons:
	scripts/generate_icons.sh

# Icons, then minify CSS/JS and serve.
all: icons run
