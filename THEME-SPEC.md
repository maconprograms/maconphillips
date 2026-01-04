# Crane's Theme Specification

A Ghost theme for maconphillips.com

---

## Concept

Letters to neighbors. Each piece of writing arrives like correspondence on fine stationery — warm cream paper, considered typography, a maker's mark at the bottom. The digital equivalent of writing on your own letterhead.

All content is public. Anyone can read. If you want letters in your inbox, leave your email.

---

## Design Tokens

### Typography

```css
--font-headline: 'Patua One', serif;      /* Warm slab serif */
--font-body: 'Cormorant', serif;          /* Elegant, literary */
--font-signature: 'Tangerine', cursive;   /* Pen signature */
--font-smallcaps: 'Cormorant SC', serif;  /* Location mark */
```

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Headlines | Patua One | 2.25rem | 400 | — |
| Body | Cormorant | 1.25rem | 400 | line-height: 1.78 |
| Date | Cormorant | 1rem | 400 italic | — |
| Signature | Tangerine | 2.4rem | 700 | — |
| Location | Cormorant SC | 0.8rem | 400 | letter-spacing: 0.2em |

### Colors

```css
--color-paper: #fdfaf5;       /* Cream stationery */
--color-desk: #d8d4cb;        /* Warm gray surround */
--color-ink: #333333;         /* Body text */
--color-headline: #1a1a1a;    /* Near black */
--color-muted: #777777;       /* Location, metadata */
--color-faint: #999999;       /* Date */
--color-rule: #e8e3d9;        /* Dividers */
--color-card-border: #ebe6dc; /* Card edges */
--color-accent: #8b5a2b;      /* Wax seal / CTA (warm brown) */
```

---

## Page Templates

### Homepage — The Stack

A vertical stream of letter cards on a desk surface.

```
┌─────────────────────────────────────────┐
│ [desk surface]                    [seal]│
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ January 15, 2025                │   │  ← Card rotates
│   │ What Good Looks Like            │   │    -1deg odd
│   │ Moving from AI as a magic box...│   │    +1deg even
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ January 8, 2025                 │   │
│   │ The Gravity of the Grand List   │   │
│   │ A deep dive into Vermont's...   │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ───────────────────────────────────   │
│                                         │
│                      Macon Phillips     │
│                     WARREN, VERMONT     │
└─────────────────────────────────────────┘
```

**Card Specs:**
- Background: `#ffffff`
- Border: `1px solid var(--color-card-border)`
- Padding: `2rem`
- Shadow: `2px 4px 12px rgba(0,0,0,0.08)`
- Rotation: `nth-child(odd): rotate(-0.5deg)`, `nth-child(even): rotate(0.5deg)`
- Hover: `translateY(-3px)`, increased shadow, slight rotation increase

**Card Contents:**
- Date (Cormorant italic, muted)
- Title (Patua One, linked)
- Excerpt (Cormorant, 2 sentences max)
- Tag pill (optional, subtle)

---

### Post — The Letter

Clean reading. The writing is the interface.

```
┌─────────────────────────────────────────┐
│                                   [seal]│
│                                         │
│                      January 15, 2025   │
│                                         │
│   What Good Looks Like                  │
│                                         │
│   Moving from AI as a "magic box" to    │
│   AI as a reliable system. Discussing   │
│   Pydantic AI not just as a library,    │
│   but as a philosophy of Structured     │
│   Outputs...                            │
│                                         │
│   ───────────────────────────────────   │
│                                         │
│                      Macon Phillips     │
│                     WARREN, VERMONT     │
│                                         │
│   ← Previous              Next →        │
└─────────────────────────────────────────┘
```

**Layout:**
- Max-width: `680px`, centered
- Date: right-aligned, top
- Title: Patua One, left-aligned with right padding (avoid date)
- Body: Cormorant, `line-height: 1.78`
- Divider: 1px rule, `var(--color-rule)`
- Mark: right-aligned signature block
- Nav: Previous/Next links below mark

---

### Tag Archive — Filtered Stack

Same as homepage, filtered by tag. Heading shows tag name.

---

## The Mark (Signature Block)

Appears on every page, bottom-right of content area.

```html
<footer class="mark">
  <span class="mark-signature">Macon Phillips</span>
  <span class="mark-location">WARREN, VERMONT</span>
</footer>
```

