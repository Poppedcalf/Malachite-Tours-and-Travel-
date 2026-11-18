# Information needed from Malachite

## A. Phase 3 (November 2026): please confirm before launch

Nothing was invented for this upgrade. Where the brochure, the official website (www.malachitetours.com) and earlier materials disagreed, the site shows less rather than guessing.

### A1. Prices and packages
| Item | What was found | What the site does | What to confirm |
|---|---|---|---|
| Mala Trans Borders Pack | Official site: "From $2,480 / Adult"; name and duration match the brochure | Shows "From $2,480 per adult" | Currency (assumed US dollars, no code is printed), that it is still current, what it includes |
| Mala Lower Zambezi Expedition Pack | Official site: "From $3,650 / Adult"; name and duration match | Shows "From $3,650 per adult" | Same as above |
| Mala Marvel: Zimbabwe's Culture Pack | Two conflicting listings: $3,600 per adult, and "$700 (was $800) per adult, $450 per child" under an "8 Days" title. The brochure says 9 nights / 10 days. | No price; "Request a Quote" | The correct price and duration |
| Mala Zimbabwe Full Circle | $6,200 per adult is attached on the official site to a page whose itinerary is the 10-day culture route, not the brochure's 18-day loop | No price; "Request a Quote" | The correct price |
| The other 11 packages | No published price found | "Request a Quote" | Prices, if you want them shown |
| Inclusions and exclusions | The official site shows leftover text from an unrelated trekking template | Not used anywhere | What is really included and excluded, per package |
| Full Circle route | The brochure heading lists Mutare, the day-by-day text does not describe it | Site follows the eight described stages | Whether Mutare is part of the route |
| Spellings | The brochure has "Matusadonha", "Manapools", "NYAMINYANI", "Apack" | Standard spellings used (Matusadona, Mana Pools, Nyaminyami) | Preferred spellings |
| Brochure claims left out | A visitor figure for Hwange and a statement about a people's physical traits | Omitted on purpose | Whether you want them back, and a source |
| Day-by-day detail | The brochure gives stages, not days, for the South Africa, Botswana, Tanzania, Kenya and Uganda packages | Pop-ups show stage-by-stage outlines | Full itineraries if you want them |

### A2. Contact details
| Item | Status |
|---|---|
| Brochure details used everywhere | Stand 643, ZV Mall, Kariba; landline +263 61 214 5623; mobile and WhatsApp +263 775 515 400; malachitetours@gmail.com; www.malachitetours.com |
| Removed | "112 Powerline Road" (not in the brochure) and admin@malachite-tours.com. That address has a different domain from your official site and was never verified, so it no longer receives copies of visitor inquiries. To add an inbox back, put it in `CONFIG.emails` in `js/data.js`. |
| WhatsApp | Confirm +263 775 515 400 is a WhatsApp number that someone watches. |
| Facebook handle @malachitetours | Carried over from earlier material. Confirm the link. |

### A3. Photographs
| Photo | Used for | Confirm |
|---|---|---|
| cultural-village | Gauteng package and the South Africa chapter | Where it was taken. It stands in for the Lesedi Cultural Village visit, so replace it if it is not Lesedi. |
| rhino-flamingos | Kenya | Where it was taken (it looks like a Kenyan lake but nothing says so). |
| kenya-beach-resort | Kenya chapter | Whether this is the Diani or Mombasa coast. |
| elephants-woodland-herd, buffalo-waterhole | Botswana chapter and package | Where they were taken. They are captioned neutrally. |
| craft-market, harare-night | Culture pack, Harare | Locations |
| community-football, community-cleanup | Social Responsibility, About, Home | Where and when taken, whether they relate to the Smiling Children programme or the clean-ups, and that everyone shown (including children) agreed to publication. The captions are neutral. |
| All new photographs | Whole site | That Malachite owns or may use them |
| Held back | A white houseboat on a river and a man holding a tiger fish (supplied as a PNG) | Not used. I could not confirm they are genuine, rights-cleared photographs of Malachite's own operation. If they are, send a line saying so and they can be added. |
| Missing | Tanzania, Durban, vulture feeding, tree planting, team portraits | Tanzania and Durban are text-led and vulture and tree-planting have no picture rather than borrowing an unrelated one. |

### A4. People and company story
- **Team**: no names, roles or portraits were supplied. The site shows three role descriptions (planners, guides, transfers). Add real profiles in `TEAM` in `js/data.js`.
- **Company story**: founding year, founders, mission and values were not supplied, so About Us does not state them.

### A5. Social responsibility
- No statistics, beneficiary numbers, funding totals or partner organisations are published, because none were supplied.
- Confirm how supporters should give (money, materials, a bank or payment route). For now the page offers "Ask about supporting the children" by WhatsApp or email.
- The planner still offers two optional "voluntary contribution" tick-boxes. Nothing is collected online. Confirm you want them kept.

### A6. Existing content that is not in the brochure (carried over, unverified)
- The hero strip (inside the protected hero, not touched): "African Top 100 Tour Operators", ZTA affiliation, and "Supports the Tashinga Initiative and Zambezi Elephant Fund".
- The Credentials page (awards, ZTA, eight partners, organisations supported). It is still published and linked from About Us and the footer. See section 1 below.
- Footer credit "Engineered by Local Edge".

