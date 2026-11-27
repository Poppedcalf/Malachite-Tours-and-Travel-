# Round 8 (November 2026): complete website redesign

Brief: redesign every public page as a premium, editorial, image-led African travel site, keeping the Malachite identity, approved information, functionality and URLs. Nothing was pushed, merged or deployed.

## What was kept exactly
- Official logo files and favicon state (see `UPGRADE-NOTES.md`). No logo was recreated, recoloured or stretched.
- Brand colours (`--mal #004B49`, `--for #0D5C58`, `--deep #00302F`, `--gold #F28C28`, `--gold2 #B35A0C`, sand, warm, ink) and the DM Sans / Cormorant Garamond pairing (italic Cormorant weights added for accents).
- Hero video, its poster and its script. The hero block in `js/app.js` is byte-identical to `_backup/phase2/app.js`.
- All approved copy, package data, names, contact details, WhatsApp number, e-mail addresses and every URL (`trips.html` still redirects to `packages.html`). All "Price on request" wording. No price, estimate or range was added.
- Homepage order Hero > Destinations > Packages > Team > Contact > Footer still holds (see "For approval", item 1).

## Update: company positioning (26 November 2026)
Malachite is not based only in Kariba. All copy now reads "based in Zimbabwe, with offices in Kariba, Harare and Victoria Falls".
- Changed: footer, home-page introduction, third fact tile ("3 offices") and "Why Malachite" item, home closing block, About (hero, Who we are, fact ledger, "Six countries, three offices in Zimbabwe"), Plan Your Trip (title, description, contact block, photo caption), team introduction, Testimonials description, and the structured data description. The Credentials introduction no longer calls the Zambezi Valley "our workplace and our neighbourhood".
- Not changed: the Kariba address (Stand 643, ZV Mall), shown as "Kariba office". Telephone numbers, e-mail, WhatsApp, hero block and all URLs are as before. Lake Kariba remains a destination and houseboat charters stay in the packages.
- Not published: Harare and Victoria Falls addresses, telephone numbers and opening hours (none were supplied; none were invented).

## Pages redesigned
| Page | What changed |
|---|---|
| Home | New statement band with facts and a two-photo collage; six-country destination explorer (hover or keyboard on desktop, photo cards on touch); five expanding experience panels linking to the package filters; six featured packages; houseboat spotlight with three boat photographs next to the description; "Why Malachite" with a photograph; process; credentials and social responsibility split. |
| Destinations | Country tile atlas; Zimbabwe opener; four Zimbabwe chapters and five other countries, each with a photo band, a fact strip ("at a glance"), photo-led attraction rows with captions, links to the packages for that place and a pre-filled WhatsApp question; immersive Lake Kariba chapter with houseboat photos beside each experience; Durban, Tanzania and Kenya now have photographs. |
| Packages | Rebuilt cards (photo, country, name, route, description, tags, "Price on request", Itinerary / Request a Quote / WhatsApp); the grid always ends on a full row; Lake Kariba houseboat charters as a full-width feature with photographs beside the experience list; tailor-made section with three zoomable photographs. |
| About | Editorial "Who we are" with the Kariba Dam photograph and a fact ledger; "Where we operate" country tiles plus a houseboat link; "What we arrange" beside a sticky photograph; social responsibility and credentials as two photo panels. |
| Credentials | Recognition ledger on deep green; partners beside a lodge photograph (all eight names and empty logo slots unchanged); supported organisations with the Smiling Children programme beside its photograph. |
| Social Responsibility | The community photograph is now the hero; numbered overview; "The Smiling Children of Mala" heading kept on one line at every width; numbered needs, a help panel with the existing WhatsApp and e-mail actions; green tourism beside the clean-up photograph. |
| Journal | Image-led section introduction; filter chips and article grid appear automatically when `journal/index.json` has articles; empty state with working next steps; article template with a readable 720 px column, meta line, wide figures, call to action and automatic "Keep reading". |
| Plan Your Trip | New hero; "How planning works" as a numbered ledger with the "not a reservation" notice; the planner itself is unchanged in function; contact section on deep green beside a Kariba photograph. |
| Testimonials, 404, trips | Restyled to match; 404 now has a photograph and the same three actions. |

## Functional changes
- `data-wapk="<package id>"` and `data-wadest="<destination>"` links build a pre-filled WhatsApp message with the package or destination name and the usual `[Ref: ...]` code (`pkLinks()` in `js/app.js`). The reference is renewed after a message is sent.
- Houseboat deep link: `packages.html?filter=Kariba%20Houseboats#charters` scrolls to the charters section.
- Photographs marked `figure[data-zoom]` get an enlarge button and open in the existing lightbox; photographs in one section can be browsed together.
- Journal filter chips and "Keep reading" (both only appear when articles exist).
- Footer is now the brand deep green with a thin orange top rule (it was near-black).
- `_tools/build.py`: breadcrumb structured data on indexable inner pages; article preview rebuilt on every build; in-page links on depth-1 pages are relative, so they no longer depend on the host name.

## Photography map (18 new photographs)
Every photograph was resized to 640 and 1200 px (and 1920 px where the source allowed) with `srcset`, width and height attributes, lazy loading (only the first image of each page loads eagerly) and a fallback. Alt text describes only what is visible.

