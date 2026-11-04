# Phase 2: multi-page website

## What was built

**Seven pages** on one shared design: Home, About, Destinations, Trips & Experiences, Travel Journal, Credentials & Partnerships, and Plan Your Journey (which also holds the contact details).

| Page | Purpose | Main content |
|---|---|---|
| Home | Inspire and direct | Cinematic video hero, who we are, six destination teasers, experiences, houseboats, corporate teaser, trust facts, 12-photo gallery |
| About | Who Malachite is | Who we are, the eight services, how we work, travel with purpose (with contribution buttons) |
| Destinations | Immersive showcase | Five chapters, each with a full-width image, verified facts, a gallery and a planning action: Lake Kariba, Mana Pools and Matusadona, Victoria Falls, Heritage of Zimbabwe, Beyond Zimbabwe |
| Trips & Experiences | What we actually offer | Eight experiences with photos and actions, the five standard journeys with day-by-day pop-ups, tailor-made journeys, the services list, corporate and group travel |
| Travel Journal | Editorial home | Four sections, empty-state, and a working article list and article layout ready for real content |
| Credentials | Reputation | Awards, ZTA affiliation, partner names, organisations supported, marked place for testimonials |
| Plan Your Journey | Convert | How planning works, the trip planner, contact details, FAQ, group proposals |

**Shared system**: one header (transparent over the home video hero, solid elsewhere, current page marked, 7 links), one footer, one stylesheet, one script file, a sticky destinations sub-menu, a mobile action bar, reusable gallery and lightbox, and a build script so edits to the header or footer reach every page.

**Paths**: every link and file path is relative, so the site works under `/Malachite-Tours-and-Travel-/` on GitHub Pages and also when opened from a folder.

## Existing features preserved (and tested)
Trip planner, WhatsApp and email inquiry buttons, itinerary pop-ups, journey filters, gallery lightbox, FAQ, tailor-made inquiry links, group proposal buttons, contribution options, mobile menu and action bar. Buttons on any page now carry the visitor to the right place on another page: for example "Plan a Houseboat Stay" opens the planner with the houseboat journey chosen.

## Prices
**No prices appear anywhere.** The planner now shows a trip summary instead of an estimate, and the WhatsApp and email messages ask for a proposal. The old illustrative rates remain in `js/data.js` but are switched off by `showPrices:false`. The planner email now goes to malachitetours@gmail.com (the address in the company signature), with admin@malachite-tours.com copied.

## Media
Eleven new photographs were optimised (640, 1200, 1920 px versions, responsive `srcset`), larger older photos were recompressed, and the hero video now has a 1.5 MB phone version. Photos without a confirmed location carry neutral captions. Held back for confirmation: lions on red rock, safari vehicle, tiger fish, dancers, donkey cart. See `ASSET-INVENTORY.md`.

## Not done, by design
- No company story, team, testimonials or journal articles: none were supplied. Marked places are ready (see `MISSING-INFO.md`).
- No separate page per destination yet. The Destinations page carries all five chapters; individual pages can follow.
- No video was supplied beyond the two earlier clips; the hero uses the cleaned 10275.mp4 cut.
- Not deployed.

## Testing performed
About 90 automated checks in a real browser, served under the GitHub Pages sub-path, on desktop (1440 px) and phone (390 px) sizes:
- Every page loads with no script errors, no failed requests, no broken images, and no sideways scrolling.
- Every link between pages and every in-page anchor resolves; no absolute (`/…`) paths.
- Navigation marks the current page; the mobile menu opens and navigates.
- Cross-page journeys: home experience cards to filtered trips; itinerary pop-up to the planner; destination buttons to the planner; contribution buttons to the planner.
- Planner: summary, WhatsApp and email messages (no prices), steppers, range correction, houseboat nights, deep links.
- Gallery lightbox on the home and destination pages; FAQ; tailor-made and group links; journal empty-state and article list.
- Hero video wiring, pause button, phone video, reduced-motion fallback.

**Not testable here**: the browser used for testing cannot play H.264 video, so please watch the hero video on a phone and a laptop. Web fonts (Cormorant Garamond, Jost) load from Google Fonts online, so layout was checked with fallback fonts; the real fonts are slightly narrower. Please click through the live site on an Android and an iPhone before sharing.

## Deploy (when you are ready)
1. Unzip the project. Compare against the repository if you want to review changes (`_backup/` holds the earlier versions).
2. In GitHub, upload the contents of the project folder to the repository, keeping folder names. Replace existing files when asked. (Or use `git add . && git commit && git push`.)
3. Wait a minute or two for GitHub Pages to rebuild, then hard-refresh (Ctrl+Shift+R).
4. Click through each page on a phone and a computer, using the checklist in this file.
5. To undo: the files in `_backup/` are the original and Stage 1 versions of the homepage.

**Before launch**: resolve section 1 of `MISSING-INFO.md`, especially the awards, partners and email addresses.