```css
.mark-signature {
  font-family: var(--font-signature);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-ink);
}
.mark-location {
  font-family: var(--font-smallcaps);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: var(--color-muted);
  text-transform: uppercase;
}
```

---

## Navigation

### Desktop: The Seal

A small wax-seal icon fixed to the top-right corner. Click to open drawer.

- Icon: circular, `var(--color-accent)`, 48px
- Position: `fixed`, top-right with padding
- Click: opens right-side drawer (slide in, 300px width)

### Drawer Contents

```
┌──────────────┐
│              │
│   Topics     │
│   ────────   │
│   Policy     │
│   Tech       │
│   Vermont    │
│   Music      │
│              │
│   ← Prev     │  (on post pages)
│   Next →     │
│              │
└──────────────┘
```

### Mobile: Bottom Bar

Fixed bottom navigation, minimal:

```
┌─────────────────────────────────────────┐
│     [Home]            [Topics ▲]        │
└─────────────────────────────────────────┘
```

- Topics opens a bottom sheet with tag list
- Subscribe CTA lives in the content, not the nav

---

## Email Updates

All content is public. No paywalls, no tiers, no "premium" anything. Just a simple way for neighbors and friends to get letters by email.

### Subscribe CTA

A simple, friendly prompt. Appears at bottom of homepage and optionally after posts.

```
┌─────────────────────────────────────────┐
│                                         │
│   Get letters by email                  │
│                                         │
│   [        your@email.com         ]     │
│                                         │
│   [ Subscribe ]                         │
│                                         │
└─────────────────────────────────────────┘
```

- Tone: casual, neighborly — not salesy
- No mention of "free" (implies there's a paid option)
- No member counts, testimonials, or urgency tactics

### Ghost Settings

In Ghost Admin, disable paid tiers entirely:
- Settings → Membership → Subscription access: **Free only**
- Remove default "Portal" button from nav
- Disable comments if not using them

### Portal Styling

Keep it simple and on-brand:

```css
[data-portal] {
  --portal-accent: #8b5a2b;
  --portal-bg: #fdfaf5;
}
```

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `> 900px` | Centered content (680px), desk shadow, seal nav |
| `600-900px` | Full-width content with padding, seal nav |
| `< 600px` | Full-width, bottom bar nav, no card rotation |

---

## Templates Required

```
cranes/
├── default.hbs          # Base layout
├── index.hbs            # Homepage (the stack)
├── post.hbs             # Single letter
├── page.hbs             # Static pages
├── tag.hbs              # Filtered stack
├── author.hbs           # Author page (minimal)
├── error.hbs            # Error states
├── error-404.hbs        # "Letter not found"
├── partials/
│   ├── card.hbs         # Letter card component
│   ├── mark.hbs         # Signature block
│   ├── drawer.hbs       # Navigation drawer
│   ├── subscribe.hbs    # Email signup (simple)
│   └── meta.hbs         # SEO/social meta
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── index.js     # Drawer toggle, mobile nav
└── package.json
```

---

## package.json

```json
{
  "name": "cranes",
  "description": "Letters from Warren, Vermont",
  "version": "1.0.0",
  "engines": { "ghost": ">=5.0.0" },
  "license": "MIT",
  "author": {
    "name": "Macon Phillips",
    "email": "hello@maconphillips.com"
  },
  "config": {
    "posts_per_page": 12,
    "image_sizes": {
      "s": { "width": 300 },
      "m": { "width": 720 },
      "l": { "width": 1200 }
    },
    "custom": {
      "signature_name": {
        "type": "text",
        "default": "Macon Phillips",
        "group": "site"
      },
      "signature_location": {
        "type": "text",
        "default": "WARREN, VERMONT",
        "group": "site"
      },
      "accent_color": {
        "type": "color",
        "default": "#8b5a2b",
        "group": "site"
      }
    }
  }
}
```

---

## What This Theme Is

- A place to publish letters
- A digital letterhead
- Correspondence from Warren, Vermont
- A way for neighbors and friends to follow along

## What This Theme Is Not

- A monetized newsletter
- A blog with sidebar widgets
- A signup funnel with urgency tactics
- A personal brand exercise
- Anything with tiers, paywalls, or "premium" content

---

*Revised January 2025*
