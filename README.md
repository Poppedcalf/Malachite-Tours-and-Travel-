# Malachite Travel & Tours website

Static website for GitHub Pages: https://poppedcalf.github.io/Malachite-Tours-and-Travel-/

## Public pages
- `index.html` — Home
- `about.html` — About Malachite
- `destinations.html` — Destination overview
- `destinations/lake-kariba.html` — Lake Kariba guide
- `destinations/mana-pools.html` — Mana Pools guide
- `destinations/matusadona.html` — Matusadona guide
- `destinations/victoria-falls.html` — Victoria Falls guide
- `destinations/heritage.html` — Zimbabwe heritage guide
- `trips.html` — Trips & Experiences
- `journal.html` — Travel Journal
- `credentials.html` — Credentials & Partnerships
- `plan.html` — Plan Your Journey / Contact
- `404.html` — Branded not-found page

## Folders
- `css/style.css`: shared styling and design tokens
- `js/data.js`: contact settings, journeys, FAQ, galleries and image registry
- `js/app.js`: shared behaviour across pages
- `images/`, `videos/`: local media assets and page-specific social preview images
- `journal/index.json`: list of journal articles (empty until genuine articles are added)
- `_src/pages/`: editable page content, including the individual destination guide sources
- `_src/partials/`: shared header, footer, head and dialog markup
- `_tools/build.py`: static page builder
- `_templates/`: journal article template and layout preview
- `_backup/`: earlier project versions
- `docs/`: asset inventory, missing company information, journal guide and phase summaries

Folders beginning with `_` are not published by GitHub Pages.

## Editing pages
Edit the matching file in `_src/pages/`, then run `python3 _tools/build.py` from the project root. The builder regenerates the public HTML pages and refreshes the image registry in `js/data.js`. Small one-off edits can also be made directly in the generated root HTML, but source files should remain the master copy.

## Search and sharing files
`sitemap.xml` lists the public pages. `robots.txt` points search engines to the sitemap. Open Graph and Twitter metadata use page-specific 1200×630 images in `images/social-*.jpg`.

Read `docs/PHASE2-SUMMARY.md`, `docs/DESTINATION-EXPANSION-PACK.md` and `docs/MISSING-INFO.md` before making major changes.
