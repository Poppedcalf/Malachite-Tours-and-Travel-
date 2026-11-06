# Travel Journal publishing guide

The Travel Journal page reads `journal/index.json`. Keep it as a JSON array. Each entry should contain:

```json
{
  "title": "Article title",
  "url": "journal/article-slug.html",
  "category": "Destination guide",
  "summary": "A short, accurate summary.",
  "image": "local-image-slug",
  "alt": "Accurate image description"
}
```

Only add an article after Malachite has reviewed and approved the content. Use accurate author/date details, cite authoritative sources for practical travel information, and check the image's location and usage rights. The website is a static GitHub Pages site, so article HTML files should be added under `journal/` and linked through this index.
