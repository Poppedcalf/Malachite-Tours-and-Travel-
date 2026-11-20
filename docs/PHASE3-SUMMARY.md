> Update, November 2026: the homepage order, the floating WhatsApp button and much of the wording were revised afterwards. See `REFINEMENT-SUMMARY.md` for the current state.

# Phase 3: website upgrade (November 2026)

Read this first. It explains what changed, where to edit things, how to run and deploy the site, and what was and was not tested.

## What changed

| Area | Change |
|---|---|
| Navigation | Home, Destinations, Packages, Social Responsibility, About Us, and a gold **Plan Your Trip** button. The mobile menu adds WhatsApp. |
| WhatsApp | The old mobile action bar is replaced by a floating WhatsApp button (all pages). It is icon-only on phones and hides itself over the planner, quick-enquiry and contact sections. |
| Home | Cinematic hero (unchanged), welcome, six destination tiles, six featured packages, Lake Kariba houseboat band, meet the team, "travel that gives back", gallery, quick enquiry (WhatsApp / email), contact, footer. |
| Destinations | Lake Kariba, Mana Pools / Matusadona / Lower Zambezi, Victoria Falls and Heritage of Zimbabwe (kept and improved), plus new chapters for South Africa, Botswana, Tanzania, Kenya and Uganda, each with a package panel and itinerary / quote buttons. |
| Packages (new) | All 15 brochure packages as filterable cards (by country), with itinerary pop-ups. Published prices are shown per adult; every other package says "Request a Quote". Deep links such as `packages.html#pk-lz` work. |
| Social Responsibility (new) | The Smiling Children of Mala (Mala Charity Foundation) and green tourism (vulture rehabilitation, clean-ups, tree planting). Only brochure facts are used. No statistics, totals or partners are stated. |
| About Us | Rewritten from brochure facts. The team section lists roles only until real profiles are supplied. |
| Plan Your Trip | Planner, forms and WhatsApp / email hand-off kept. Now shows a published starting rate where one exists, and lists all 15 packages grouped by country. |
| Other | `trips.html` now redirects to `packages.html` (old links keep working), a styled `404.html`, `sitemap.xml`, `robots.txt`, canonical and social-share tags that point at the Cloudflare address. |

## What was deliberately NOT changed
- The cinematic hero: markup, video sources, playback script and styles are byte-for-byte as before (checked by comparison with the backup in `_backup/phase2/`).
- `videos/hero.mp4` is still in the repository and is still excluded from the Cloudflare output by the build command below.
- The desktop video URL (`https://poppedcalf.github.io/Malachite-Tours-and-Travel-/videos/hero.mp4`) and the local mobile video (`videos/hero-mobile.mp4`).
- Hosting and deployment arrangement. Nothing was pushed or deployed.
- No original file or asset was deleted. The previous versions of every changed page are in `_backup/phase2/`.

## Where to edit
| To change | Edit |
|---|---|
| Package text, routes, itineraries, photos | `PK` in `js/data.js` |
| Published prices | `PRICE` in `js/data.js` (`status:'published'` shows a price; anything else shows "Request a Quote") |
| WhatsApp number, email recipients | `CONFIG` at the top of `js/data.js` |
| Team profiles | `TEAM` in `js/data.js` (name, role, bio, optional photo). The three role blocks stay until you decide to remove them in `_src/partials/team.html`. |
| Gallery photos and captions | `GAL` in `js/data.js` |
| Page wording | `_src/pages/*.html`, then run `python3 _tools/build.py` |
| Site address (for canonical tags and sitemap) | `BASE` in `_tools/build.py`, then rebuild |

**Prices: keep `CONFIG.showPrices` set to `false`.** The `rate` numbers inside `CONFIG.packages` are illustrative placeholders from the first build, not Malachite prices. They are never displayed or sent while that switch is off. A scan of every page and of the planner for all 15 packages found only two dollar figures, the verified $2,480 and $3,650 (the planner's budget drop-down also lists US$1,500 / 3,000 / 5,000 bands that the visitor chooses from; those are not prices).

## Run locally
```
python3 _tools/build.py     # regenerates the pages from _src/
python3 -m http.server 8000 # then open http://localhost:8000
```

## Deploy (Cloudflare Pages, unchanged)
- Branch: `Multi-page`. Framework preset: None.
- Build command: `rm -rf dist && mkdir dist && tar --exclude=./dist --exclude=./.git --exclude=./videos/hero.mp4 -cf - . | tar -xf - -C dist`
- Build output directory: `dist`
- Tested here: the command produces no `dist/videos/hero.mp4`, and no file in `dist` is larger than 1.5 MB (limit 25 MiB). The command also publishes `_src`, `_backup`, `docs` and `_tools`. That was already the case. If you would rather keep them private, add `--exclude=./_src --exclude=./_backup --exclude=./docs --exclude=./_tools` (not applied, because you asked that the deployment arrangement stay as it is).

## Testing done (Chromium via Playwright, 390 px phone and 1440 px desktop)
- All 9 pages load with no JavaScript errors, no broken images and no horizontal scrolling.
- 344 internal links and anchors resolve; every `data-plan` / `data-open` id exists.
- Packages: 15 cards, country filters, itinerary pop-ups (day-by-day and stage-by-stage), deep links, redirect from `trips.html`.
- Planner: pre-filled from every page, published rate shown for the two verified packages and hidden for the conflicted ones, WhatsApp and email text correct, email goes only to the brochure address.
- Quick enquiry, gallery lightbox, mobile menu, floating WhatsApp button (compact on phones, hides over contact), social-responsibility support links, 404 page.
- Hero block and hero script compared with the backup: identical.

## Not verified (please check)
- Opening the real WhatsApp app or an email app (only the link targets were checked).
- The external desktop video: the test environment cannot reach the GitHub Pages address, and its Chromium cannot play H.264, so video playback was not exercised. It was not changed.
- Google Fonts (blocked in the test environment, so screenshots used fallback fonts; real browsers load them as before).
- Safari, Firefox, real phones, Lighthouse scores and screen-reader testing.
- The package grid is drawn by JavaScript. Without JavaScript visitors see a message with the WhatsApp number and email address.
