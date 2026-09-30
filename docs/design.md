# DESIGN.md — Portfolio Design System

> Source of truth for all UI work in this repo. Claude Code: read this before creating or editing any component. Do not invent values outside these tokens. If a needed token is missing, add it here first, then use it.

Values marked `(est.)` were estimated from a low-res mockup. Verify against Figma and update.

---

## 1. Product Context

- **Type:** Personal developer portfolio, single page with 6 sections/screens: `intro`, `home`, `about`, `skills`, `projects`, `contact`.
- **Language / direction:** Persian (fa), **RTL by default**. Latin tech names (React, Next.js, GitHub) stay LTR inline.
- **Mood:** Dark, deep violet, glowing, minimal, technical. "Clean, secure, fast, practical."
- **Signature elements:** blurred violet glow blob, pixel-dot grid corners, pill navbar with border, bento cards.

## 2. Principles

1. **Dark-first.** There is no light theme in v1. Do not add one unless asked.
2. **One accent.** Violet is the only brand hue. Never add a second accent color.
3. **Glow is a rare resource.** At most one glow per viewport. Glow marks focus, not decoration.
4. **RTL is the default, not a patch.** Use logical CSS properties only.
5. **Surface hierarchy over shadows.** Depth comes from background lightness + 1px border, not drop shadows.
6. **Content over chrome.** Text on `bg-base` or `surface-1` only, never on a glow directly.

## 3. Color Tokens

### 3.1 Core

| Token | Hex | Use |
|---|---|---|
| `--color-bg-base` | `#07040F` (est.) | Page background |
| `--color-bg-raised` | `#0E0A18` (est.) | Sections, navbar fill |
| `--color-surface-1` | `#15121D` (est.) | Cards |
| `--color-surface-2` | `#1D1928` (est.) | Nested elements inside cards, icon tiles |
| `--color-border-subtle` | `#2A2538` (est.) | Card borders |
| `--color-border-strong` | `#4B4560` (est.) | Nav pill, project card border, hover |
| `--color-border-focus` | `#A78BFA` | Focus ring |

### 3.2 Text

| Token | Hex | Use | Min contrast on bg-base |
|---|---|---|---|
| `--color-text-primary` | `#FFFFFF` | Headings | 19:1 |
| `--color-text-secondary` | `#C9C4D6` | Body | ≥ 10:1 |
| `--color-text-muted` | `#8E88A3` | Captions, meta | ≥ 5:1 (do not go darker) |
| `--color-text-accent` | `#B794F6` | Active nav, links | ≥ 7:1 |

### 3.3 Accent (violet)

| Token | Hex | Use |
|---|---|---|
| `--color-accent-300` | `#C4B5FD` | Hover text, highlights |
| `--color-accent-400` | `#A78BFA` | Focus ring, icons |
| `--color-accent-500` | `#8B5CF6` | Glow, chart line |
| `--color-accent-600` | `#7C3AED` | **Primary button fill** |
| `--color-accent-700` | `#6D28D9` | Primary button hover/pressed |
| `--color-accent-900` | `#2E1065` | Glow tails, pixel-grid dim cells |

### 3.4 Contribution heatmap (5 steps)

`#1D1928` → `#3B1F7A` → `#5B2BBE` → `#7C3AED` → `#A78BFA`

### 3.5 Semantic (only if needed, e.g. form states)

`--color-success #34D399`, `--color-warning #FBBF24`, `--color-danger #F87171`. Not present in the mockup, so do not use them decoratively.

### 3.6 Rules

- Text on `accent-600` fill is `#FFFFFF` only.
- Never use pure `#000` as a background.
- Never put `text-muted` on `surface-2` for essential content (contrast fails).

## 4. Typography

**Persian font:** `Vazirmatn` (variable, self-hosted). `[conjectural]` that the mockup uses a similar face, so confirm in Figma.
**Latin/code font:** `Inter` for Latin fallback, `JetBrains Mono` for code/labels.

```css
--font-sans: "Vazirmatn", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;
```

### Scale (fluid)

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| `display` | `clamp(2rem, 1.2rem + 3.5vw, 3.5rem)` | 800 | 1.25 | Hero title |
| `h1` | `clamp(1.75rem, 1.2rem + 2vw, 2.5rem)` | 700 | 1.3 | Section titles |
| `h2` | `1.5rem` | 700 | 1.4 | Card titles |
| `h3` | `1.125rem` | 600 | 1.5 | Sub-titles |
| `body-lg` | `1.125rem` | 400 | 1.9 | Hero paragraph |
| `body` | `1rem` | 400 | 1.85 | Default |
| `small` | `0.875rem` | 400 | 1.7 | Meta, captions |
| `label` | `0.8125rem` | 500 | 1.4 | Nav, buttons, tags |

Rules:
- Persian needs **taller line-height (1.8+)** than Latin. Do not reuse Latin 1.5.
- No letter-spacing on Persian text (breaks joining). Letter-spacing is allowed only on Latin/mono labels.
- Max line length: `65ch` for paragraphs.
- Use Persian digits (۱۲۳) in prose. Use Latin digits in code, stats, and dates in tech contexts. Pick one per element and be consistent.

