# Kuralogiq

Awwwards-level animated website. **React + Vite + Tailwind v4 + GSAP/ScrollTrigger + Lenis**, built mobile-first and performance-budgeted.

> 📖 Read [`CLAUDE.md`](./CLAUDE.md) for the full engineering rulebook (motion, performance, responsive, deploy conventions).

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

## Tech

- **React 19** + **Vite 6**
- **Tailwind CSS v4** (CSS-first `@theme` tokens in `src/index.css`)
- **React Router v7** — multi-page, per-route lazy loading
- **GSAP 3 + ScrollTrigger + @gsap/react**
- **Lenis** smooth scroll (driven by GSAP ticker)
- **Three.js** — added per-section, on demand (not yet installed)

## Structure

See [`CLAUDE.md` §3](./CLAUDE.md) for the full folder map and conventions. The `@/` alias maps to `src/`.

## Deploy

Static SPA → `dist/`. Preconfigured for Vercel (`vercel.json`), Netlify (`netlify.toml`), and Cloudflare/static hosts (`public/_redirects`). Build command `npm run build`, publish dir `dist`.
