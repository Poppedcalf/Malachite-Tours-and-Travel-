# Replacing photos and video

Replace a file by **overwriting it with the same file name**. Alt text (what screen readers and search engines read) and captions are in the page files in `_src/pages/` and in `js/data.js`. Update them when a photo changes.

## Hero (top of the homepage)

| What | File | Notes |
|---|---|---|
| Hero video | `videos/hero.mp4` | Silent loop, 10 to 15 seconds, H.264 MP4, 1280x720 or 1920x1080, under 5 MB, no watermark or black bars. |
| Hero video for phones | `videos/hero-mobile.mp4` | A lighter file (about 1.5 MB) used on phones. Replace it together with the main video. |
| Hero still image | `images/hero-victoria-falls.jpg` | Shown first, and for visitors with reduced-motion or data-saver on. Use a Kariba photo when you have one (1920 px wide or more). |

Prepare footage with ffmpeg (free):

    ffmpeg -i source.mp4 -t 14 -an -vf "scale=1280:-2,fps=25" -c:v libx264 -crf 26 -preset slow -movflags +faststart videos/hero.mp4
    ffmpeg -i videos/hero.mp4 -an -vf "scale=960:-2" -c:v libx264 -crf 29 -movflags +faststart videos/hero-mobile.mp4

## Photos

New photos come in three sizes: `name-640.jpg`, `name-1200.jpg` and `name-1920.jpg`. Existing photos are a single file, `name.jpg`. To add a new photo:

1. Make the sizes (640, 1200 and 1920 px wide, JPEG quality about 72) and put them in `images/`.
2. Run `python3 _tools/build.py`. It updates the photo list inside `js/data.js` automatically.
3. Use it in a page with `{{photo name|Description for screen readers|sizes|class|eager}}` in `_src/pages/*.html`, or add it to a gallery in `js/data.js` (`GAL`).

See `ASSET-INVENTORY.md` for what each current photo is and where it is used.

## Galleries
Galleries are lists in `js/data.js` (`GAL`): `[file name without .jpg, description, caption]`. The homepage gallery should have 12 photos (photos 1 and 6 show large, 4 and 10 wide). Destination galleries use 3 or 6 photos.
