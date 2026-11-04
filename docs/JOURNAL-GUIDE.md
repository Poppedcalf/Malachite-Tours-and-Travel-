# Adding a Travel Journal article

The journal launches empty on purpose: no articles have been invented. It is ready for real ones.

## One-time setup
You need Python 3 (free) to run `python3 _tools/build.py`. Without it, you can still edit the finished `.html` pages directly, but header or footer changes would then need repeating on every page.

## For each article
1. Copy `_templates/article.html` to `_src/pages/journal-<short-name>.html`.
2. At the top, change `out:` to `journal/<short-name>.html`, and fill in `title:` and `description:`.
3. Replace every `[bracketed]` placeholder with real text. Delete blocks you do not need. Only include facts Malachite has confirmed. State a place in a photo caption only if you are sure of it.
4. Put the photos in `images/` (see ASSETS.md) and refer to them by file name. The template shows how.
5. Add one entry to `journal/index.json`:

       [
         {
           "title": "Article title",
           "url": "journal/short-name.html",
           "category": "Destination guides",
           "summary": "One or two sentences.",
           "image": "photo-file-name-without-extension",
           "alt": "Describe the photo"
         }
       ]

   Categories used on the page: Destination guides, Travel inspiration, Travel tips, Company updates.
6. Run `python3 _tools/build.py`, then upload the new article, `journal/index.json` and any new photos.

`_templates/article-layout-preview.html` shows the article layout with placeholder text. Open it on your computer to see the design. It is not published.
