# Malachite Travel & Tours website

Static multi-page website. Live (Cloudflare Pages): https://malachite-travel-and-tours.pages.dev/
Original GitHub Pages copy: https://poppedcalf.github.io/Malachite-Tours-and-Travel-/ (also hosts the desktop hero video).

## Pages
`index.html` (Home), `destinations.html`, `packages.html`, `social-responsibility.html`, `about.html`, `plan.html` (Plan Your Trip and contact), `credentials.html`, `journal.html`, `404.html`. `trips.html` redirects to `packages.html`.

## Folders
- `css/style.css`: all styling (brand colours and fonts are variables at the top)
- `js/data.js`: contact settings, packages, prices, team, FAQ, galleries (edit here)
- `js/app.js`: behaviour shared by every page
- `images/`, `videos/`: media (see `docs/ASSETS.md` and `docs/ASSET-INVENTORY.md`)
- `docs/`: guides, asset inventory and the list of information still needed
- `_src/`, `_tools/`, `_templates/`, `_backup/`: source pages, the build script, the article template and backups of earlier versions

## Editing pages
Page content lives in `_src/pages/`; the shared header, footer and dialogs live in `_src/partials/`. After editing, run `python3 _tools/build.py` to regenerate the pages in the project root. Open the site locally with `python3 -m http.server 8000`.

## Deploying to Cloudflare Pages
Build command: `rm -rf dist && mkdir dist && tar --exclude=./dist --exclude=./.git --exclude=./videos/hero.mp4 -cf - . | tar -xf - -C dist`
Output directory: `dist`. The 31 MB `videos/hero.mp4` stays in the repository (the desktop hero loads it from the GitHub Pages address) but must stay out of the Cloudflare output, which has a 25 MiB per-file limit.

**Do not edit the hero video block** (the `<video>` element and its script) in `_src/pages/index.html` or `js/app.js` without a separate task. Only the hero's three text strings were re-worded in the refinement round.

Read `docs/ROUND8-REDESIGN.md` first (the latest round: the full redesign, what was checked and what needs approval), then `docs/REFINEMENT-SUMMARY.md`, `docs/PHASE3-SUMMARY.md` and `docs/MISSING-INFO.md`.
