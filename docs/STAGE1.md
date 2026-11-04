# Stage 1: visual upgrade, cinematic hero and homepage story

## What changed

**New files**
- `css/style.css`: all styling (moved out of `index.html`; brand colours and fonts are variables at the top).
- `videos/hero.mp4`: hero video, 14 seconds, 3.8 MB, silent, watermark and black bars removed.
- `docs/ASSETS.md`, `docs/STAGE1.md`: this guide and the asset guide.
- `_backup/index.original.html`: the page exactly as it was before Stage 1 (delete the folder once you are happy).

**Changed**: `index.html` (markup, gallery list, hero script). Everything else in `images/` is untouched.

**Hero and navigation**
- Cinematic video that fades in over the existing Victoria Falls still, pauses when scrolled away, and has a pause button.
- Not loaded for visitors with reduced-motion, data-saver or very slow connections (they see the still).
- Transparent header over the hero (light logo, white links), turning solid with the dark logo after a short scroll. The mobile menu turns the bar solid.
- Lighter overlay, larger headline, quiet "Malachite Travel & Tours" signature above it (hidden on phones, where the header logo already carries the brand).

**Homepage story (new order)**
Hero, Who we are (new photo pair), Destinations, **What you can do** (new), Journeys, Tailor-made, Houseboats, Corporate, **Why travellers plan with Malachite** (new), Travel with purpose, Gallery, How planning works, Planner, FAQ, Contact.

- *What you can do*: six experience cards. Every activity listed already appears elsewhere on the site; each card links to the matching journeys.
- *Why travellers plan with Malachite*: only facts already published on the site (Kariba base and address, recognition, affiliation, giving back, the inquiry-is-not-a-reservation process). Nothing new is claimed.

**Visual system**: Cormorant Garamond for headlines, Jost for text (Google Fonts, with safe fallbacks), green and gold kept, calmer spacing, one gentle scroll reveal, hover zoom on photos.

**Gallery**: 7 photos became 12 using photos already in the project, in an editorial grid. The lightbox covers all 12.

**Preserved and tested**: trip planner and estimate, WhatsApp and email buttons, itinerary pop-ups, journey filters, gallery lightbox, FAQ, tailor-made links, group proposal buttons, mobile menu and action bar. Automated checks on desktop and phone sizes: no script errors, every in-page link resolves, no broken images, no sideways scrolling.

## Known limits (please read)
- The hero footage is generic safari footage. We cannot confirm where it was filmed or that Malachite owns it. Replace it with Kariba footage as soon as you have it.
- Most photos are only 640 to 715 px wide and look soft when large. The layout avoids full-screen use of them, but better originals will lift the whole site.
- On phones the landscape video shows only its middle. A portrait cut is the fix (see `docs/ASSETS.md`).
- The planner still shows illustrative prices from the original code. They need approved rates or removal before launch.
- The hero credentials (African Top 100 Tour Operators, ZTA, charities) are kept as published but have no proof on the site yet.

## Deploy
1. In GitHub, open the repository and choose **Add file > Upload files**.
2. Drag in `index.html`, the `css`, `videos`, `docs` and `_backup` folders from the update pack. Keep folder names.
3. Commit. GitHub Pages republishes within a minute or two. Refresh with Ctrl+Shift+R (or clear the cache on phones).
4. To undo everything, copy `_backup/index.original.html` back over `index.html`.

## Test checklist
Desktop and phone: video plays and the pause button works; header is transparent at the top and solid after scrolling; menu opens on phone; each nav link lands on its section; Experience cards open the right journeys; Plan This Trip fills the planner; WhatsApp and email buttons open with the message; gallery opens and arrows work; FAQ opens.

## Needed for the next stage
1. Kariba footage (houseboats, the lake, Kariba Dam, wildlife on the shore) and confirmation of the rights to use the current clips.
2. Higher-resolution originals of the company photographs (1600 px wide or more).
3. Proof and details for the award, ZTA affiliation and partners, and any genuine guest testimonials with permission.
4. Approved prices, or a decision to show no estimate.
5. Confirmed contact details: which email addresses work, which phone numbers and street address are current.
6. The Managing Director's handwritten requirements and the missing company document.
7. Real material for the blog (or confirmation to launch it empty).
