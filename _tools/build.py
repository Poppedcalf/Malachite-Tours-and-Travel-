#!/usr/bin/env python3
"""
Malachite site builder.
Usage (from the project folder):  python3 _tools/build.py

Reads  _src/pages/*.html  (page content) and _src/partials/*.html (shared header, footer, dialogs)
and writes the finished pages (index.html, about.html ...) into the project root.
It also refreshes the photo registry inside js/data.js from the files in images/.
Folders starting with an underscore are NOT published by GitHub Pages (Jekyll skips them).
"""
import re, os, json, sys, glob
from pathlib import Path
try:
    from PIL import Image
except ImportError:
    Image = None

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / '_src'
BASE = 'https://malachite-travel-and-tours.pages.dev/'   # canonical host (Cloudflare Pages)

NAV = [('home','index.html','Home'),('destinations','destinations.html','Destinations'),('packages','packages.html','Packages'),
       ('social','social-responsibility.html','Social Responsibility'),('testimonials','testimonials.html','Testimonials'),('about','about.html','About Us')]

# ---------- photo registry (sizes available per photo) ----------
def build_registry():
    reg = {}
    for p in sorted(glob.glob(str(ROOT / 'images' / '*.jpg'))):
        name = os.path.basename(p)[:-4]
        m = re.match(r'^(.*)-(640|1200|1920)$', name)
        if m:
            slug, w = m.group(1), int(m.group(2))
            reg.setdefault(slug, {'w': [], 'r': None})['w'].append(w)
        else:
            reg.setdefault(name, {})
    out = {}
    for slug, v in reg.items():
        if 'w' in v and v['w']:
            ws = sorted(v['w']); big = ROOT / 'images' / f'{slug}-{ws[-1]}.jpg'
            im = Image.open(big); r = [ws[-1], im.size[1]]
            out[slug] = {'w': ws, 'r': r}
        else:
            im = Image.open(ROOT / 'images' / f'{slug}.jpg'); out[slug] = {'legacy': 1, 'r': list(im.size)}
    # keep the original pixel size for the largest variant as aspect ratio only (width = largest file)
    return out

PH = build_registry()

def photo(slug, alt, sizes='100vw', cls='', eager=''):
    if slug not in PH: raise SystemExit(f'Unknown photo: {slug}')
    p = PH[slug]; w, h = p['r']
    if p.get('legacy'):
        src, srcset = f'images/{slug}.jpg', ''
    else:
        ws = p['w']; mid = min(ws, key=lambda x: abs(x - 1200))
        src = f'images/{slug}-{mid}.jpg'
        srcset = f' srcset="' + ', '.join(f'images/{slug}-{x}.jpg {x}w' for x in ws) + f'" sizes="{sizes}"'
    c = f' class="{cls}"' if cls else ''
    load = ' fetchpriority="high" decoding="async"' if eager else ' loading="lazy" decoding="async"'
    return f'<img{c} src="{src}"{srcset} alt="{alt}" width="{w}" height="{h}"{load} onerror="imgFail(this)">'

def nav_html(active, mobile=False):
    items = []
    for key, href, label in NAV:
        cur = ' aria-current="page"' if key == active else ''
        items.append(f'<a href="{href}"{cur}>{label}</a>')
    cur = ' aria-current="page"' if active == 'plan' else ''
    if mobile:
        items.append(f'<a href="plan.html"{cur}>Plan Your Trip</a>')
        items.append('<a data-wa="general" href="https://wa.me/263775515400" target="_blank" rel="noopener">WhatsApp</a>')
    return ''.join(items)

def partial(name):
    return (SRC / 'partials' / f'{name}.html').read_text(encoding='utf-8')

def parse_page(text):
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', text, re.S)
    meta = {}
    for line in m.group(1).splitlines():
        k, v = line.split(':', 1); meta[k.strip()] = v.strip()
    return meta, m.group(2)

JSONLD_AGENCY = '''<script type="application/ld+json">{"@context":"https://schema.org","@type":"TravelAgency","name":"Malachite Travel & Tours","url":"%s","telephone":"+263775515400","email":"malachitetours@gmail.com","address":{"@type":"PostalAddress","streetAddress":"Stand 643, ZV Mall","addressLocality":"Kariba","addressCountry":"ZW"},"sameAs":["https://www.facebook.com/malachitetours/"]}</script>
''' % BASE

