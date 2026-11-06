# Destination expansion add-on

This package adds five dedicated destination guides and supporting technical files.

## New pages
- `destinations/lake-kariba.html`
- `destinations/mana-pools.html`
- `destinations/matusadona.html`
- `destinations/victoria-falls.html`
- `destinations/heritage.html`

Their editable source is in `_src/pages/destination-*.html`. Shared design is retained. The current Destinations landing page and homepage now link to the guides.

## Technical additions
- `sitemap.xml` lists the current public pages.
- `robots.txt` points crawlers to the sitemap.
- `404.html` is a branded GitHub Pages not-found page.
- Page-specific 1200×630 social preview images are saved in `images/social-*.jpg`.
- The shared head template now uses page-specific Open Graph and Twitter images.
- The homepage still image uses a wide sunset-over-water photograph instead of the Victoria Falls portrait image.

## Content notes
Destination facts are kept general and linked to official Zimbabwe Tourism, ZimParks and UNESCO resources. Activity availability, routes, suppliers and inclusions must still be confirmed by Malachite. Some supplied wildlife and destination photographs have an unconfirmed exact location; captions intentionally remain neutral.

## Build
From the repository root run:

```bash
python3 _tools/build.py
```

Upload the patch files over the existing repository, preserving folders. Do not delete files that are not included in the patch.

## Official destination references used
- Lake Kariba Recreational Park — Zimbabwe Tourism: https://zimbabwetourism.net/portfolios/lake-kariba-recreational-park/
- Mana Pools National Park — ZimParks: https://www.zimparks.org.zw/mana-pools-national-park/
- Mana Pools, Sapi and Chewore World Heritage property — UNESCO: https://whc.unesco.org/en/list/302/
- Matusadona National Park — ZimParks: https://www.zimparks.org.zw/matusadona-national-park/
- Mosi-oa-Tunya / Victoria Falls — UNESCO: https://whc.unesco.org/en/list/509/
- Victoria Falls — Zimbabwe Tourism: https://zimbabwetourism.net/portfolios/victoria-falls/
- Great Zimbabwe National Monument — UNESCO: https://whc.unesco.org/en/list/364/

These links are provided for visitor context and factual reference. They do not imply endorsement or partnership. The destination-specific activity descriptions on Malachite pages are based on the current site content and still require operational confirmation by Malachite.
