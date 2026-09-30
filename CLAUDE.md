# Project Overview

This is mahdi portfolio website.He is fullstack and frontend developer.he need this to introduce himself.

## Commands

This machine's global `pnpm`/`corepack` shims are broken (Node 26 no longer ships corepack). Run pnpm through npx, matching the `packageManager` pin in package.json:

```
npx --yes pnpm@11.3.0 install    # add --fetch-retries=6 --fetch-timeout=600000 --network-concurrency=3 (registry is slow here)
npx --yes pnpm@11.3.0 dev        # localhost:3000
npx --yes pnpm@11.3.0 build
npx --yes pnpm@11.3.0 lint
npx --yes pnpm@11.3.0 exec tsc --noEmit
```

There is no test framework and no CI. Verification = `tsc --noEmit` + `build`.

`pnpm run lint` currently fails on ~29 `no-explicit-any` errors in `LiquidEther.tsx`. They predate the dependency update in `b2dc3fc` — not a sign that something you changed is broken.

`pnpm-workspace.yaml` exists only to allow `sharp`/`unrs-resolver` postinstall builds and to exempt the pinned `next@16.3.7` release from pnpm's minimum-release-age rule. It is not a real multi-package workspace.

## Big picture

Persian, right-to-left single-page portfolio. Next.js 16 App Router + React 19 + Tailwind v4 (CSS-first — `src/app/globals.css` has `@import "tailwindcss"`, there is no `tailwind.config.js`) + GSAP + two Three.js WebGL backgrounds.

**There is exactly one route: `/`.** `src/app/` contains only `layout.tsx`, `page.tsx`, `globals.css`. `layout.tsx` sets `lang="fa" dir="rtl"` and the Vazir local font (`src/utils/fonts.js`). All copy is Persian, and the code comments are Persian too — match that when editing.

### The home page is a scroll-pinned crossfade, not separate pages

`page.tsx` pins `<main>` with ScrollTrigger (`end: "+=150%"`, `scrub: 1`) and holds two full-screen `absolute inset-0` layers: `Intro` (z-0) and `AboutMe` (z-10). Scrolling scales/blurs Intro out while AboutMe slides up from `yPercent: 100`. Scroll progress also drives `activeSection` state, which `page.tsx` passes down as `isActive` props.

Three files are coupled and must be edited together:

- `page.tsx` — the `+=150%` scroll length and the `progress > 0.4` threshold that flips intro/about.
- `NavMenu.tsx` — `handleLinkClick` turns `/` and `/about-me` clicks into `window.scrollTo`, and hardcodes `window.innerHeight * 1.5` to match that `+=150%`.
- The `isActive` prop threaded into each section, which is what actually pauses the expensive WebGL canvases.

Nav hrefs `/skills`, `/projects` and `/contact-me` have **no pages** — they 404 today. Buttons in `Intro`/`AboutMe` already link to them.

### WebGL backgrounds

`src/components/LiquidEther.tsx` (Three.js fluid simulation, ~1240 lines) and `src/components/PixelBlast.tsx` (Three.js + `postprocessing` pixel effect, ~700 lines) are vendored React Bits components, not app code — each with a sibling `.css`. `components.json` registers the `@react-bits` registry (`https://reactbits.dev/r/{name}.json`) and configures shadcn/ui, but no `src/components/ui/` exists yet.

Both are pulled in with `next/dynamic` + `ssr: false` and a `#060010` loading div. They are extremely expensive, so the sections keep them alive but neutralised when off-screen: `display: none` on the wrapper, plus zeroed interaction props (`mouseForce={isActive ? 15 : 0}`, `autoDemo={isActive}`, `speed={isActive ? 0.5 : 0}`, `enableRipples={isActive}`). Follow this pattern for any new section with a canvas background; don't unmount and remount them.

### GSAP

Import GSAP from `@/lib/gsap`, not from `gsap` directly — the wrapper is what registers the `Observer` plugin (browser-only guarded) and re-exports everything. `ScrollTrigger` is registered separately, ad hoc, in the files that use it. The house style is `useGSAP(() => {...}, { scope: containerRef })` from `@gsap/react`, with ref-per-element timelines; `@gsap/react`'s auto-cleanup is what keeps the WebGL/DOM animations from leaking.

### Component layout

`src/components/sections/` holds full-screen page sections, `src/components/layout/` holds `NavMenu`, `src/components/module/` holds reusable components like buttons,inputs,icons and etc.

The recurring visual language is glassmorphism on `#060010`: `bg-white/5`, `backdrop-blur`, inset white `box-shadow`s, `#A855F7` purple for active/hover state. `cn()` (twMerge + clsx) exists in `src/lib/utils.ts` but most components hand-roll a local class joiner.

Path aliases `@/module/*`, `@/layout/*`, `@/utils/*`, `@/lib/*`, `@/sections*` are configured in `tsconfig.json`; existing components mostly use relative imports anyway.

`lucide-react`, `class-variance-authority` and `react-intersection-observer` are installed but unused in `src/`.
