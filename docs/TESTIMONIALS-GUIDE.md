# Adding guest reviews

Reviews appear in two places:
- **Homepage**, "What Our Guests Say": the newest three, with links to all reviews, Google and Tripadvisor.
- **Testimonials page** (`testimonials.html`): every review, plus buttons to read the Google and Tripadvisor reviews and to leave a review.

Nothing shows while the list is empty, and the Testimonials page stays hidden from Google until the first review is added. After that it is listed in the sitemap automatically.

## 1. Add a review
Open `js/data.js`, find `const TESTIMONIALS=[`, and add one line per review, newest first, separated by commas:

    {"q":"The review, word for word.","name":"Sarah M.","src":"google","rating":5,"date":"October 2026","trip":"Lake Kariba houseboat","url":""},

- `q`: the review exactly as written. Do not shorten, correct, translate or tidy it. If it contains a double quote, write it as `\"`.
- `name`: the name exactly as shown on the review.
- `src`: `google`, `tripadvisor`, or `guest` (a message a guest sent you directly, used with their permission).
- `rating`: the stars given (1 to 5). Leave it out for a guest message.
- `date`: month and year shown on the review.
- `trip` (optional): the trip, if the review says which one.
- `url` (optional): a link to that review.

## 2. Video reviews
- **On YouTube** (recommended: fastest page, no large files): upload the video (it can be "unlisted"), then add `"youtube":"VIDEO_ID"`, the part after `v=` in the address.
- **As a file**: keep it short (under a minute) and compressed (under about 10 MB), put it in `videos/reviews/`, add a still image to `images/`, and add `"video":"videos/reviews/NAME.mp4","poster":"images/NAME.jpg"`.
- A video entry can have a short `q` (a line the guest said) or none. Get the guest's written permission to publish their video.

## 3. Links to your review pages
Fill in `const REVIEW_LINKS` in `js/data.js`:
- `google`: the Google Maps link to the business (on the profile: Share > Copy link).
- `googleWrite`: the "Ask for reviews" link from Google Business Profile (send this to guests after their trip).
- `tripadvisor`: the Tripadvisor listing address.

## 4. Rebuild
Run `python3 _tools/build.py`, then upload or commit as usual.

## Note on star ratings in Google
The site does not add star-rating code for search results on purpose: Google does not show stars for reviews a business publishes about itself, and treats it as a policy issue. Stars in Google come from the Google Business Profile itself.

## Reviews sent through the website
The "Share Your Experience" form on the Testimonials page sends the review to Malachite by WhatsApp or email (nothing is stored on the site). To publish one:
1. Check the guest ticked "Malachite may publish my review" (the message says so).
2. Add it to `TESTIMONIALS` with `"src":"guest"`, the rating, the text exactly as sent, the name (and country in `trip` if you like), and rebuild.
Keep the message as your record of permission. Publishing a selection is fine as long as the page does not claim to show all reviews. Do not use the form to decide who gets asked for a Google review: Google's rules require inviting every guest.

## One review in two places
Google and Tripadvisor only accept reviews a guest posts from their own account; a website or business cannot submit one for them.
- Best: ask every guest to review on Google first (send the googleWrite link or a QR code), then add the good ones to the website.
- From the website form: after sending, every guest (whatever their rating) sees "Also post it on Google / Tripadvisor". Pressing it copies their review text and opens the platform, so they only need to paste it. The Google button appears once `googleWrite` or `google` is filled in REVIEW_LINKS.

## Review form is Google-first (from 27 November 2026)
1. The guest writes their review and presses **Post on Google**: the text is copied and Google's review box for Malachite opens (REVIEW_LINKS.googleWrite); they choose the stars, paste and post from their own Google account.
2. Guests without Google use **No Google account? Send it to us instead**: rating, name, optional country and trip, permission box, then WhatsApp or email. After sending they are offered Google and Tripadvisor again.
Both options are shown to everyone before any rating is given, so this stays within Google's rules.