### A7. Web address
Canonical, social-share and sitemap addresses now use https://malachite-travel-and-tours.pages.dev/. If you later attach www.malachitetours.com to this Cloudflare project, change `BASE` in `_tools/build.py` and rebuild.

### A8. Small leftovers
- The hero button still says "Plan Your Journey" while the menu says "Plan Your Trip". The hero is protected, so this was left.
- The Travel Journal page still exists but is not in the menu until there are articles.

---

## Earlier items (Phase 2)

Nothing below has been invented. Items in section 1 are published in this build because they appear in the materials you supplied, but they must be checked before launch.

## 1. Confirm before launch (already on the site)

| Item | Where it appears | What to confirm |
|---|---|---|
| "Africa Travel 100" award | Credentials page | Read from a small photo of a plaque in the email screenshot. Year, awarding body and exact wording are not legible. The existing homepage says "African Top 100 Tour Operators": confirm the correct wording and send a clear photo of the plaque. |
| "Best Tour Operator Stand, 2024, Sanganai World Tourism Expo" | Credentials page | Read from the second plaque. Confirm the exact title, event name and year. |
| Zimbabwe Tourism Authority (ZTA) affiliation | Home, Credentials | Membership type, number and year; permission to use the ZTA name. |
| Eight partners: BeWildered Safaris, Zambezi Cruise & Safaris, Shearwater Victoria Falls, Brontë The Garden Hotel, Hyatt Regency Harare The Meikles, Victoria Falls Safari Lodge, Camp Mana by Sunpath Safaris, African Sun Hotels and Resorts | Credentials | Names read from logos in the email screenshot. Confirm each is a current partner, the nature of the relationship, and that they agree to be named. Supply their official logo files if you want logos shown. |
| Eight services (tour packages, hotel and lodge bookings, airport transfers, car hire, houseboat bookings, adventure activities, corporate travel management, travel consultation) | About, Trips | Taken from the company flyer. Confirm each is current, the areas covered, and whether car hire includes a driver. |
| Tagline "brings a smile to your face" | About | From the flyer. Confirm it is the official line. |
| Email addresses | Everywhere | malachitetours@gmail.com is in the company signature and is now the main recipient of planner emails. admin@malachite-tours.com is copied but was never verified. Which should be shown? |
| Website address | Not shown | The signature gives www.malachitetour.com, the site uses github.io and the emails use malachite-tours.com. Which is the official domain? |
| Addresses and numbers | Footer, Plan page | Stand 643, ZV Mall (the flyer adds "Nyamhunga"); 112 Powerline Road; +263 775 515 400; landline +263 61 214 5623. Confirm all are current, and give opening hours. |
| Kruger / Mpumalanga inclusions | Trips, Destinations | The existing itinerary says exact inclusions are to be confirmed. |
| Journey data (itineraries, nights, routes) | Trips | Carried over from the original site. Confirm they are still correct. |

## 2. Content still to be supplied

1. **Company story and mission**: founding year, founders, why Malachite exists, values, years in operation, licence or registration numbers, team (names and roles, only if you want them published). The About page has a marked place for this.
2. **Guest testimonials**: genuine quotes with the guest's name (or first name and country), trip, month, and written permission. The Credentials page has a marked place for them.
3. **Journal articles**: real articles from the team (see JOURNAL-GUIDE.md). The journal launches empty on purpose.
4. **Prices**: approved rates, or confirmation that the site stays enquiry-only. No price is shown or sent today. The old illustrative rates stay hidden in js/data.js and are switched off.
5. **Practical information for international visitors**: only what Malachite confirms, for example entry requirements, seasons, health advice, payment methods, cancellation terms, what is included.
6. **Houseboat details**: vessel names, capacities, facilities.
7. **Social accounts**: the email signature shows icons for Instagram, X (Twitter), Snapchat, TikTok and Facebook. Only Facebook (@malachitetours) is linked, because the other handles are not known.
8. **Contact person**: the signature names Cephas Shonhiwa. Confirm his role and whether to publish a named contact.
9. **Policies**: a privacy notice and terms of use (for example how WhatsApp and email inquiries are handled).

## 3. Media

1. **Lake Kariba footage and photos** (houseboats, the dam wall, the shoreline, sunsets, wildlife seen from the water). The current hero video is generic safari footage.
2. **Rights**: who shot or owns each supplied photo and video, and whether Malachite may use them. Several look like stock or marketing images (for example the lodge deck, the safari vehicle with lions, the lions on red rock).
3. **Locations**: where each unconfirmed photo was taken (see ASSET-INVENTORY.md). Captions are neutral until confirmed. Update them in `js/data.js` (galleries) and the page files.
4. **Consent**: for photos with identifiable people (dancers and diners, the donkey-cart visitors, the man with the tiger fish).
5. **Authenticity**: confirm the tiger-fish picture and the animal pictures on the flyer are genuine photographs and not digitally generated.
6. **Higher-resolution originals** of the existing project photos (most are only 640 to 715 px wide).
7. **Original award photos** and **partner logos** (the email screenshot is too small to display).
8. **Logo**: a vector or high-resolution file.
