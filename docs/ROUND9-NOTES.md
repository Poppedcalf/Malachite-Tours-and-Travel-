# Round 9 (27 November 2026): simpler, promotional homepage; MICE; Filming; student tours

Source: "Website Corrections" (homepage) from Mr Shonhiwa, plus the request to add MICE and Filming and a package for students. Nothing was pushed, merged or deployed.

## Homepage, in order
1. **Hero.** The headline is smaller, in a new style ("Experience" in small gold italic above "Zimbabwe, Southern and East Africa"). New sub-line from the corrections. "Plan Your Trip" button removed; only "Explore Our Destinations" remains. The hero video, poster, video markup and script are unchanged.
2. **Destinations** ("Zimbabwe, Southern and East Africa"). New introduction and the six country texts, each with its tagline. Every country now has its own photo, always visible (the earlier explorer only showed one photo at a time). Botswana's photo was changed (aerial river channels); Tanzania now shows the hot-air balloon over zebra plains; Kenya shows the rhino with flamingos (Lake Nakuru, as in the new text). Less space above this section and below "See all destinations".
3. **Choose Your African Experience.** The six experiences, wording as supplied, each with a photo: Safari (elephants), Culture (Maasai dance, until a Vadoma or Binga photograph is supplied), Adventure (canoe beside elephants), Beach and Island (houseboat at sunset, as requested), Gorilla and Primate, Luxury and Honeymoon (lodge deck at dusk). Each card opens the matching package filter; Luxury and Honeymoon opens Plan Your Trip.
4. **Tour Packages** (capital P). New introduction; less space above.
5. **MICE, Filming and Student Travel** (new). Three photo cards linking to the new MICE and Filming pages and the student package.
6. **Why Malachite, Your Travel Partner.** The four new points.
7. **How Planning Works.** The seven steps.
8. **Our Team.** Cephas Shonhiwa, Savanna McCowen Hill, Champion Sadiere and Hildar William, with their supplied text. The repeated sentence about Travel Connect Africa appears once. Initials are shown until portraits are supplied.
9. Contact block and footer (unchanged).

**Removed from the homepage** to shorten it: the "Based in Zimbabwe" introduction block, the houseboat spotlight (houseboats now sit under Beach and Island and in Packages), and the credentials and social-responsibility panel (still on their own pages and in the footer).

On phones, the destination, experience, package and team cards slide sideways. The homepage is about 42% shorter on a phone (19,065 px to about 11,000 px) and a little shorter on desktop.

## New pages and package
- `mice.html`: Meetings, Incentives, Conferences, Events; what the team handles (flights and transfers, accommodation, activities, one point of contact); pre-filled WhatsApp and e-mail enquiry.
- `filming.html`: location scouting, crew travel and accommodation, transport, local knowledge; six location photographs; pre-filled WhatsApp and e-mail enquiry. A marked place is left in the page source for the production videos.
- **Student and School Tours** package (`st` in `js/data.js`): primary, secondary and tertiary groups; learning themes (history and heritage, geography and science, wildlife and conservation, culture); "Price on request"; can be chosen in the planner. A new "Student and school tours" filter appears on the Packages page.
- Experience filters on the Packages page now match the homepage: safari, culture, adventure, beach and houseboat, gorilla and primate.

## Navigation
Header: Home, Destinations, Packages, MICE, Filming, About Us (and Plan Your Trip). Social Responsibility, Testimonials and Credentials moved to the footer only. Footer also lists MICE, Filming and Student and School Tours.

## Checks run
Real Chromium at 390, 768, 1000 and 1440 px on all pages including the two new ones: no overflow, no broken images, alt text, one h1, unique ids, named links. 51 interaction checks pass (including new ones for the homepage cards, the five experience filters, the student package in the planner, and the MICE and Filming enquiry links). The older suite passes except the two price checks that fail on purpose (prices stay hidden). The hero video markup and script are identical to before. Not tested: real phones, Safari, Firefox.

## Questions for Malachite
1. **Vadoma or Binga photograph** for the Culture card (requested in the corrections; none on file).
2. **Production videos** for the Filming page, with the production names and permission to show them.
3. **Filming services**: does Malachite also arrange filming permits or park permissions? The page does not say so until confirmed.
4. **Team portraits** (with consent), and confirmation of the role titles "Head of Marketing" and "Head of Admin and Finance" (written "Head Marketing" and "Head Admin & Finance" in the corrections).
5. **Places named in the new text but not in any package**: Garden Route, Ngorongoro, Kilimanjaro, Amboseli, Lake Nakuru, Murchison Falls, Queen Elizabeth, Kibale, Bazaruto, Lake Malawi, Umhlanga, Vadoma visits, paragliding. Visitors may ask for them; packages can be added when ready.
6. **Photo locations**: the Botswana, Tanzania and Kenya photographs are matched to the text, not confirmed. Please confirm or replace.
7. **School group size**: the planner allows up to 30 adults and 20 children. Should student groups allow more?
8. **Student package details**: typical durations, destinations and anything included (for example supervision ratios or educational materials), when you want them shown.

## Layout correction (27 November 2026)
The Round 9 files were built on the Round 8 redesign, which had never been live (the Round 8 upload only carried notes and a few source files). At the owner's request the site is back on the earlier layout (as of commit 5691b12: `css/style.css`, `js/app.js`, `_src/pages`, `_src/partials`, `_templates/article.html`), with the Round 9 content carried into it:
- Homepage: Round 9 hero sub-line (single "Explore Our Destinations" button), destination texts, taglines and photos in the original mosaic, six experiences in the original tile grid, new Tour Packages introduction, a MICE, Filming and Student Travel tile row, the four "Why Malachite" points, the seven planning steps and the four team members.
- MICE and Filming pages rebuilt with the original page components; enquiry links work as before.
- Student and School Tours package, the experience filters and the new package photos (`js/data.js`) are kept.
- "Based in Zimbabwe, with offices in Kariba, Harare and Victoria Falls" wording applied to the footer, contact block, About, Plan Your Trip and Testimonials.
- Header: Home, Destinations, Packages, MICE, Filming, Social Responsibility, About Us. Footer adds MICE, Filming and Student and School Tours.
Small additions for this live at the end of `css/style.css` ("Round 9 content in the original layout").
