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
       ('mice','mice.html','MICE'),('filming','filming.html','Filming'),
       ('social','social-responsibility.html','Social Responsibility'),('about','about.html','About Us')]
# Testimonials, Credentials and Journal stay in the footer (header kept short, Round 9)

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

def url_of(out):
    """Public address of a built page. Cloudflare Pages serves about.html at /about (and redirects the .html address there),
    so canonical, sitemap and structured-data addresses use the extension-less form. index.html is the site root."""
    if out == 'index.html': return BASE
    if out.endswith('/index.html'): return BASE + out[:-len('index.html')]
    return BASE + (out[:-5] if out.endswith('.html') else out)

def ld(data, attrs=''):
    return f'<script type="application/ld+json"{attrs}>' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '</script>\n'

# Structured data: only facts already shown on the site.
AGENCY = {
    "@context": "https://schema.org", "@type": "TravelAgency", "@id": BASE + "#agency",
    "name": "Malachite Travel & Tours", "url": BASE,
    "logo": BASE + "images/malachite-logo-official.png", "image": BASE + "images/hero-victoria-falls.jpg",
    "description": "Tailor-made safaris, tours and Lake Kariba houseboat charters across Zimbabwe, Southern and East Africa. Based in Zimbabwe, with offices in Kariba, Harare and Victoria Falls.",
    "telephone": "+263775515400", "email": "malachitetours@gmail.com",
    "address": {"@type": "PostalAddress", "streetAddress": "Stand 643, ZV Mall", "addressLocality": "Kariba", "addressCountry": "ZW"},
    "areaServed": [{"@type": "Country", "name": n} for n in ["Zimbabwe", "South Africa", "Botswana", "Tanzania", "Kenya", "Uganda"]],
    "award": "African Top 100 Tour Operators",
    "memberOf": {"@type": "Organization", "name": "Zimbabwe Tourism Authority (ZTA)"},
    "contactPoint": {"@type": "ContactPoint", "telephone": "+263775515400", "contactType": "reservations", "availableLanguage": "English"},
    "sameAs": ["https://www.facebook.com/malachitetours/"]}
WEBSITE = {"@context": "https://schema.org", "@type": "WebSite", "@id": BASE + "#website", "name": "Malachite Travel & Tours",
           "alternateName": "Malachite Tours", "url": BASE, "publisher": {"@id": BASE + "#agency"}}
JSONLD_AGENCY = ld(AGENCY)

def breadcrumb_ld(meta, out):
    """BreadcrumbList (Home > this page) for indexable inner pages; the name is the first part of the page title."""
    if out in ('index.html', '404.html') or meta.get('noindex') == 'yes' or meta.get('redirect') or meta.get('depth') == '1': return ''
    import html as _h
    name = _h.unescape(meta['title'].split(' | ')[0].strip())
    data = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE},
        {"@type": "ListItem", "position": 2, "name": name, "item": url_of(out)}]}
    return ld(data)

# ---------- data.js content, pre-rendered into the HTML so search engines and AI assistants can read it without running JavaScript ----------
def _data_js():
    return (ROOT / 'js' / 'data.js').read_text(encoding='utf-8')

def _jsstr(s):
    return s.replace("\\'", "'")

def load_pk():
    m = re.search(r'const PK=(\[.*?\]);\n', _data_js(), re.S)
    return json.loads(m.group(1))

def load_faq():
    m = re.search(r'const FAQ=\[(.*?)\];\n', _data_js(), re.S)
    return [(_jsstr(a), _jsstr(b)) for a, b in re.findall(r"\['((?:[^'\\]|\\.)*)','((?:[^'\\]|\\.)*)'\]", m.group(1))]

def load_tailor():
    m = re.search(r'const TAILOR=\[(.*?)\];\n', _data_js(), re.S)
    out = []
    for blk in re.findall(r'\{(.*?)\}', m.group(1)):
        f = dict((k, _jsstr(v)) for k, v in re.findall(r"(\w+):'((?:[^'\\]|\\.)*)'", blk))
        out.append(f)
    return out

def cat_name(c):
    return 'Lake Kariba houseboats' if c == 'Kariba Houseboats' else 'Student and school tours' if c == 'Student Tours' else c

