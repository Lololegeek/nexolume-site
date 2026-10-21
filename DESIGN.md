# Nexolume site — design system

## Direction

A poster-like page: giant display type, flat colour fields and hard offset shadows on the app mockups. The signature is the hero's app switcher: three tabs (Writer, Sheets, Slides) recolour the whole first section and swap the mockup.

## Colour

| Token | Value | Use |
|---|---|---|
| night | `#0f1a26` | Ink, borders, hard shadows |
| paper | `#eef1f4` | Neutral sections and footer |
| blue | `#b4c9ea` | Writer field |
| sage | `#a8d0bd` | Sheets field |
| amber | `#f0c27f` | Slides field |
| blush | `#efc9b6` | Secondary accent |

Fields are full-width sections (`field--blue`, `field--sage`, `field--amber`, `field--paper`). Text on a field uses night ink, always at 4.5:1 or better.

## Typography

League Spartan for display (`.giant`: `clamp(3.5rem, 1.5rem + 8vw, 9rem)`, line height 0.95, tracking −0.04em) and for section heads; a plain sans for body text at 16 px or more. Headlines stay within two lines at every width.

## Components

- **Hero stage**: WAI-ARIA tabs with a bordered selected state (2 px currentColor border; the selected tab takes the ink background); the section background transitions over 400 ms.
- **Mockups**: Writer, Sheets and Slides drawn in HTML with a `10px 10px 0` night shadow, slightly rotated on large screens (±1.5°).
- **Sections**: apps, why Nexolume, formats (large extension text), limits of the alpha, install steps, final call to action.
- **Header**: the app logo (also the favicon) before the name, language switch, download button.

## Motion

Reveal on scroll for headings and lists, the hero recolour, button press states. Everything respects `prefers-reduced-motion`.

## Accessibility

Skip link to the content, visible focus rings, minimum 44 px touch targets, tabs with arrow-key support, no horizontal scroll at 320 px.
