# NeoRagnar // Build Signal

A single-page, dark **cyber-forge** portfolio for `neoragnar.com` — the pseudonymous
build signal of **NeoRagnar** (GitHub [@NeoRagnar777](https://github.com/NeoRagnar777)).

No face. No résumé. Just output — apps, websites, SaaS, browser extensions, dev tools
and automations, all signed `777`. The identity stays private by design; the work
speaks.

![stack](https://img.shields.io/badge/React-19-4cc9f0?style=flat-square)
![stack](https://img.shields.io/badge/Vite-8-4361ee?style=flat-square)
![stack](https://img.shields.io/badge/Tailwind-v4-7b61ff?style=flat-square)
![stack](https://img.shields.io/badge/TypeScript-6-5eead4?style=flat-square)

---

## ✦ Features

- **Boot sequence** — a terminal-style loader that decrypts the operator identity to `[WITHHELD]`.
- **Animated background** — a performant `<canvas>` digital-rain matrix + cyber grid, capped FPS, `prefers-reduced-motion` aware.
- **Glitch hero** — RGB-split wordmark, rotating "I build {everything}" subject, live build-signal status.
- **WHOIS dossier** — a redacted classified-file block that says everything except who.
- **The Forge** — a bento grid of the six disciplines, each with its own accent.
- **Live builds** — repo cards streamed straight from the GitHub REST API (with a baked-in fallback snapshot for offline / rate-limited loads).
- **Interactive terminal** — a real in-browser shell. Type `help`, `whoami`, `skills`, `builds`, `social`, `777`, `sudo`, `cat .secret`, …
- **Contact** — marquee, CTA, availability status, social links.

Fully responsive, keyboard-friendly, and built with no runtime backend — it deploys as
static files anywhere.

## ✦ Tech

| | |
|---|---|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Motion | Framer Motion 12 + CSS keyframes |
| Icons | lucide-react (brand glyphs inline) |

## ✦ Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

## ✦ Build & deploy locally

```bash
npm run build      # type-checks then bundles to dist/
npm run preview    # serves the production build on http://localhost:4173
```

`dist/` is a fully static bundle — drop it behind nginx/Caddy, or onto any static
host (Vercel, Netlify, GitHub Pages, Cloudflare Pages) with zero config.

## ✦ Project structure

```
src/
  lib/
    content.ts          # all copy + brand constants (edit me to retune the voice)
    types.ts            # shared types
    useGithubRepos.ts   # live GitHub fetch + fallback
  components/
    ui/                 # GlitchText, SignalButton, SectionHeading, Reveal, BrandIcon, cn
    fx/BackgroundFX.tsx # canvas matrix rain + grid
    BootLoader.tsx
    Navbar.tsx
    sections/           # Hero, Manifesto, Arsenal, Builds, Stats, Terminal, ContactFooter
  App.tsx               # composition + boot flow
  index.css             # Tailwind v4 theme tokens, keyframes, utilities
```

## ✦ Make it yours

Everything you'd want to change lives in [`src/lib/content.ts`](src/lib/content.ts):
the handle, GitHub user, contact email/socials, hero copy, the WHOIS dossier lines,
the disciplines and stats. The palette and motion live in
[`src/index.css`](src/index.css) under `@theme`.

> Contact email is `hello@neoragnar.com`; all socials point to `@NeoRagnar777`.

## ✦ Production

Live at **[neoragnar.com](https://neoragnar.com)** — static `dist/` served by nginx
(HTTP→HTTPS, Let's Encrypt TLS, gzip, immutable asset caching, SPA fallback).

---

Built by NeoRagnar. Signed `777`.
