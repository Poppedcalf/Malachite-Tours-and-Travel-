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
