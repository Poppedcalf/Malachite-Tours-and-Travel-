# Refinement round, November 2026

Scope: a focused refinement of the Multi-page site. No rebuild, no new brand identity, no change to the hero video system, hosting or deployment. Nothing has been pushed or deployed.

## 1. Which files are the working version
The working version is this folder (the Phase 3 build). On GitHub the `Multi-page` branch holds the new HTML, CSS and docs but the old `js/app.js` and `js/data.js` and is missing 33 images, so the live Packages page, planner and WhatsApp button are probably broken. `main` has an unrelated older line of work and was **not** merged. Nothing here is older than what is on either branch.
Upload everything listed in `docs/UPLOAD-MANIFEST.txt` to `Multi-page` together. The JavaScript, data file and images must go up with the HTML and CSS.

## 2. What changed
**Positioning and copy** (brochure and official site only; nothing invented)
- Home hero (text only): headline "Experience Zimbabwe, Southern and East Africa." (the brochure's own title), intro "Based in Kariba, Zimbabwe, Malachite offers packages tailored to wildlife enthusiasts, history lovers and cultural explorers, with expert guides throughout.", first button "Plan Your Trip". Before: "Into the wild, from the shores of Lake Kariba." / "Malachite is a Kariba-based travel partner. We shape safari, lake and cultural journeys across Zimbabwe and Southern Africa around the way you want to travel." / "Plan Your Journey". The video, its script, its styles and the trust strip are untouched.
- Destinations page: opens with Zimbabwe (safaris, Victoria Falls, heritage, then Lake Kariba), followed by South Africa, Botswana, Tanzania, Kenya and Uganda. Lake Kariba is now one chapter among them. Chapter text was rewritten to the brochure's wording; "Trans-Trio Borders", houseboat "one to seven nights", "tender-boat", "photography timed for good light", "a few minutes from our office" and similar wording was removed.
- Packages: "Fourteen packages plus Lake Kariba houseboat charters" (the brochure has 14 packages; houseboat charters are a service). The Trans Borders and Lower Zambezi pop-ups now list the brochure's stages instead of an untraceable day-by-day plan. The houseboat entry says "Duration on request".
- About Us: identity, "what we arrange" and a short Social Responsibility link, all from the brochure. The "How we work" section and the repeated team block were removed (unsupported claims and duplication).
- Social Responsibility: heading and wording follow the brochure; embellishments removed ("roots are in the community", "because school is also where children play").
- Titles, meta descriptions, FAQ, "something different in mind" list, footer and structured data no longer present Malachite as Kariba-only. The footer link to the empty Travel Journal was removed.
- A fact-check by a separate reviewer against the brochure found a few overstatements (Trans Borders "day trips", "optional" zip-lining, "guide" add-ons, charity wording). All were corrected.

**Structure**
- Home order is now Hero, Destinations (six country tiles), Packages (six featured, one or two per region), Team, Contact, Footer. The welcome, houseboat, giving-back, gallery and quick-enquiry sections were removed from the home page; their content lives on other pages. The unused quick-enquiry code in `js/app.js` is harmless and can be deleted later.
- Navigation is identical on every page: Home, Destinations, Packages, Social Responsibility, About Us, and the "Plan Your Trip" button.
- Team section: three role descriptions from the brochure. No names, portraits or biographies (none supplied).

**Floating WhatsApp button**
- Desktop and tablet: a cream pill with a green WhatsApp badge and the label "Chat on WhatsApp"; on hover it turns deep green. Phones: the green badge alone (56 px) with a white ring.
- The recognisable WhatsApp logo mark now replaces the old outline icon on every WhatsApp button on the site.
- It opens WhatsApp with +263 775 515 400 and a pre-filled message (the same number as everywhere else), in a new tab.
- Accessible name "Chat on WhatsApp with Malachite Travel & Tours (opens in a new tab)", visible keyboard focus ring (gold), pressed state, a short pulse on first load (switched off for visitors who ask for reduced motion).
- It steps aside, rather than covering anything, over the strip at the bottom of the home hero (wide screens), every contact section, the planner and the footer. Everywhere else it stays visible while scrolling.

**Technical**
- `index.html`, `destinations.html` etc. are generated: edit `_src/` and run `python3 _tools/build.py`.
- Files changed: see `docs/UPLOAD-MANIFEST.txt` (28 changed, 36 new, 33 of them images).
- Not touched: the hero `<video>` markup, `videos/`, the hero script block at the end of `js/app.js`, `.hero` styles, `robots.txt`, hosting files. The Cloudflare build must still exclude `videos/hero.mp4`.

## 3. Checks run
Playwright (Chromium) at 390 px and 1440 px on all pages: no console errors apart from the blocked Google Fonts request in the test environment, no broken images, no horizontal scroll. 43 scripted interaction checks pass (planner, pop-ups, filters, deep links, redirect, lightbox, menu, home section order, WhatsApp button states). Internal links and image references were checked; nothing is missing. A scan of every page and the planner finds no price other than the two published rates. The hero markup was compared with the previous build: only the three text strings differ. A Cloudflare build was simulated without `videos/hero.mp4`.
Not tested: real phones, Safari, and the font files (blocked in the test environment), and the video (the test browser has no H.264).

## 4. Still needed from Malachite
See `MISSING-INFO.md`, section R.
