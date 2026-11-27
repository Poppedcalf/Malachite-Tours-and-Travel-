# Search and growth plan (27 November 2026)

Goal: more people find Malachite on Google and in AI assistants, and more of them send an enquiry.
Round 11 (see `ROUND11-SEO-PERFORMANCE.md`) fixed the technical side without changing approved wording. What is left below needs a decision, information or action from Malachite. Ordered by impact.

## Where things stand
- Lighthouse (mobile, local test): SEO 100, accessibility 100, best practices 100 on Home, Destinations and Packages. Performance: Home about 83 (was 67), Destinations 82, Packages 83.
- Every package, the FAQ and the tailor-made list are now readable without JavaScript, with structured data describing the agency, the packages and the FAQ.
- Competitor check: for searches such as "Zimbabwe safari packages" and "Lake Kariba houseboat", the first results are mostly listing sites (SafariBookings, TourRadar, Go2Africa), and the operators that stand out show a starting price and many reviews.

## 1. Put this site on www.malachitetours.com (biggest single step)
The company's official address, printed in the brochure, is www.malachitetours.com, but this site lives at malachite-travel-and-tours.pages.dev. Search engines treat these as two different businesses' websites. The old site also still carries leftover template text (for example Nepal trekking inclusions on two package pages), which hurts trust.
- Add www.malachitetours.com (and malachitetours.com) as a custom domain on the Cloudflare Pages project.
- Change `BASE` at the top of `_tools/build.py` to `https://www.malachitetours.com/` and rebuild.
- Send each old page address to its new equivalent with a permanent redirect (I can write the redirect list once I have the old site's page addresses).
- Update the Facebook page, email signatures and future print to the one address.
- Later: a domain email such as info@malachitetours.com reads as more trustworthy than a Gmail address.

## 2. Google Business Profile and reviews
- Claim or create a Google Business Profile for the Kariba office (category: tour operator or travel agency), with photos, the website, WhatsApp number and opening hours. Add Harare and Victoria Falls only if each has a staffed address that can receive a verification postcard.
- Ask every returning guest for a Google review (a short link sent on WhatsApp works well). Reviews are the main local ranking factor and the main reason a visitor trusts a small operator.
- The Testimonials page is ready and hidden from search until real quotes exist; send me genuine quotes (with permission) and it goes live.

## 3. Show starting prices
Listing sites and competitors show "From US$X per person". Malachite's current official site already publishes "From $X / Adult" rates, and this site can show a starting price per package (the price table is already in `js/data.js`, switched off). Confirming even three or four starting prices (for example Trans Borders, Lower Zambezi, Cape Town, Uganda) would make the packages much easier to compare and enquire about.

## 4. Measure what happens
- Verify the site in Google Search Console and Bing Webmaster Tools and submit `sitemap.xml` (needs the owner's Google account; I can add the verification tag).
- Add Cloudflare Web Analytics (free, no cookie banner) and count WhatsApp and email clicks as enquiries. Send me the token from the Cloudflare dashboard and I will add it.

## 5. Get listed and linked
Search engines judge a site partly by who links to it. Good, relevant places:
- Operator profiles on SafariBookings and TourRadar (they also bring direct enquiries), and TripAdvisor.
- The Zimbabwe Tourism Authority operator directory.
- Travel Connect Africa (Cephas is its President): a member link to the site.
- The partners on the Credentials page, and the Tashinga Initiative and Zambezi Elephant Fund, if they list supporters.

## 6. Journal articles (the page and template are ready)
One or two articles a month, written or checked by the team (Champion's first-hand knowledge is exactly what Google rewards). Suggested topics that match what people search for:
1. A Lake Kariba houseboat holiday: what to expect
2. When to visit Victoria Falls: high water or low water?
3. Walking and canoe safaris in Mana Pools
4. Victoria Falls, Chobe and Livingstone in one week
5. Visiting Great Zimbabwe and the Matobo Hills
6. Planning a school or university trip to Zimbabwe
7. Hosting a conference or incentive trip in Victoria Falls
8. Gorilla trekking in Uganda: how it works
Each article links to the matching package, and is added to the sitemap automatically.

## 7. Photos and the hero video
- Real photos from Malachite trips (team portraits, guests with consent, the Vadoma or Binga photograph) build trust and appear in image search.
- The desktop hero video is 31 MB and loads from the old GitHub address. A compressed version of about 4 to 6 MB hosted with the site would make the homepage much faster on computers. This needs your go-ahead as a separate task, because the hero video was marked "do not edit".

## 8. Later (when new pages are allowed)
A page per package (for example "Lake Kariba Houseboat Charters" or "Mala Trans Borders Pack") would let each one rank for its own searches. Parked for now, as requested.

## Search titles changed in Round 11 (for approval)
These appear as the blue headline in Google results, not on the page itself.

| Page | Before | Now |
|---|---|---|
| Home | Malachite Travel & Tours \| Zimbabwe, Southern and East Africa | Zimbabwe Safari & Tour Packages \| Malachite Travel & Tours |
| Destinations | Destinations \| Zimbabwe, Southern & East Africa \| Malachite Travel & Tours | Safari Destinations: Zimbabwe, Southern & East Africa \| Malachite |
| Packages | Tour Packages \| Zimbabwe, Southern & East Africa \| Malachite Travel & Tours | Safari & Tour Packages, Lake Kariba Houseboats \| Malachite |
| MICE | MICE Travel \| Meetings, Incentives, Conferences and Events \| Malachite Travel & Tours | MICE Travel in Zimbabwe & Africa \| Malachite Travel & Tours |
| Filming | Filming and Location Scouting in Africa \| Malachite Travel & Tours | Filming & Location Scouting in Zimbabwe & Africa \| Malachite |
| About | About Us \| Malachite Travel & Tours | About Malachite Travel & Tours \| Tour Operator in Zimbabwe |

The descriptions under each title were also shortened to fit Google's limit (about 155 characters), using facts already on the site.

## To check after the next deploy
I could not open the live site from this environment, so after Cloudflare deploys this branch:
- Run the homepage through PageSpeed Insights (pagespeed.web.dev) and the Rich Results Test (search.google.com/test/rich-results).
- Open https://malachite-travel-and-tours.pages.dev/trips and confirm it lands on Packages.
