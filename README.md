# Malachite Travel & Tours website

Static website for GitHub Pages: https://poppedcalf.github.io/Malachite-Tours-and-Travel-/

## Pages
`index.html` (Home), `about.html`, `destinations.html`, `trips.html` (Trips & Experiences), `journal.html` (Travel Journal), `credentials.html` (Credentials & Partnerships), `plan.html` (Plan Your Journey / Contact).

## Folders
- `css/style.css`: all styling (brand colours and fonts are variables at the top)
- `js/data.js`: contact settings, journeys, FAQ, galleries (edit here)
- `js/app.js`: behaviour shared by every page
- `images/`, `videos/`: media (see `docs/ASSETS.md`)
- `journal/index.json`: list of journal articles (empty until articles are added)
- `docs/`: guides, asset inventory and the list of information still needed
- `_src/`, `_tools/`, `_templates/`, `_backup/`: source pages, the build script, the article template and backups. Folders starting with an underscore are not published by GitHub Pages.

## Editing pages
Page content lives in `_src/pages/`; the shared header, footer and dialogs live in `_src/partials/`. After editing, run `python3 _tools/build.py` to regenerate the pages in the project root, then upload the changed files. Small text edits can also be made directly in the finished `.html` files.

Read `docs/PHASE2-SUMMARY.md` first.
