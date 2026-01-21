# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo managing multiple Astro frontends that share a single headless Ghost CMS backend. The sites display posts fetched from Ghost at build time via static site generation.

**Sites:**
- **maconphillips.com** - Personal letters from Warren, Vermont
- **openvalley.maconphillips.com** - (placeholder, not yet implemented)

## Monorepo Structure

```
/
├── packages/
│   ├── ghost-client/           # Shared Ghost API client
│   │   └── src/index.ts        # createGhostClient, getPosts, getPost, getSettings
│   ├── shared/                 # Shared UI components
│   │   └── src/
│   │       ├── components/     # Card.astro, Subscribe.astro
│   │       ├── layouts/        # Base.astro
│   │       └── styles/         # global.css
│   └── sites/
│       ├── maconphillips/      # maconphillips.com site
│       └── openvalley/         # placeholder for future site
├── package.json                # Root with npm workspaces
└── CLAUDE.md
```

## Commands

```bash
# Development
npm run dev:maconphillips    # Start maconphillips dev server at localhost:4321

# Build
npm run build:maconphillips  # Build maconphillips to packages/sites/maconphillips/dist/
npm run build:all            # Build all sites

# Install dependencies (from root)
npm install
```

## Architecture

### Data Flow

1. **Ghost CMS** (ghost.maconphillips.com) stores all content
2. **Astro sites** fetch posts via Ghost Content API at build time
3. **Static pages** are generated for each post slug
4. **Tag filtering** determines which posts appear on which site

### Shared Packages

- `@maconphillips/ghost-client` - Ghost API wrapper with tag filtering support
- `@maconphillips/shared` - Shared Astro components, layouts, and styles

### Environment Variables

Each site needs its own `.env` file in `packages/sites/<site>/`:
```
GHOST_URL=https://ghost.maconphillips.com
GHOST_KEY=[content-api-key]
```

### Multi-Site Tag Strategy

Ghost tags control content filtering. Posts appear on sites based on their tags:
- `#personal` - maconphillips.com only (filter: `tag:hash-personal`)
- `#public` - All sites

Each site's index.astro specifies its tag filter when calling `ghost.getPosts()`.

## Adding a New Site

1. Create `packages/sites/<new-site>/` with package.json, astro.config.mjs, tsconfig.json
2. Add src/pages/index.astro and [slug].astro with appropriate tag filter
3. Add scripts to root package.json
4. Create `.env` file with Ghost credentials
5. Add a new tag in Ghost (e.g., `#newsite`) for site-specific content
