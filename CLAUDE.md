# CLAUDE.md — Project Rulebook

This file governs how code is written in this project. **Read it before making any change.** It encodes the non-negotiables: awwwards-level motion, zero performance regressions, responsive-first, and clean deployable structure.

---

## 1. Project at a glance

- **Goal:** An awwwards-level animated marketing/portfolio site that is *fast* and *fully responsive*.
- **Stack:** React 19 + Vite 6 + Tailwind CSS v4 (CSS-first `@theme`).
- **Routing:** React Router v7 (multi-page), per-route lazy loading.
- **Motion:** GSAP 3 + ScrollTrigger + `@gsap/react` (`useGSAP`), Lenis smooth scroll.
- **3D:** Three.js — **not installed yet.** Add it (`three` + `@react-three/fiber` + `@react-three/drei`) only when a specific section needs it, and always lazy-load it (§6).
- **Deploy:** Static SPA. Configs included for Vercel, Netlify, Cloudflare Pages, and generic static hosts.

---

## 2. Golden rules (read these first)

1. **Performance is a feature, not an afterthought.** Every animation must hold 60fps on a mid-range phone. If it can't, simplify it.
2. **Responsive from the first line.** Build mobile-first. Never ship a section that only works on desktop.
3. **Animate only `transform` and `opacity`.** These are GPU-composited. Never animate `width`, `height`, `top`, `left`, `margin`, `box-shadow`, or `filter` in loops/scroll.
4. **Respect `prefers-reduced-motion` everywhere.** Use the `useReducedMotion` hook; bail out of or shorten animations.
5. **Always clean up.** Use `useGSAP` (auto-reverts on unmount). Never leave dangling ScrollTriggers, event listeners, or rAF loops.
6. **Match the existing code.** Same naming, structure, comment density, and import style as the files around you.
7. **The Figma is the source of truth** for spacing, color, type, and layout — pull exact values, don't eyeball.

---

## 3. Folder structure

```
src/
├── main.jsx                  # entry: Router + global CSS + GSAP registration
├── App.jsx                   # route rendering + transitions + smooth scroll
├── index.css                 # Tailwind + design tokens (@theme) + base layer
├── router/
│   └── routes.jsx            # lazy route table (single source of routes)
├── pages/                    # one folder per route (PageName/PageName.jsx)
├── components/
│   ├── layout/               # Header, Footer, Layout (persistent shell)
│   ├── transitions/          # PageTransition, ScrollToTop
│   └── ui/                   # reusable presentational components
├── animations/
│   └── gsap.js               # registers plugins ONCE; export gsap/ScrollTrigger/useGSAP
├── providers/
│   └── SmoothScrollProvider.jsx  # Lenis ⇄ GSAP ticker ⇄ ScrollTrigger
├── hooks/                    # useReducedMotion, useMediaQuery, ...
├── lib/                      # framework-agnostic helpers (cn, etc.)
├── constants/                # site config, nav, static data
└── assets/                   # local images/fonts/svg (imported, hashed by Vite)
```

**Conventions**
- Import with the `@/` alias (maps to `src/`). No `../../../`.
- One component per file; component name === file name (PascalCase).
- Pages are lazy-loaded in `router/routes.jsx` only.
- Co-locate a section's sub-components inside its page folder if not reused.

---

## 4. Animation rules (GSAP / ScrollTrigger / Lenis)

- **Register plugins only in `src/animations/gsap.js`.** Import gsap/ScrollTrigger/useGSAP from there, never re-register elsewhere.
- **Always use `useGSAP`** with a `scope` ref. It auto-cleans on unmount:
  ```jsx
  const root = useRef(null)
  useGSAP(() => {
    gsap.from('[data-reveal]', { opacity: 0, y: 60, scrollTrigger: { trigger: '...', start: 'top 85%' } })
  }, { scope: root, dependencies: [reduceMotion] })
  ```
