# JDM Retro Rides - Design Specifications

## Typography
- **Primary Font Family:** "Plus Jakarta Sans" (Google Fonts)
- **Icons:** "Material Symbols Outlined" (variable settings: FILL 0, wght 400, GRAD 0, opsz 24)
- **Headings (H1, H2):** font-black (900), tracking-tight, uppercase/capitalized as appropriate.
- **Body Text:** font-medium (500), leading-relaxed.

## Color Palette (Tailwind Tokens)
- **Primary/Main Text:** #000000 (Black)
- **Secondary (Brand Blue):** #1d4ed8 / #0058be 
- **Surface (Background):** #f9f9f9
- **Outline Variant (Borders):** #c2c6d6ff
- **Surface-Variant:** #e2e2e2
- **Success (In Stock):** bg-green-100, text-green-600
- **Warning (Reserved):** bg-amber-100, text-amber-600
- **Soft UI (Disabled/Sold):** bg-slate-100/200, text-slate-500

## Layout & Geometry
- **Primary Container:** max-w-7xl (Center aligned)
- **Card Corners:** rounded-xl (1rem)
- **Button Corners:** rounded-lg (0.5rem)
- **Card Layout:** flex-col (mobile) -> flex-row (desktop, 2/5 images : 3/5 details)
- **Gaps:** px-6 to px-8 for main sections.

## Interactive States (Hover & Motion)
- **Image Hover:** scale-105 transition with duration-700.
- **Card Hover:** Transition from shadow-sm to shadow-md + border visibility.
- **Zoom Icon:** 
  - Position: absolute bottom-4, right-4.
  - Style: White, text-4xl, drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)].
  - Behavior: Appears on featured image when hovering the image column.
- **Details Overlay:**
  - Border: 2px solid secondary blue.
  - Shadow: shadow-[0_20px_50px_rgba(59,130,246,0.3)] (Deep blue glow).
  - Transition: Hidden/Shown with absolute inset-0.
- **Navigation:** backdrop-blur-md (Glassmorphism) + bg-white/80.

## Animation System
- **FadeInUp:** 0.8s ease-out, translateY(20px) -> translateY(0).
- **Reveal:** Applied to cards; triggers class ".active" on scroll to opacity-1 -> opacity-1.
- **Car Slide:** transform transition (1.5s cubic-bezier) for entrance logos.

## Component Logic
- **Inventory Filters:** Mutually exclusive sorting (Clears other dropdowns when one is selected).
- **Slideshow:** Full-screen black/95 background, escape/swipe support, current/total counter.
- **Anchors:** checkScrollHash() handles automatic scrolling to stock numbers upon dynamic load.
