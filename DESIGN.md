# Design — Nexolume site

Register: **brand**. Source of truth for tokens: `app/globals.css`.

## Direction: colour chapters

Each Nexolume space is a full-bleed field of colour. Sequence: night (hero) / paper (five switch bands) / blue + sage (showcase) / blush (drop zone) / sage (limits) / amber (install) / night (call to action) / paper (footer).

## Colour

Six fields: night `#0f1a26`, paper `#eef1f4`, blue `#b4c9ea`, sage `#a8d0bd`, amber `#f0c27f`, blush `#efc9b6`. Each field carries its own dark ink (light ink on night). Action colour `#1f4e9b`. Amber and blush are never used for small text on other fields.

## Typography

League Spartan 700 for display (tracking -0.04em, leading 0.9); Figtree 400/600 for text. Body at least 16px, small at least 13px. Headlines hold in two lines or fewer.

## Components

- Folder stack in the hero (tabs link to the sections).
- Tactile button: dark base, face that sinks 4px on press.
- Magnetic drop zone, adapted from the dqnamo Kitchen pattern (proximity spring, states idle / near / over).
- Switch bands, index with preview, stages bar.

## Motion

Transform-only offsets and springs from `motion/react`; nothing hides content until it animates. Reduced motion removes offsets and the drop-zone pull.

## Pictures

No stock photography: the pictures are fragments of the product itself (`data-ui`): a document, a sheet, a slide, a file list.