def pk_card(p):
    """Same markup as card() in js/app.js (prices stay hidden: every package is quoted on request)."""
    cn = cat_name(p['cat']); ch = p['cat'] == 'Kariba Houseboats'
    pic = photo(p['img'], p['alt'], '(min-width:1040px) 33vw, (min-width:700px) 50vw, 100vw') if p.get('img') else f'<span>{cn}</span>'
    return (f'<article class="pc{" charter" if ch else ""}" id="pk-{p["id"]}"><div class="pc-img{"" if p.get("img") else " nophoto"}">{pic}<span class="badge">{p["dur"]}</span></div>'
            f'<div class="pc-b"><p class="cat">{cn}</p><h3>{p["title"]}</h3><ol class="route" aria-label="Route">' + ''.join(f'<li>{r}</li>' for r in p['route']) +
            f'</ol><p class="pc-d">{p["desc"]}</p><ul class="chips" aria-label="Main experiences">' + ''.join(f'<li>{h}</li>' for h in p['hl']) + '</ul>'
            '<div class="pc-price"><b>Price on request</b><small>Send your dates and group size and we will quote.</small></div>'
            f'<div class="acts"><button class="btn ghost" data-open="{p["id"]}" aria-label="View itinerary: {p["title"]}">Itinerary</button><button class="btn gold" data-plan="{p["id"]}" aria-label="Request a quote: {p["title"]}">Request a Quote</button></div></div></article>')

def strip_tags(s):
    import html as _h
    return _h.unescape(re.sub(r'<[^>]+>', '', s))

def prerender(body, out):
    extra_ld = ''
    if '<div class="pcg" id="pks"></div>' in body:
        pk = load_pk()
        land = [p for p in pk if p['cat'] != 'Kariba Houseboats']; boats = [p for p in pk if p['cat'] == 'Kariba Houseboats']
        body = body.replace('<div class="pcg" id="pks"></div>', '<div class="pcg" id="pks">' + ''.join(pk_card(p) for p in land) + '</div>')
        body = body.replace('<div class="pcg pch" id="pkh"></div>', '<div class="pcg pch" id="pkh">' + ''.join(pk_card(p) for p in boats) + '</div>')
        if boats: body = body.replace('<div class="charters" id="charters" hidden>', '<div class="charters" id="charters">')
        items = []
        for i, p in enumerate(pk, 1):
            t = {"@type": "TouristTrip", "name": strip_tags(p['title']), "description": strip_tags(p['desc']), "url": url_of(out) + '#pk-' + p['id'],
                 "itinerary": {"@type": "ItemList", "itemListElement": [{"@type": "ListItem", "position": n, "item": {"@type": "Place", "name": strip_tags(r)}} for n, r in enumerate(p['route'], 1)]},
                 "provider": {"@id": BASE + "#agency"}}
            if p.get('img'):
                ws = PH.get(p['img'], {}).get('w')
                t["image"] = BASE + (f'images/{p["img"]}-{ws[-1]}.jpg' if ws else f'images/{p["img"]}.jpg')
            items.append({"@type": "ListItem", "position": i, "item": t})
        extra_ld += ld({"@context": "https://schema.org", "@type": "ItemList", "name": "Malachite Travel & Tours packages", "itemListElement": items})
    if '<ul class="tl2" id="tailorList"></ul>' in body:
        body = body.replace('<ul class="tl2" id="tailorList"></ul>', '<ul class="tl2" id="tailorList">' + ''.join(
            f'<li><b>{t["t"]}</b><p>{t["d"]}</p><div class="acts2"><a class="lnk dk" data-ask="{t["id"]}" data-ch="wa" target="_blank" rel="noopener">Ask on WhatsApp</a><a class="lnk dk" data-ask="{t["id"]}" data-ch="em">Email us</a></div></li>'
            for t in load_tailor()) + '</ul>')
    if '<div class="rv" id="faqList" style="--d:.1s"></div>' in body:
        faq = load_faq()
        body = body.replace('<div class="rv" id="faqList" style="--d:.1s"></div>', '<div class="rv" id="faqList" style="--d:.1s">' + ''.join(
            f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in faq) + '</div>')
        extra_ld += ld({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": strip_tags(q), "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)}} for q, a in faq]}, ' data-faq')
    return body, extra_ld

# ---------- asset versions: change whenever the file changes, so browsers never keep an outdated stylesheet or script ----------
def asset_versions():
    import hashlib
    v = {}
    for k, f in (('vcss', 'css/style.css'), ('vboot', 'js/boot.js'), ('vdata', 'js/data.js'), ('vapp', 'js/app.js')):
        v[k] = hashlib.md5((ROOT / f).read_bytes()).hexdigest()[:8]
    return v
VERSIONS = {}