| Photograph | Used on |
|---|---|
| falls-gorge-bridge | Home (Zimbabwe explorer), About tile, Destinations (Falls trio, Zimbabwe tile) |
| cape-town-peninsula-aerial | Home (South Africa), About tile, Destinations (South Africa, Cape Town row), Journal ("Destination guides") |
| elephants-river-shore | Home (Botswana), About tile, Destinations (Falls trio, Botswana) |
| zanzibar-beach-jetty | Home (Tanzania), Destinations, Tanzania package card |
| zanzibar-beach-boats | About tile, Destinations (Zanzibar rows) |
| balloon-zebras-plains | Home (Kenya), Destinations (Tanzania), Kenya package card, Journal ("Travel inspiration") |
| maasai-jumping-dance | Home (culture panel), About tile, Destinations (Kenya) |
| gorilla-young-leaves | Home (Uganda), About tile, Destinations (Uganda), Uganda package |
| elephant-woodland-light | Home collage, Destinations (Wildlife), Packages (tailor-made) |
| lions-golden-grass | Home collage, Destinations (Wildlife band), Packages (tailor-made) |
| giraffe-acacia | Home ("Why Malachite"), wildlife gallery |
| durban-skyline-dusk, durban-palms-stadium, durban-pool-sunset | Destinations (Durban) |
| houseboat-sunset-stern | Home (houseboat spotlight), Destinations (Kariba), Houseboat Charters package |
| kariba-sunset-cruiser | Home (houseboat spotlight), Destinations (Kariba). |
| kariba-day-cruiser | Destinations (Kariba). Both cruiser sources are about 650 to 700 px wide, so they are shown small only. |
| delta-channels-aerial | Plan Your Trip hero (location-neutral, see "For approval") |

## Checks that were run
Real Chromium (Playwright), local files and a local web server, at 390, 768, 1000 and 1440 px:
- Every page present and built by `python3 _tools/build.py`; no unresolved placeholders.
- No horizontal overflow, no image load failures, no missing `alt`, no duplicate ids, exactly one `h1`, no unnamed buttons or links (all 10 pages at the four widths; the 404 page was tested separately through a local server because it uses an absolute base address).
- All internal links and in-page anchors resolve (package card anchors are created by the script and were checked in the browser).
- Interaction suite (`inter.js`, 43 checks, plus the new `r8func.js`, 38 checks): package filters, `?filter=`, `?exp=`, modals, planner pre-fill from every entry point, WhatsApp and e-mail link targets, pre-filled package and destination WhatsApp links, lightbox open / next / Escape, explorer hover and keyboard, experience panels, journal empty state, journal filter and "Keep reading" with sample articles, mobile menu, keyboard focus ring on 45 tab stops. The two known failures in `inter.js` assert the prices that were deliberately removed in an earlier round.
- Visual review of every page at 390, 768 (about, credentials, social responsibility) and 1440 px, and of the home page at 1000 px.
- Image weight on first load and structured data parse check (JSON-LD parses; telephone, e-mail and address match the site).

## Not verified
- Real phones, Safari and Firefox, screen readers, Lighthouse scores.
- Opening the real WhatsApp or mail apps (only link targets were checked).
- Google Fonts and the external hero video (blocked in the test environment; screenshots used fallback fonts).
- Touch-device behaviour of the explorer was checked by layout rules and viewport emulation only.

## For approval / to confirm (also in `MISSING-INFO.md`, section R8)
1. **Extra homepage sections.** The homepage order is unchanged, but between Packages and Team there are now the houseboat spotlight, "Why Malachite", the process and the credentials split. The houseboat spotlight is new in this round (the brief asks for houseboat photographs beside the experience descriptions). Remove `#houseboats` from `_src/pages/index.html` if you prefer the earlier, shorter homepage.
2. **`uganda-lake_bunyonyi.jpg` is not a lake.** It shows winding river channels through wetland. It is not placed under Uganda or Botswana; it is the Plan Your Trip hero with a location-neutral caption. Please confirm where it was taken.
3. **Photograph locations** inferred from file names and packages: lions, giraffe, the two elephant photographs, the Botswana, Zanzibar and Kenya pictures. Captions are neutral; please confirm or correct.
4. **Third-party branding in photographs**: the day-cruiser hull carries another operator's name; flags on the boats; hotel signage in a Durban photograph. Confirm rights, or supply alternatives.
5. **Low-resolution cruiser photographs** (about 650 px): they are only shown small. Higher-resolution originals would allow a larger display.
6. **Consent** for identifiable people in the community and dance photographs.
7. **"Mala" and "Malawi".** The programme is written "The Smiling Children of Mala" throughout, following the existing site. Earlier notes mention Malawi. Please confirm which is correct.
8. **Budget bands in the planner** ("Under US$1,500 per person" and so on) are the visitor's own choice, carried over from earlier rounds. They are not Malachite prices; remove them if you want no dollar amounts anywhere.
9. **Partner name spellings** (eight names as read from the email screenshot) and the still-missing **clean white-lettered logo** and **partner logos**.
10. **Page titles** for Destinations and Packages are longer than 60 characters and may be shortened in search results.
11. **Harare and Victoria Falls offices.** The site names them but publishes no address, telephone number or opening hours for either, as agreed. Send those details when you want them shown (see `MISSING-INFO.md`, R8 item 10).

## Deployment
Nothing in the build or hosting changed: Cloudflare Pages, the build command in `README.md` is unchanged (it still excludes `videos/hero.mp4`) and the output directory is still `dist`. Upload the project to the repository, let Cloudflare run the existing build command, and check the preview URL before promoting. New files: `images/*` (18 sets), `_src/pages/*`, `docs/ROUND8-REDESIGN.md`. CSS and JS links now carry `?v=20261126` (set in `_src/partials/head.html` and `footer.html`); change it if browsers show old styling after a later edit.
