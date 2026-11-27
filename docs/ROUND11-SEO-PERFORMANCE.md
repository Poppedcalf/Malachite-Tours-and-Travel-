# Round 11 (27 November 2026): search and speed improvements (no approved wording changed)

## What changed
- **Faster pages.** Header, footer and closing logos now use 480 px copies of the same official artwork (about 57 KB instead of 175 KB each, loaded on every page). The browser-tab icon uses 32 px and 192 px copies of the wing symbol (2 KB instead of 129 KB), plus an Apple touch icon. Seven older photographs saved at maximum quality were re-saved at normal web quality (70 to 80% smaller, same size and look). Hero preloads on inner pages now fetch the same file size the page uses.
- **Lighthouse (mobile, local test):** Home performance 67 to about 83 (largest paint 5.9 s to 4.5 s, 360 KB lighter); Destinations 78 to 82; Packages 81 to 83 and accessibility 98 to 100. SEO, accessibility and best practices are 100 on all three.
- **Packages, FAQ and tailor-made list are now in the HTML.** They were drawn by JavaScript only, so search engines that do not run scripts, and AI assistants, saw an almost empty Packages page (about 270 words). The build now writes the same cards and answers into the page; the filters still work as before.
- **Canonical and sitemap addresses** use the form Cloudflare Pages actually serves (`/packages`, not `/packages.html`, which Cloudflare redirects). Published journal articles are added to the sitemap automatically.
- **Structured data:** richer TravelAgency details (logo, countries served, award, ZTA affiliation, contact point), a WebSite entry (helps Google show "Malachite Travel & Tours" as the site name), the package list as TouristTrip items, and the FAQ written into the page.
- **Search titles and descriptions** rewritten for Home, Destinations, Packages, MICE, Filming, About and Plan Your Trip (facts already on the site; visible page text unchanged). See the table in the strategy note.
- **Caching and security headers** for Cloudflare Pages in `_headers`; stylesheet and script addresses carry a version that changes automatically on every build, so visitors never get an outdated file. `_redirects` sends the old Trips address to Packages with a permanent redirect.
- Packages page headings now follow a correct order (accessibility).

## Notes for whoever edits next
- Always run `python3 _tools/build.py` after editing `_src/` or `js/data.js`; it updates the versions, the pre-rendered packages and FAQ, and the sitemap.
- The original logo files (`malachite-logo-white.png`, `malachite-logo-black.png`, `malachite-wing-symbol.png`) are untouched and still in `images/`.
- If the site moves to www.malachitetours.com, change `BASE` at the top of `_tools/build.py` and rebuild.
