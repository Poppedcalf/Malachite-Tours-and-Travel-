# Upgrade notes (Nov 2026)

- Logos: header uses `images/malachite-logo-light.png` (white lettering) over the hero and `images/malachite-logo-official.png` (dark lettering) once the header is light. Footer and closing band use the white-lettering file. No plates, borders or backgrounds. The watermarked white/black/wing files are no longer used; delete `images/malachite-logo-white.png`, `malachite-logo-black.png`, `malachite-wing-symbol.png` from the repo.
- Favicon: `images/malachite-favicon.png` (256x256 square, wing centred and uniformly scaled, cut from the clean official logo) plus 32 and 180 px versions.
- Still needed: a clean white-lettered version of the glossy official logo (the white one currently used is the older flat artwork).
- Typography: DM Sans site-wide. Packages: no prices shown (`CONFIG.showPublishedPrices:false`; PRICE data kept). Testimonials page added (`js/data.js` TESTIMONIALS, empty).
- CSS/JS links carry `?v=20261124` so browsers and Cloudflare do not mix old CSS with new pages.