- **Scope selectors** to the component (`'[data-reveal]'` resolves within `scope`). Avoid global selectors that leak across pages.
- **Smooth scroll is global** via `SmoothScrollProvider`. Lenis is driven by `gsap.ticker` (one rAF loop). Don't start a second rAF loop for Lenis.
- **On route change**, `ScrollToTop` jumps Lenis to top and calls `ScrollTrigger.refresh()`. After dynamically loading content/images that change layout, call `ScrollTrigger.refresh()` yourself.
- **Pinning:** prefer `pin: true` with `anticipatePin: 1`. Test on mobile — pinning is the most common source of jank.
- **Stagger and batch** reveals with `gsap.utils.toArray(...)`; don't create one ScrollTrigger per tiny element if a batch works.
- **Reduced motion:** every animation block checks `useReducedMotion()` and either sets the final state instantly or skips.
- **Page transitions:** current setup is enter-only (`PageTransition`, keyed by pathname). For curtain/overlay exit→enter, animate an overlay element on mount inside `PageTransition` (don't add a heavy animation library for this).

---

## 5. Responsive rules

- **Mobile-first.** Base styles target small screens; layer up with `md:`, `lg:`, `xl:`.
- **Fluid type & spacing** via `clamp()` tokens (see `--text-fluid-*` in `index.css`) so most things scale without breakpoints.
- **Use `dvh`/`svh`** instead of `vh` for full-height sections (mobile browser chrome). `min-h-screen` is fine for the shell; prefer `100svh` for hero sections.
- **Different motion per breakpoint:** use `useMediaQuery` or GSAP `matchMedia()` — disable expensive parallax/3D on small screens.
- **Touch:** Lenis `syncTouch` is off (native momentum). Ensure tap targets ≥ 44px. No hover-only interactions without a touch fallback.
- **Test breakpoints:** 360 (small phone), 768 (tablet), 1024, 1440, 1920. Never horizontal-scroll (`overflow-x: hidden` on body is a safety net, not a fix).

---

## 6. Performance budget & rules

**Budget (enforce these):**
- Initial JS (gzipped, route `/`): **< 200 KB**.
- Largest Contentful Paint: **< 2.5s** on 4G/mid-range mobile.
- Maintain **60fps** during scroll/animation; no long tasks > 50ms during interaction.
- Lighthouse Performance: **≥ 90** mobile.

**Rules:**
- **Lazy-load heavy stuff.** Three.js / R3F canvases, large below-the-fold sections, and modals → `React.lazy` + `Suspense`, or dynamic `import()`. Never in the initial chunk.
- **Code-split per route** (already set up via lazy routes). Big libs are manually chunked in `vite.config.js`.
- **Images:** serve modern formats (WebP/AVIF), `loading="lazy"` + `decoding="async"` for below-fold, explicit `width`/`height` to avoid CLS. Use responsive `srcset`/`sizes`. Put static images in `src/assets/` (hashed) or `public/` (stable URL).
- **Fonts:** self-host with `font-display: swap`, preload the primary weight, subset if possible. Avoid layout shift.
- **Three.js specifics (when added):** cap `dpr` to `[1, 2]`, pause the render loop when offscreen/`document.hidden`, `dispose()` geometries/materials/textures on unmount, prefer instancing, compress textures (KTX2/basis), keep draw calls low.
- **Avoid layout thrashing:** never read layout (`offsetWidth`, `getBoundingClientRect`) inside scroll/rAF without batching. Let ScrollTrigger handle measurements.
- **No console logs** in committed code. No unused deps. Run `npm run build` and check chunk sizes before declaring done.

---

## 7. Styling rules (Tailwind v4)

- **Design tokens live in `@theme`** in `src/index.css`. Map Figma variables there → they become utilities automatically (`text-ink`, `bg-paper`, `font-display`).
- **Prefer utilities** in JSX. Extract to a component when markup repeats, not into `@apply` soup.
- **Use `cn()`** (`@/lib/utils`) to compose conditional classes.
- Keep arbitrary values rare; if a value recurs, make it a token.

---

## 8. Working with the Figma design

When the Figma MCP is connected and a frame/link is provided:
1. **Extract tokens first** — colors, type scale, spacing, radii → add to `@theme` in `index.css`. Then build sections against tokens.
2. **Pull exact values** (px, weights, line-heights, gaps). Convert to rem/fluid where it aids responsiveness; keep intent.
3. **Download/export assets** (images, SVGs, icons) into `src/assets/`. Optimize SVGs; convert raster to WebP/AVIF.
4. **Match the layout structure** to the design's sections; one section component per Figma section where sensible.
5. **Identify motion + 3D spots.** Flag where Three.js is warranted before adding it; confirm with the user, then lazy-load it.
6. **Build responsive from the desktop *and* mobile frames** if both exist; if only one, derive the other mobile-first and confirm.

---

## 9. Definition of done (check before saying "done")

- [ ] Works at 360 / 768 / 1024 / 1440 widths, no horizontal scroll.
- [ ] `prefers-reduced-motion` respected.
- [ ] Animations hold 60fps; only transform/opacity animated.
- [ ] No console errors/warnings; `npm run lint` clean.
- [ ] `npm run build` succeeds; initial chunk within budget.
- [ ] Heavy/3D code is lazy-loaded.
- [ ] No dangling listeners/triggers (used `useGSAP` scope).
- [ ] Matches Figma values (when applicable).

---

## 10. Commands

```bash
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint      # eslint
npm run format    # prettier
```

## 11. Deployment

Static SPA — output is `dist/`. SPA fallback (rewrite all routes to `index.html`) is preconfigured:
- **Vercel:** `vercel.json`
- **Netlify:** `netlify.toml` + `public/_redirects`
- **Cloudflare Pages / static hosts:** `public/_redirects` (and the SPA rewrite in host settings)
- Any host: build command `npm run build`, publish directory `dist`.
