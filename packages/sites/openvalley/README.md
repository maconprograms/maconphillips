# Open Valley Site (Placeholder)

This directory is reserved for the Open Valley frontend site.

## When Implemented

This site will:
- Filter posts tagged with `#openvalley` and `#public` from Ghost
- Share components and layouts from `@maconphillips/shared`
- Use `@maconphillips/ghost-client` for content fetching

## To Activate

1. Add pages in `src/pages/` (index.astro, [slug].astro)
2. Create `.env` with Ghost credentials
3. Update tag filter to `tag:hash-openvalley,tag:hash-public`
4. Create `#openvalley` internal tag in Ghost CMS
