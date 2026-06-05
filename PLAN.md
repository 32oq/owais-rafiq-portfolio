# Owais Rafiq — Personal Portfolio v2
## Architecture Plan & Design Strategy

> Migrating from a static HTML/Bootstrap single-page site to a premium, production-grade Next.js 14 application.

---

## 1. Executive Summary

The existing portfolio is a single `index.html` file using Bootstrap 5, jQuery-free vanilla JS, and a pink-to-blue gradient. The new version will:

- Feel like a **premium SaaS product** (Linear/Vercel/Stripe quality)
- Be **fully data-driven** — all content lives in `/data/*.json`
- Ship with a **complete design system** including dark/light mode
- Score **95+ on Lighthouse** via SSG, image optimization, and critical CSS
- Support **future CMS migration** through clean TypeScript interfaces
- Be **WCAG AA compliant** with accessible keyboard navigation

---

## 2. Technology Stack

| Layer         | Technology                      | Justification                                     |
|---------------|---------------------------------|---------------------------------------------------|
| Framework     | Next.js 14 (App Router)         | SSG + RSC for max performance, best DX            |
| Language      | TypeScript 5.x                  | Type safety for data models and components        |
| Styling       | Tailwind CSS 3.x                | Utility-first, zero runtime CSS-in-JS             |
| Animation     | Framer Motion 11.x              | Production-grade declarative animations            |
| Icons         | Lucide React                    | Consistent, tree-shakeable icon system             |
| Theming       | next-themes                     | SSR-safe dark/light mode with no flash            |
| Fonts         | Inter + JetBrains Mono (Google) | Premium reading experience, monospace for code    |
| SEO           | Next.js Metadata API            | Structured data, OG, Twitter Cards                |
| Validation    | Zod                             | Runtime schema validation for all JSON data       |

---

## 3. Folder Architecture

```
/home/justdial/owais-portfolio/
├── public/
│   ├── images/          # Optimized profile, project images
│   ├── fonts/           # Self-hosted fonts (fallback)
│   ├── og/              # Open Graph images
│   ├── resume/          # Downloadable PDF
│   ├── robots.txt
│   └── site.webmanifest
│
└── src/
    ├── app/                          # Next.js App Router
    │   ├── layout.tsx                # Root layout (fonts, providers, metadata)
    │   ├── page.tsx                  # Home page (all sections)
    │   ├── globals.css               # Global styles + CSS variables
    │   ├── not-found.tsx             # Custom 404
    │   ├── loading.tsx               # Root loading UI
    │   ├── sitemap.ts                # Dynamic sitemap generator
    │   ├── robots.ts                 # Robots.txt generator
    │   ├── manifest.ts               # Web app manifest
    │   ├── projects/
    │   │   ├── page.tsx              # All projects grid
    │   │   └── [slug]/
    │   │       └── page.tsx          # Project detail / case study
    │   └── blog/
    │       ├── page.tsx              # Blog listing
    │       └── [slug]/
    │           └── page.tsx          # Article reader
    │
    ├── components/
    │   ├── ui/                       # Primitive design system components
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Avatar.tsx
    │   │   ├── Skeleton.tsx
    │   │   ├── Tooltip.tsx
    │   │   ├── ProgressBar.tsx
    │   │   └── index.ts
    │   ├── layout/                   # Structural layout components
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   ├── MobileNav.tsx
    │   │   └── ThemeToggle.tsx
    │   ├── sections/                 # Full-width page sections
    │   │   ├── Hero.tsx
    │   │   ├── About.tsx
    │   │   ├── Skills.tsx
    │   │   ├── Experience.tsx
    │   │   ├── Projects.tsx
    │   │   ├── Testimonials.tsx
    │   │   ├── Certifications.tsx
    │   │   ├── Blog.tsx
    │   │   └── Contact.tsx
    │   └── shared/                   # Cross-section reusable components
    │       ├── SectionHeader.tsx
    │       ├── AnimatedText.tsx
    │       ├── ScrollProgress.tsx
    │       ├── BackToTop.tsx
    │       └── NoiseTexture.tsx
    │
    ├── data/                         # Source-of-truth content layer
    │   ├── profile.json
    │   ├── projects.json
    │   ├── experience.json
    │   ├── skills.json
    │   ├── testimonials.json
    │   ├── certifications.json
    │   ├── blogs.json
    │   ├── social-links.json
    │   └── settings.json
    │
    ├── hooks/                        # Reusable React hooks
    │   ├── useTheme.ts
    │   ├── useScrollProgress.ts
    │   ├── useIntersectionObserver.ts
    │   └── useMediaQuery.ts
    │
    ├── lib/                          # Pure utility functions & config
    │   ├── utils.ts                  # cn(), formatDate(), etc.
    │   ├── metadata.ts               # Metadata generation helpers
    │   └── validations.ts            # Zod schemas for all data models
    │
    ├── services/                     # Data access layer
    │   └── data.ts                   # Type-safe data fetching functions
    │
    ├── types/                        # TypeScript type definitions
    │   └── index.ts                  # All shared types & interfaces
    │
    ├── constants/                    # Application-wide constants
    │   ├── index.ts
    │   └── navigation.ts
    │
    ├── styles/                       # Design tokens (CSS custom properties)
    │   └── design-tokens.css
    │
    └── providers/                    # React context providers
        ├── ThemeProvider.tsx
        └── index.tsx
```

