# Architecture: Ghost Headless CMS with Astro Frontend

## Overview

A single Ghost CMS instance serves as the content backend for multiple independent frontend websites. This monorepo contains all Astro frontends, sharing common components and a unified Ghost API client.

**Benefits:**
- Centralized content management in Ghost
- Shared components, layouts, and styles across sites
- Content filtering by tags for different audiences
- Independent deployment of each frontend
- Single codebase for all frontends

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                        ghost.maconphillips.com                                  │
│                        ────────────────────────                                 │
│                           GHOST CMS (Headless)                                  │
│                           Hosted on Coolify                                     │
│                                                                                 │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│   │   Admin     │  │ Content API │  │  Members    │  │   Images    │           │
│   │   /ghost    │  │ /ghost/api  │  │    API      │  │  /content   │           │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
                                     │
                          Content API v5.0
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                    ▼                                 ▼
         ┌─────────────────────┐          ┌─────────────────────┐
         │                     │          │                     │
         │  maconphillips.com  │          │  future sites...    │
         │                     │          │                     │
         │  Astro Frontend     │          │  Add new sites in   │
         │  Personal letters   │          │  packages/sites/    │
         │                     │          │                     │
         │  Filter: #personal  │          │                     │
         │          #public    │          │                     │
         │                     │          │                     │
         └─────────────────────┘          └─────────────────────┘
```

---

## Monorepo Structure

```
/
├── packages/
│   ├── ghost-client/           # @maconphillips/ghost-client
│   │   └── src/index.ts        # createGhostClient(), getPosts(), getPost()
│   ├── shared/                 # @maconphillips/shared
│   │   └── src/
│   │       ├── components/     # Card.astro, Subscribe.astro
│   │       ├── layouts/        # Base.astro
│   │       └── styles/         # global.css
│   └── sites/
│       └── maconphillips/      # maconphillips.com
│           ├── src/pages/
│           ├── public/
│           ├── astro.config.mjs
│           └── .env
├── package.json                # npm workspaces root
├── CLAUDE.md                   # Developer guidance
└── architecture.md             # This file
```

---

## Components

### Ghost CMS (Backend)

| Property | Value |
|----------|-------|
| URL | `https://ghost.maconphillips.com` |
| Admin Panel | `https://ghost.maconphillips.com/ghost` |
| Content API | `https://ghost.maconphillips.com/ghost/api/content/` |
| Members API | `https://ghost.maconphillips.com/members/api/` |
| Hosting | Coolify (self-hosted) |

**Responsibilities:**
- Content creation and editing
- Image/asset storage
- Member/subscriber management
- Email newsletter delivery
- API for all frontends

### Shared Package: @maconphillips/ghost-client

Provides a unified Ghost API wrapper with tag filtering support.

```typescript
import { createGhostClient } from '@maconphillips/ghost-client';

const ghost = createGhostClient({
    url: import.meta.env.GHOST_URL,
    key: import.meta.env.GHOST_KEY
});

// Fetch posts filtered by tags
const posts = await ghost.getPosts({
    tagFilter: 'tag:hash-personal,tag:hash-public'
});
```

### Shared Package: @maconphillips/shared

Provides reusable Astro components, layouts, and styles.

```astro
---
import Base from '@maconphillips/shared/layouts/Base.astro';
import Card from '@maconphillips/shared/components/Card.astro';
import '@maconphillips/shared/styles/global.css';
---
```

### Frontend: maconphillips.com

| Property | Value |
|----------|-------|
| Framework | Astro |
| Location | `packages/sites/maconphillips/` |
| Content Filter | `tag:hash-personal,tag:hash-public` |
| Hosting | TBD (Coolify, Vercel, or Netlify) |

**Environment Variables** (in `packages/sites/maconphillips/.env`):
```
GHOST_URL=https://ghost.maconphillips.com
GHOST_KEY=[content-api-key]
```

---

## Commands

```bash
# Install all dependencies (from root)
npm install

# Development
npm run dev:maconphillips    # Start dev server at localhost:4321

# Build
npm run build:maconphillips  # Build to packages/sites/maconphillips/dist/
npm run build:all            # Build all sites
```

---

## DNS Configuration

| Domain | Type | Target |
|--------|------|--------|
| `ghost.maconphillips.com` | A or CNAME | Coolify server |
| `maconphillips.com` | A or CNAME | Frontend hosting |
| `www.maconphillips.com` | CNAME | `maconphillips.com` |

---

## Data Flow

### Reading Content (Frontend → Ghost)

```
Browser                  Astro Frontend              Ghost API
   │                          │                          │
   │  GET /                   │                          │
   │─────────────────────────▶│                          │
   │                          │  GET /ghost/api/content/ │
   │                          │  posts/?key=xxx&filter=  │
   │                          │─────────────────────────▶│
   │                          │                          │
   │                          │◀─────────────────────────│
   │                          │  JSON { posts: [...] }   │
   │                          │                          │
   │◀─────────────────────────│                          │
   │  HTML (rendered posts)   │                          │
```

### Subscribing (Browser → Ghost directly)

```
Browser                                    Ghost Members API
   │                                              │
   │  POST /members/api/send-magic-link/          │
   │  { email: "user@example.com" }               │
   │─────────────────────────────────────────────▶│
   │                                              │
   │◀─────────────────────────────────────────────│
   │  Magic link email sent                       │
```

---

## Tag Strategy for Multi-Site Content

Use Ghost internal tags (starting with `#`) to control which content appears on which site:

| Tag | Appears On |
|-----|------------|
| `#personal` | maconphillips.com only |
| `#public` | All sites |

**Important:** Posts must have at least one of these tags to appear. Untagged posts will not be displayed.

---

## Adding a New Site

1. Create `packages/sites/<new-site>/` with:
   - `package.json` (name: `@maconphillips/site-<name>`)
   - `astro.config.mjs`
   - `tsconfig.json`
   - `src/pages/index.astro` and `[slug].astro`
   - `.env` with Ghost credentials

2. Add scripts to root `package.json`:
   ```json
   "dev:<name>": "npm run dev -w @maconphillips/site-<name>",
   "build:<name>": "npm run build -w @maconphillips/site-<name>"
   ```

3. Configure tag filter in the site's pages (e.g., `tag:hash-<name>,tag:hash-public`)

4. Create the corresponding internal tag in Ghost (e.g., `#<name>`)
