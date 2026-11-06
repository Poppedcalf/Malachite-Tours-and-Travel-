# Malachite Travel & Tours website

Static website for GitHub Pages: https://poppedcalf.github.io/Malachite-Tours-and-Travel-/

## Public pages
- `index.html` — Home
- `about.html` — About Malachite
- `destinations.html` — Destination overview
- `destinations/` — Five dedicated destination guides
- `trips.html` — Trips & Experiences
- `journal.html` — Travel Journal landing page
- `credentials.html` — Credentials & Partnerships
- `plan.html` — Plan Your Journey / Contact
- `404.html` — Branded not-found page

## Project structure
- `css/style.css` — shared styles
- `js/data.js` — journeys, FAQs, galleries and contact configuration
- `js/app.js` — interactive website behaviour
- `js/boot.js` — early loading and media fallbacks
- `images/`, `videos/` — local media
- `journal/index.json` — article index for the Travel Journal
- `_src/pages/` — editable source content
- `_src/partials/` — shared page components
- `_tools/build.py` — static page builder
- `docs/` — content, asset and publishing notes

## Editing and rebuilding
Edit `_src/pages/` and shared partials in `_src/partials/`. Then run from the repository root:

```bash
python3 _tools/build.py
```

The builder regenerates the public HTML and the photo registry in `js/data.js`. Keep the runtime files `js/app.js` and `js/boot.js`, and all partials in `_src/partials/`; the generated pages depend on them.

## Before publishing
Review `docs/MISSING-INFO.md`. Confirm contact details, prices, company credentials, partnerships, testimonials and media permissions with Malachite.
