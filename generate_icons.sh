#!/bin/sh
# Regenerates favicon.ico, icon.png, apple-touch-icon.png and ms-icon-*.png from img/michal.jpeg.
# Requires ImageMagick. The crop (WxH+X+Y, in source pixels) is tuned to the current photo;
# override for a new one: CROP=1500x1500+300+50 ./generate_icons.sh
set -e
cd "$(dirname "$0")"
CROP=${CROP:-1700x1700+213+20}
tmp=$(mktemp -t icon).png
trap 'rm -f "$tmp"' EXIT

magick img/michal.jpeg -crop "$CROP" +repage -resize 512x512 "$tmp"
for spec in 64:icon 180:apple-touch-icon 70:ms-icon-70 150:ms-icon-150 310:ms-icon-310; do
  magick "$tmp" -resize "${spec%%:*}x${spec%%:*}" "${spec##*:}.png"
done
magick "$tmp" -define icon:auto-resize=256,128,64,48,32,16 favicon.ico