def preload_tag(spec):
    """'images/x-1200.jpg' -> preload with the same srcset the page uses (so phones fetch the small file only once).
    'href | srcset' -> preload with that explicit srcset."""
    if not spec: return ''
    if '|' in spec:
        href, srcset = [x.strip() for x in spec.split('|', 1)]
        return f'<link rel="preload" as="image" href="{href}" imagesrcset="{srcset}" imagesizes="100vw" fetchpriority="high">\n'
    m = re.match(r'images/(.+)-(\d+)\.jpg$', spec)
    if m and m.group(1) in PH and PH[m.group(1)].get('w'):
        slug = m.group(1); ss = ', '.join(f'images/{slug}-{x}.jpg {x}w' for x in PH[slug]['w'])
        return f'<link rel="preload" as="image" href="{spec}" imagesrcset="{ss}" imagesizes="100vw" fetchpriority="high">\n'
    return f'<link rel="preload" as="image" href="{spec}">\n'   # homepage: the headline, not this image, is the largest element, so no priority boost

def render_page(path):
    meta, body = parse_page(path.read_text(encoding='utf-8'))
    key = meta['nav']; out = meta['out']
    body = re.sub(r'\{\{photo ([^}]*)\}\}', lambda m: photo(*[x.strip() for x in m.group(1).split('|')]), body)
    body = re.sub(r'\{\{>([a-z]+)\}\}', lambda m: partial(m.group(1)), body)
    body, extra_ld = prerender(body, out)
    head = partial('head')
    preload = preload_tag(meta.get('preload', ''))
    jl = (JSONLD_AGENCY if meta.get('jsonld') == 'agency' else '') + (ld(WEBSITE) if out == 'index.html' else '') + breadcrumb_ld(meta, out) + extra_ld
    head = (head.replace('{{title}}', meta['title']).replace('{{description}}', meta['description'])
            .replace('{{canonical}}', url_of(out)).replace('{{base}}', BASE)
            .replace('{{preload}}', preload).replace('{{bodyclass}}', meta.get('body', ''))
            .replace('{{ogimage}}', meta.get('og', 'hero-victoria-falls.jpg'))
            .replace('{{jsonld}}', jl))
    hdr = partial('header').replace('{{nav}}', '@@NAV@@').replace('{{plancur}}', ' aria-current="page"' if key == 'plan' else '')
    # first {{nav}} is desktop, second is mobile
    hdr = hdr.replace('@@NAV@@', nav_html(key, False), 1).replace('@@NAV@@', nav_html(key, True), 1)
    foot = partial('footer').replace('{{itinerary}}', partial('itinerary') if meta.get('itinerary') == 'yes' else '')
    html = head + hdr + body + foot
    for k, v in VERSIONS.items(): html = html.replace('{{' + k + '}}', v)
    if meta.get('depth') == '1':
        html = html.replace('<head>', '<head>\n<base href="../">', 1).replace('href="#', f'href="{out}#')
        html = html.replace('<link rel="icon"', '<meta name="robots" content="index,follow">\n<link rel="icon"', 1)
    if meta.get('redirect'):
        tgt = meta['redirect']
        html = re.sub(r'(rel="canonical" href=")[^"]*(")', lambda m: m.group(1) + url_of(tgt) + m.group(2), html, count=1)
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
    urls = [url_of(o) for o in built if o not in skip]
    try:   # published journal articles (journal/index.json) are listed too
        arts = json.loads((ROOT / 'journal' / 'index.json').read_text(encoding='utf-8'))
        urls += [url_of(a['url']) for a in arts if isinstance(a, dict) and a.get('url')]
    except Exception:
        pass
    sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'  <url><loc>{u}</loc></url>\n' for u in urls) + '</urlset>\n'
    (ROOT / 'sitemap.xml').write_text(sm, encoding='utf-8')
    (ROOT / 'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {BASE}sitemap.xml\n', encoding='utf-8')

def build_article_preview():
    """_templates/article-layout-preview.html: the article template rendered with the current header, footer and styles (noindex, not listed in the sitemap)."""
    import tempfile
    t = ROOT / '_templates' / 'article.html'
    if not t.exists(): return None
    txt = t.read_text(encoding='utf-8').replace('out: journal/REPLACE-WITH-ARTICLE-SLUG.html', 'out: _templates/article-layout-preview.html')
    with tempfile.TemporaryDirectory() as d:
        tmp = Path(d) / 'preview.html'; tmp.write_text(txt, encoding='utf-8')
        out = render_page(tmp)
    dest = ROOT / out
    dest.write_text(dest.read_text(encoding='utf-8').replace('<meta name="robots" content="index,follow">', '<meta name="robots" content="noindex,nofollow">'), encoding='utf-8')
    return out

if __name__ == '__main__':
    pages = sorted((SRC / 'pages').glob('*.html'))
    refresh_data_js()               # first, so the data.js version below matches the file that is published
    VERSIONS.update(asset_versions())
    built = [render_page(p) for p in pages]
    build_article_preview()
    write_site_files(built)
    print('Built:', ', '.join(built))