def render_page(path):
    meta, body = parse_page(path.read_text(encoding='utf-8'))
    key = meta['nav']; out = meta['out']
    body = re.sub(r'\{\{photo ([^}]*)\}\}', lambda m: photo(*[x.strip() for x in m.group(1).split('|')]), body)
    body = re.sub(r'\{\{>([a-z]+)\}\}', lambda m: partial(m.group(1)), body)
    head = partial('head')
    preload = f'<link rel="preload" as="image" href="{meta["preload"]}">\n' if meta.get('preload') else ''
    head = (head.replace('{{title}}', meta['title']).replace('{{description}}', meta['description'])
            .replace('{{canonical}}', BASE + ('' if out == 'index.html' else out)).replace('{{base}}', BASE)
            .replace('{{preload}}', preload).replace('{{bodyclass}}', meta.get('body', ''))
            .replace('{{ogimage}}', meta.get('og', 'hero-victoria-falls.jpg'))
            .replace('{{jsonld}}', JSONLD_AGENCY if meta.get('jsonld') == 'agency' else ''))
    hdr = partial('header').replace('{{nav}}', '@@NAV@@').replace('{{plancur}}', ' aria-current="page"' if key == 'plan' else '')
    # first {{nav}} is desktop, second is mobile
    hdr = hdr.replace('@@NAV@@', nav_html(key, False), 1).replace('@@NAV@@', nav_html(key, True), 1)
    foot = partial('footer').replace('{{itinerary}}', partial('itinerary') if meta.get('itinerary') == 'yes' else '')
    html = head + hdr + body + foot
    if meta.get('depth') == '1':
        html = html.replace('<head>', '<head>\n<base href="../">', 1).replace('href="#', f'href="{BASE}{out}#')
        html = html.replace('<link rel="icon"', '<meta name="robots" content="index,follow">\n<link rel="icon"', 1)
    if meta.get('redirect'):
        tgt = meta['redirect']
        html = re.sub(r'(rel="canonical" href=")[^"]*(")', lambda m: m.group(1) + BASE + tgt + m.group(2), html, count=1)
        html = html.replace('</head>', f'<meta http-equiv="refresh" content="0;url={tgt}"><meta name="robots" content="noindex,follow">\n<script>location.replace("{tgt}"+location.search+location.hash)</script>\n</head>', 1)
    if meta.get('abs') == 'yes':   # 404 page: assets resolve from the site root whatever the broken URL looks like
        html = html.replace('<head>', f'<head>\n<base href="{BASE}">', 1).replace('</head>', '<meta name="robots" content="noindex">\n</head>', 1)
    if meta.get('noindex') == 'yes':   # empty or unpublished content pages stay out of search results until they have real content
        html = html.replace('</head>', '<meta name="robots" content="noindex,follow">\n</head>', 1)
    left = re.findall(r'\{\{[^}]*\}\}', html)
    if left: raise SystemExit(f'{out}: unresolved placeholders {left[:3]}')
    dest = ROOT / out; dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(html, encoding='utf-8')
    return out

def refresh_data_js():
    p = ROOT / 'js' / 'data.js'; s = p.read_text(encoding='utf-8')
    new = 'const PH=' + json.dumps(PH, separators=(',', ':')) + ';\n'
    s2 = re.sub(r'const PH=.*?;\n', lambda m: new, s, flags=re.S)
    p.write_text(s2, encoding='utf-8')

def write_site_files(built):
    skip = {'404.html', 'trips.html', 'testimonials.html', 'journal.html'}   # testimonials and journal are noindex until real content is published
    urls = [BASE + ('' if o == 'index.html' else o) for o in built if o not in skip]
    sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{u}</loc></url>\n' for u in urls) + '</urlset>\n'
    (ROOT / 'sitemap.xml').write_text(sm, encoding='utf-8')
    (ROOT / 'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {BASE}sitemap.xml\n', encoding='utf-8')

if __name__ == '__main__':
    pages = sorted((SRC / 'pages').glob('*.html'))
    built = [render_page(p) for p in pages]
    refresh_data_js()
    write_site_files(built)
    print('Built:', ', '.join(built))