## 5. Spacing, Radius, Elevation

**4px base grid.**

`--space-1:4px  2:8px  3:12px  4:16px  5:24px  6:32px  7:48px  8:64px  9:96px  10:128px`

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 8px | Tags, small buttons |
| `--radius-md` | 12px | Inputs, icon tiles |
| `--radius-lg` | 16px | Cards |
| `--radius-xl` | 24px | Large feature cards, project cards |
| `--radius-full` | 9999px | Nav pill, avatar, primary buttons |

Elevation (no heavy shadows):
- `--elev-0`: none
- `--elev-1`: `0 0 0 1px var(--color-border-subtle)`
- `--elev-glow`: `0 0 40px -8px rgb(139 92 246 / 0.55)` (focus/hover on primary only)

Layout: max content width `1120px`, page gutter `24px` mobile / `48px` desktop, section vertical padding `96px` desktop / `64px` mobile.

## 6. Breakpoints

`sm 640` · `md 768` · `lg 1024` · `xl 1280`. Design mobile-first. The mockup is desktop only, so **mobile layouts are unspecified** and must follow the collapse rules in §8.

## 7. Components

### 7.1 Navbar (pill)
- Centered, sticky top `16px`. `radius-full`, `1px border-strong`, fill `bg-raised` at 70% + `backdrop-blur(12px)`.
- Items: `label` type, `text-secondary`; **active** = `text-accent` + soft violet pill background `accent-900 / 40%`.
- Order (RTL, right→left): درباره من · مهارت‌های من · پروژه‌ها · ارتباط با من.
- Mobile: collapse to icon button + full-screen sheet. Min touch target 44×44.

### 7.2 Buttons
| Variant | Style |
|---|---|
| Primary | fill `accent-600`, text white, `radius-full`, height 44, px 24; hover `accent-700` + `elev-glow`; active scale .98 |
| Secondary (ghost) | transparent, `1px border-strong`, text `text-secondary`; hover border `accent-400` |
| Icon | 44×44, `radius-md`, fill `surface-2`, `1px border-subtle`; hover border `accent-400` |

All: visible focus ring `2px accent-400` with `2px` offset. Disabled: 40% opacity, no glow.

### 7.3 Card
- Fill `surface-1`, `1px border-subtle`, `radius-lg`, padding `24px`.
- Hover (interactive cards only): border → `border-strong`, translateY(-2px).
- Nested tile: `surface-2`, `radius-md`.

### 7.4 Hero
- Centered stack: `display` title, `body-lg` paragraph (max 52ch), two buttons (primary + secondary).
- Background: single violet glow blob (see §9), pixel-grid optional.

### 7.5 About card
- Two columns (RTL: image on the right, text on the left). Card as in 7.3 with photo `radius-lg`, grayscale-to-color not required.
- Collapses to single column, image on top.

### 7.6 Skills bento grid
- 12-col grid, gap `16px`. Tiles use Card. Contains: skill highlight tiles (icon + title), tech-icon strip, profile mini-card, services list, animated curve chart, GitHub contributions heatmap.
- Tech icons: monochrome or official color at 32px inside `surface-2` tiles.
- Heatmap: cells `12px`, gap `3px`, `radius 3px`, colors from §3.4.

### 7.7 Project card
- `radius-xl`, `1px border-strong` (brighter than normal cards), 16:10 thumbnail, title + tags below.
- Hover: border → `accent-400`, thumbnail scale 1.03 (clip overflow).
- Grid: 3 cols desktop, 2 tablet, 1 mobile.

### 7.8 Social link tile
- 56×56, `radius-md`, `surface-2`, icon 24px. Platforms: Instagram, X, Telegram, LinkedIn, GitHub. Each needs an `aria-label` in Persian.

### 7.9 Section heading
- `h1` + optional `small` muted subtitle, centered, `space-7` below.

## 8. Layout & RTL Rules

- Set `<html lang="fa" dir="rtl">`.
- **Use logical properties only:** `margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start`. Forbidden: `margin-left/right`, `left/right`, `text-align: left/right`.
- Tailwind: use `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`. Forbidden: `ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`.
- Directional icons (arrows, chevrons) must flip in RTL (`rtl:-scale-x-100`). Non-directional icons (logos, search) do not flip.
- Wrap Latin/brand terms in `<bdi>` or `<span dir="ltr">` when mixed in Persian sentences.
- Collapse order on mobile: hero → about (image first) → skills (1 col) → projects (1 col) → contact.

## 9. Background Effects

**Glow blob**
- Element: absolutely positioned, ~`420×420px`, `border-radius: 50%`, `filter: blur(80px)`.
- Fill: radial gradient `accent-500 → accent-900 → transparent`, opacity `0.55`.
- Optional magenta tint `#C026D3 @ 0.25` on one edge. Keep it subtle.
- `pointer-events: none`, `z-index: 0`, `aria-hidden`.

