# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Crane's** - A custom Ghost CMS theme for maconphillips.com presenting writing as correspondence/letters from Warren, Vermont. The design evokes quality stationery with a letterpress aesthetic.

- **Live site**: https://www.maconphillips.com
- **Ghost Admin**: https://www.maconphillips.com/ghost
- **Ghost version**: 5.x

## Commands

### Local Development
```bash
cp .env.example .env
# Generate passwords: openssl rand -hex 32
docker compose up -d
docker compose logs -f ghost
```

### Theme Deployment
Theme deploys automatically via GitHub Actions on push to `main` when files in `cranes/` change. Manual deployment:
```bash
git add cranes/
git commit -m "feat: Description of theme changes"
git push origin main
```

### Backup
```bash
docker cp ghost-maconphillips:/var/lib/ghost/content ./backup-content
docker exec ghost-mysql mysqldump -u root -p ghost > backup.sql
```

## Architecture

```
maconphillips/
├── cranes/                    # Ghost theme (deployed via CI/CD)
│   ├── assets/
│   │   ├── css/style.css     # All theme styles with CSS variables
│   │   ├── fonts/            # Self-hosted WOFF2 fonts
│   │   └── js/index.js       # Corner nav, drawer, mobile features
│   ├── partials/             # Reusable Handlebars components
│   │   ├── letterhead.hbs    # Site header (clickable, links to home)
│   │   ├── drawer.hbs        # Mobile navigation drawer
│   │   ├── card.hbs          # Post card for homepage
│   │   ├── mark.hbs          # Signature block (Tangerine + location)
│   │   └── subscribe.hbs     # Newsletter signup
│   ├── default.hbs           # Base layout (fonts, CSS, structure)
│   ├── index.hbs             # Homepage (card stack)
│   ├── post.hbs              # Single letter/post
│   └── package.json          # Theme config (signature_name, signature_location)
├── docker-compose.yml        # Local Ghost + MySQL
└── .github/workflows/
    └── deploy-theme.yml      # CI/CD using TryGhost/action-deploy-theme
```

## Design System

### CSS Variables (in style.css)
```css
--font-headline: 'Patua One'    /* Slab serif for titles */
--font-body: 'Cormorant'        /* Elegant serif for reading */
--font-signature: 'Tangerine'   /* Script for signature mark */
--font-smallcaps: 'Cormorant SC'/* Location text */

--color-paper: #fdfaf5          /* Cream background */
--color-desk: #d8d4cb           /* Gray surround */
--color-ink: #333333            /* Body text */
--color-accent: #8b5a2b         /* Warm brown (buttons, links) */
```

### Responsive Breakpoints
- `>900px`: Desktop with centered content, corner navigation
- `600-900px`: Full-width with seal navigation
- `<600px`: Mobile with bottom nav bar, no card rotation

## Key Interactions

### Desktop
- **Corner navigation**: Appears on horizontal mouse movement (8px threshold), auto-hides after 2.5s
- **Card hover**: Cards lift (-3px) with shadow on hover, alternating ±0.5deg rotation

### Mobile
- **Bottom nav**: Fixed bar with Home and Topics buttons
- **Drawer**: Slides from right, contains category links
- **Chrome fade**: Header/nav fade on scroll down (>100px)
- **Focus beam**: Current paragraph highlighted via IntersectionObserver

## Ghost-Specific Notes

### Custom Theme Settings
Configurable in Ghost Admin → Design:
- `signature_name`: Name shown in signature block
- `signature_location`: Location shown below signature

### Template Context
- `{{@site}}` - Site settings (title, description)
- `{{@custom}}` - Custom theme settings from package.json
- `{{#get "tags"}}` - Query for categories/navigation
- `{{#is "post"}}` - Page type conditionals

### Categories
Ghost tags appear as topic links in the drawer navigation. Filter with `visibility:public` in tag queries to exclude internal tags.

## CI/CD Requirements

GitHub Secrets needed for deployment:
- `GHOST_ADMIN_API_URL` - Ghost site URL
- `GHOST_ADMIN_API_KEY` - Admin API key from Ghost Admin → Integrations
