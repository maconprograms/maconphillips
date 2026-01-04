# Crane's

## A Creative Brief for maconphillips.com

---

### The Concept

A personal publishing site that feels like correspondence — not a blog, not a newsletter, but letters from a place. Each piece of writing arrives as if slipped from an envelope: warm cream paper, considered typography, and a maker's mark at the bottom right.

The design draws from Crane's stationery — the quiet confidence of good paper stock, letterspaced small caps, a signature that means something. It's the digital equivalent of writing on your own letterhead.

---

### Design Philosophy

**"Country fair meets the letter home"**

The typography pairs friendly warmth (Patua One headlines) with understated elegance (Cormorant body text). The signature is rendered in Tangerine script — personal, like signing each piece with a fountain pen. The location sits beneath in small caps, a Crane's touch that grounds the identity in place.

The interface is deliberately minimal. The reader lands directly on the writing. Navigation exists but stays hidden until needed — a side drawer that slides in only on intentional horizontal mouse movement, preserving the reading experience.

The mark at the bottom right functions like a potter's stamp on the underside of a bowl: you discover whose work this is after you've engaged with it.

---

### Typography

| Element | Font | Weight | Notes |
|---------|------|--------|-------|
| Headlines | Patua One | Regular | Friendly slab serif, country fair warmth |
| Body text | Cormorant | Regular | High contrast, elegant, literary |
| Date | Cormorant | Italic | Quiet timestamp |
| Signature | Tangerine | Bold | Script, like a pen signature |
| Location | Cormorant SC | Regular | Small caps, letterspaced 0.2em |
| Navigation | Cormorant | Regular | Drawer links, understated |

All fonts available via Google Fonts.

---

### Color Palette

| Element | Hex | Description |
|---------|-----|-------------|
| Paper | #fdfaf5 | Warm cream, like good stationery |
| Page surround | #d8d4cb | Warm gray, suggests a desk surface |
| Headlines | #1a1a1a | Near black |
| Body text | #333333 | Dark gray, easy on the eyes |
| Date | #999999 | Quiet gray |
| Location | #777777 | Medium gray |
| Nav links | #555555 | Visible but not demanding |
| Divider line | #e8e3d9 | Subtle, paper-like |
| Card border | #ebe6dc | Letter card edges |

---

### Page Types

#### 1. Homepage — The Stack

A pile of correspondence. Each post appears as a card — white against the cream page, like letters pulled from envelopes.

```
┌─────────────────────────────────────┐
│                                     │
│  ┌─────────────────────────────┐    │
│  │ January 15, 2025            │    │
│  │ What Warren Taught Me...    │    │  ← Cards lift and tilt
│  │ I moved to Warren seven...  │    │    on hover
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ January 8, 2025             │    │
│  │ The Planning Commission...  │    │
│  │ The meetings are open...    │    │
│  └─────────────────────────────┘    │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│                    Macon Phillips   │
│                   WARREN, VERMONT   │
│                                     │
└─────────────────────────────────────┘
```

**Card behavior:**
- White background (#fff) against cream page
- 1px border (#ebe6dc)
- On hover: lift (-3px), slight rotation (±0.3deg), soft shadow
- Alternating tilt direction suggests shuffling through a pile

**Card contents:**
- Date (Cormorant italic)
- Title (Patua One)
- Excerpt (Cormorant, 1-2 sentences)

---

#### 2. Post Page — The Letter

Clean and focused. The writing is the interface.

```
┌─────────────────────────────────────┐
│                     January 15, 2025│  ← Date, always visible
│                                     │
│  What Warren Taught Me              │
│  About Housing Policy               │
│                                     │
│  I moved to Warren seven years      │
│  ago, and for the first few years   │
│  I thought I understood the         │
│  housing problem here...            │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│                    Macon Phillips   │
│                   WARREN, VERMONT   │
│                                     │
└─────────────────────────────────────┘
```

**Structure:**
- Date: fixed top right, always visible
- Title: Patua One, with right padding to avoid date overlap
- Body: Cormorant, generous line height (1.78)
- Divider: subtle 1px line
- Mark: Tangerine signature + Cormorant SC location, bottom right

---

### Interaction: The Side Drawer

Navigation lives in a drawer that slides in from the right edge — but only on horizontal mouse movement. Scrolling to read does not trigger it. This keeps the reading experience undisturbed.

**Trigger:** Side-to-side mouse movement only (threshold: 8px horizontal delta)

**Behavior:**
- Drawer slides in from right (0.4s ease)
- Stays open while cursor hovers over it
- Auto-hides after 2.5 seconds of no horizontal movement
- Gradient fade from solid cream to transparent (no hard edge)

**Contents:**
```
                    ┌──────────────┐
                    │              │
                    │     Housing  │  ← Categories
                    │     Vermont  │
                    │    Politics  │
                    │       Life   │
                    │              │
                    │              │
                    │              │
                    │  ← Previous  │  ← Post navigation
                    │     Next →   │    (on post pages)
                    │              │
                    └──────────────┘
```

**Drawer navigation:**
- Categories (topics/tags from Ghost)
- Previous/Next links (on post pages only)
- No "Archive" or "About" — categories *are* the archive

**Mobile fallback:** 
- Fixed bottom nav bar with category links
- No hover interaction on touch devices

---

### The Mark

The signature block at the bottom right is the emotional anchor of the design.

```
                    Macon Phillips      ← Tangerine, 2.4rem, bold
                   WARREN, VERMONT      ← Cormorant SC, 0.8rem, letterspaced 0.2em
```

The small caps treatment on "Warren, Vermont" echoes traditional engraved stationery. The combination of script name and small caps location creates a lockup — a cohesive unit that reads as a mark of origin.

The mark appears on:
- Homepage (below the stack of cards)
- Post pages (below the letter content)

---

### Information Architecture

```
maconphillips.com
│
├── / (homepage)
│   └── Stack of recent letters
│
├── /[post-slug]
│   └── Individual letter
│
└── Categories (accessed via drawer)
    ├── Housing
    ├── Vermont  
    ├── Politics
    └── Life (or whatever topics emerge)
```

**No dedicated pages for:**
- Archive (the homepage *is* the archive)
- About (consider: a pinned "letter of introduction" or drawer expansion)
- Categories (filtered views of the same stack)

---

### Responsive Behavior

**Desktop (900px+):**
- 800px max-width content area
- Centered with page shadow
- Side drawer interaction

**Tablet/Mobile (< 769px):**
- Full-width content
- Fixed bottom navigation bar
- No drawer (no hover states on touch)
- Date moves to top of content area (not fixed)

---

### Technical Notes

**Platform:** Ghost CMS

**Fonts:** Google Fonts
- Patua One
- Cormorant (including SC variant)
- Tangerine

**JavaScript:** Minimal
- Drawer interaction (horizontal mouse tracking)
- No framework dependencies

**Ghost Implementation:**
- Custom theme
- Categories = Ghost tags
- Excerpts = Ghost excerpt field or auto-generated

---

### Future Considerations

**Parked ideas:**
- AI-generated watermark illustrations per post (etched/engraved style, content-based)
- Could revisit as a v2 feature

**To design:**
- Category filtered view (same stack, filtered)
- About/introduction content (pinned letter? drawer section?)
- Email template for subscribers (if using Ghost newsletters)
- RSS feed styling
- 404 page

---

### What This Is

- A place to publish writing
- A digital letterhead  
- Correspondence from Warren, Vermont
- A statement that the work speaks first

### What This Is Not

- A blog with a header, sidebar, and footer
- A newsletter signup funnel
- A personal brand exercise
- Optimized for engagement metrics

---

*January 2025*
