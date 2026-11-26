# Upgrade notes (Nov 2026)

- Logos and favicon: reverted to the previous round (white/black logo files, wing-symbol favicon) at the owner's request.
- Typography: DM Sans site-wide. Packages: no prices shown (`CONFIG.showPublishedPrices:false`; PRICE data kept). Testimonials page added (`js/data.js` TESTIMONIALS, empty).
- CSS/JS links carry `?v=20261126` (was 20261124) so browsers and Cloudflare do not mix old CSS with new pages.

## Round 5 (Nov 2026): comprehensive enhancement
- Type: Cormorant Garamond for display headings and editorial statements, DM Sans for body, navigation, buttons and forms.
- Homepage: new "Choose your African experience" tiles (link to the experience filter), "Why travel with Malachite?" and a five-step "How planning works" with one primary call to action.
- Packages: browse by destination and by experience (`EXPERIENCES` in js/data.js maps existing packages to experiences using their published highlights; edit there), Lake Kariba houseboat charters shown as their own section, "Price on request" everywhere, pricing FAQ and info box reworded for quotation-based pricing.
- Destinations: quick links from each destination to its packages. About: "Where we operate". Credentials: all published partners kept (eight names exactly as published), with an empty logo slot above each name; add logos as `images/partners/...` (see comment in the page source).
- Planner: all approved fields kept; added a progress strip, contributions folded into a details block, a "What happens next" list, and a Copy summary button. No prices or estimates appear.
- Testimonials and Journal pages are `noindex` and left out of sitemap.xml until they hold real content (remove `noindex: yes` in their front matter, and the entry in `skip` in `_tools/build.py`, when ready).
- Repo note: `_src/partials/header.html` and `closing.html` on the remote were out of step with the built pages (they pointed to the older logo files). The versions in this ZIP match the built pages. `images/malachite-favicon*.png` in the repo are unused.

## Round 8 (Nov 2026): complete redesign
- Every public page was redesigned (home, destinations, packages, about, credentials, social responsibility, journal, plan, testimonials, 404) as an editorial, image-led site. Full detail, photography map, checks and approval items: `docs/ROUND8-REDESIGN.md`.
- 18 new photographs added as responsive sets (see `docs/ASSET-INVENTORY.md`).
- New components live in the last part of `css/style.css` (labelled by page). New behaviour in `js/app.js`: pre-filled WhatsApp links (`data-wapk`, `data-wadest`), enlarge buttons on `figure[data-zoom]`, destination explorer and experience panels, journal filter and "Keep reading".
- `_tools/build.py` also writes breadcrumb structured data, rebuilds `_templates/article-layout-preview.html`, and uses host-independent in-page links on depth-1 pages.
- Unchanged: logos, favicon, colours, hero video block, all prices (none), all URLs.
