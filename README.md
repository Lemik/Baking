# NANA Bakery

Single-page static site for **NANA Bakery** — home-baked lemon loaf and poppy seed roll with door delivery or pick up in Nanaimo, BC.

Live site: [baking.dushyn.com](https://baking.dushyn.com)

Languages: [English](/en/) · [Français](/fr/) · [Українська](/uk/) · [Русский](/ru/)

## Stack

- [Astro](https://astro.build) static site (HTML/CSS, minimal JS)
- JSON content files per locale under `src/data/`
- GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:4321/en/` (root redirects to English).

## Build

```bash
npm run build
npm run preview
```

## Updating content

Edit JSON in `src/data/{locale}/`:

| File | Contents |
|------|----------|
| `ui.json` | Navigation, buttons, section headings |
| `site.json` | Hero, about, SEO title & description |
| `products.json` | Product names, taglines, included items, allergens, order subjects |
| `recipes.json` | Ingredients and origin badges |

Product images: replace files in `public/images/products/` (keep filenames).  
Origin icons: replace SVGs in `public/images/origins/`.

Regenerate placeholder product WebP files:

```bash
python3 scripts/generate-placeholders.py
```

Requires [Pillow](https://pypi.org/project/pillow/): `pip install Pillow`

## Deployment (GitHub Pages + custom domain)

1. Create a new GitHub repository and push this project to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys `dist/`.
4. **Custom domain**: this repo includes `public/CNAME` with `baking.dushyn.com`. In Pages settings, enter the same custom domain and wait for DNS check.
5. **GoDaddy DNS** (same pattern as [day.dushyn.com](https://day.dushyn.com)):
   - Add a **CNAME** record: host `baking` → value `<your-github-username>.github.io`
   - Remove conflicting A records for the `baking` host if present.

Orders go to **baking@dushyn.com** via `mailto:` links (set up the mailbox separately).

## Project structure

```
src/
  components/     UI sections
  data/en|fr|uk|ru/   Localized copy
  layouts/        Base HTML shell + SEO
  pages/[lang]/   One page per locale
  styles/         Global CSS
public/
  images/         Product photos & origin icons
  CNAME           baking.dushyn.com
```