---

## 4. Data Architecture

All content is stored in strongly-typed JSON files consumed via a `services/data.ts` layer. No component imports JSON directly — all access is through the data service, enabling future CMS swap with zero component changes.

### Data Flow

```
JSON file → Zod validation → TypeScript interface → Service function → Component prop
```

### JSON Schema Highlights

**profile.json** — Personal info, bio, headline, availability status  
**projects.json** — Featured projects with tags, tech stack, links, case study content  
**experience.json** — Work history with timeline data and achievement bullets  
**skills.json** — Categorized skill groups with proficiency levels  
**testimonials.json** — Social proof with attribution and company logos  
**certifications.json** — Credentials with issuer, date, verification links  
**blogs.json** — Article metadata (actual MDX content can be added later)  
**social-links.json** — All social profile URLs  
**settings.json** — Site-wide config (analytics IDs, feature flags, nav items)

---

## 5. Design System

### Color Palette

```
Light Mode:
  Background:    #FAFAFA (near-white, not harsh white)
  Surface:       #FFFFFF
  Border:        #E5E7EB (gray-200)
  Text Primary:  #111827 (gray-900)
  Text Muted:    #6B7280 (gray-500)
  Accent:        #6366F1 (indigo-500)
  Accent Hover:  #4F46E5 (indigo-600)

Dark Mode:
  Background:    #0A0A0A (true dark)
  Surface:       #111111
  Surface 2:     #1A1A1A
  Border:        #2A2A2A
  Text Primary:  #F8FAFC (slate-50)
  Text Muted:    #64748B (slate-500)
  Accent:        #818CF8 (indigo-400)
  Accent Hover:  #6366F1 (indigo-500)
```

### Typography Scale

```
Font Family:   Inter (body), JetBrains Mono (code/tag)
xs:    12px / leading-4
sm:    14px / leading-5
base:  16px / leading-6
lg:    18px / leading-7
xl:    20px / leading-7
2xl:   24px / leading-8
3xl:   30px / leading-9
4xl:   36px / leading-10
5xl:   48px / 1.1
6xl:   60px / 1.1
7xl:   72px / 1.05
```

### Spacing Scale (Tailwind defaults — no custom overrides needed)

---

## 6. Animation Strategy

- **Page transitions**: Opacity + Y-translate (0 → 1, 20px → 0) via `AnimatePresence`
- **Section reveals**: Intersection Observer + Framer variants with stagger
- **Micro-interactions**: Button scale (0.98 on press), card hover lift (-4px)
- **Hero**: Animated gradient mesh (CSS) + floating particles (canvas or CSS)
- **Skill bars**: Width animation on scroll into view
- **Text**: Character-by-character reveal for hero headline

---

## 7. Performance Strategy

- All sections are **React Server Components** except interactive ones (Client boundary at leaf level)
- Images use `next/image` with `priority` on hero, `lazy` everywhere else
- Fonts loaded via `next/font/google` with `display: swap` and subset
- Code splitting per route; dynamic imports for Framer Motion in below-fold sections
- `generateStaticParams` for project and blog detail pages
- `<Suspense>` boundaries around dynamic content
- `prefetchDNS` for external resources in layout

---

## 8. SEO Implementation

- `generateMetadata()` per route with dynamic titles/descriptions
- `structured data` (JSON-LD): Person, WebSite, BreadcrumbList schemas
- Canonical URLs in all metadata
- OpenGraph images via `next/og` (ImageResponse)
- Automatic sitemap.xml via `app/sitemap.ts`
- `robots.ts` for crawl directives

---

## 9. Security Recommendations

- `Content-Security-Policy` header in `next.config.ts`
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` to restrict sensors/camera/mic
- No API keys in client bundle (all `.env` vars prefixed `NEXT_PUBLIC_` only for truly public data)
- `robots.txt` disallows `/api/` routes
- Dynamic imports prevent exposing lib code before interaction

---

## 10. Migration Checklist

- [x] Audit existing HTML — extract all content
- [x] Design architecture and folder structure
- [ ] Initialize Next.js project with TypeScript + Tailwind
- [ ] Create all JSON data files
- [ ] Implement design system tokens
- [ ] Build UI component library
- [ ] Build all page sections
- [ ] Implement routing (projects, blog)
- [ ] SEO + metadata
- [ ] Accessibility audit (keyboard nav, ARIA labels, contrast ratios)
- [ ] Performance audit (Lighthouse 95+)
- [ ] Deploy to Vercel

---

## 11. Implementation Phases

### Phase 1 — Foundation (Config + Types + Data)
`package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, all types, all JSON data

### Phase 2 — Design System (UI Components)
`Button`, `Card`, `Badge`, `Avatar`, `Skeleton`, `ProgressBar`, `Tooltip`

### Phase 3 — Layout Shell
`Navbar`, `Footer`, `ThemeToggle`, `MobileNav`, root `layout.tsx`

### Phase 4 — Sections (Server Components)
`Hero`, `About`, `Skills`, `Experience`, `Projects`, `Testimonials`, `Certifications`, `Blog`, `Contact`

### Phase 5 — Pages & Routes
Home page, projects listing, project detail, blog listing, blog detail, 404

### Phase 6 — SEO, Performance, Polish
Metadata, sitemap, OG images, structured data, loading states, accessibility

---

*This document is the source of truth for all design and architectural decisions.*