**Pixel-dot grid**
- Corner decoration only (never full page). Cells `8px`, gap `4px`, color `accent-900` with random opacity 0.15–0.6, masked with a radial fade toward the center.
- Implement with CSS mask or a single inline SVG/canvas. Do not render thousands of DOM nodes.

## 10. Motion

| Token | Value |
|---|---|
| `--dur-fast` | 120ms |
| `--dur-base` | 220ms |
| `--dur-slow` | 500ms |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |

- Animate only `transform` and `opacity`. No layout-property animations.
- Section reveal: fade + 16px translateY, `dur-slow`, stagger 60ms.
- Glow blob: slow drift, 12–20s loop, low amplitude.
- **`prefers-reduced-motion: reduce` → disable drift, stagger, and parallax. This is mandatory.**
- Intro screen: play once per session, skippable, max 2.5s.

## 11. Accessibility (non-negotiable)

- WCAG 2.2 AA minimum. Body text contrast ≥ 4.5:1, large text/UI ≥ 3:1.
- Visible `:focus-visible` on every interactive element.
- Semantic landmarks: `header/nav/main/section/footer`; one `h1` per page.
- Every image has Persian `alt`; decorative effects are `aria-hidden`.
- Touch targets ≥ 44×44.
- Do not convey state by color alone (active nav also gets a background/underline).

## 12. Code Tokens

### 12.1 CSS variables (`src/styles/tokens.css`)

```css
:root {
  --color-bg-base: #07040f;
  --color-bg-raised: #0e0a18;
  --color-surface-1: #15121d;
  --color-surface-2: #1d1928;
  --color-border-subtle: #2a2538;
  --color-border-strong: #4b4560;

  --color-text-primary: #ffffff;
  --color-text-secondary: #c9c4d6;
  --color-text-muted: #8e88a3;
  --color-text-accent: #b794f6;

  --color-accent-300: #c4b5fd;
  --color-accent-400: #a78bfa;
  --color-accent-500: #8b5cf6;
  --color-accent-600: #7c3aed;
  --color-accent-700: #6d28d9;
  --color-accent-900: #2e1065;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --font-sans: "Vazirmatn", "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --dur-fast: 120ms;
  --dur-base: 220ms;
  --dur-slow: 500ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 12.2 Tailwind mapping (v3 `tailwind.config.ts`; for v4 use `@theme` with the same names)

```ts
export default {
  theme: {
    extend: {
      colors: {
        bg: { base: "var(--color-bg-base)", raised: "var(--color-bg-raised)" },
        surface: { 1: "var(--color-surface-1)", 2: "var(--color-surface-2)" },
        border: { subtle: "var(--color-border-subtle)", strong: "var(--color-border-strong)" },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          accent: "var(--color-text-accent)",
        },
        accent: {
          300: "var(--color-accent-300)", 400: "var(--color-accent-400)",
          500: "var(--color-accent-500)", 600: "var(--color-accent-600)",
          700: "var(--color-accent-700)", 900: "var(--color-accent-900)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)", md: "var(--radius-md)",
        lg: "var(--radius-lg)", xl: "var(--radius-xl)",
      },
      fontFamily: { sans: "var(--font-sans)", mono: "var(--font-mono)" },
      boxShadow: { glow: "0 0 40px -8px rgb(139 92 246 / 0.55)" },
    },
  },
};
```

## 13. Rules for Claude Code

**Do**
- Use only tokens from §12. Reference by name (`bg-surface-1`), never raw hex.
- Build components in `src/components/ui/` with typed props; one component per file.
- Use logical properties / Tailwind logical utilities (§8).
- Add `aria-label` in Persian for icon-only controls.
- Keep all user-facing copy in `src/content/fa.ts` (or i18n file), not inline in JSX.
- Test each component at 360px, 768px, 1280px in RTL.

**Don't**
- Don't hardcode colors, radii, or font sizes.
- Don't add new hues, gradients other than §9, or heavy shadows.
- Don't use `left/right` properties, or `ml/mr/pl/pr` utilities.
- Don't add a light theme, UI libraries with their own theme (MUI, Chakra), or new fonts without updating this file.
- Don't animate layout properties or ignore `prefers-reduced-motion`.
- Don't render the pixel grid as many DOM nodes.

**Definition of done for any UI change**
1. Uses only tokens in this file.
2. Renders correctly in RTL at three breakpoints.
3. Keyboard navigable with visible focus.
4. Contrast checked for any new text/background pair.
5. If a new token or component was needed, this file was updated in the same commit.

## 14. Open Questions (resolve in Figma, then delete this section)

- Exact hex values for backgrounds, borders, and accent (all `(est.)`).
- Actual typeface used in the mockup.
- Mobile layouts for every screen.
- Hover/pressed states, since the mockup shows none.
- Whether the `intro` screen is a splash or the real hero.
- Persian vs Latin digits policy.