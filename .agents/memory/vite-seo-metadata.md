---
name: Vite SEO metadata
description: Build-safe handling for canonical and social metadata in Vite HTML entrypoints.
---

Root-relative canonical links such as `href="/"` can be treated as asset URLs by Vite and make production builds fail with an EISDIR error. Keep canonical resolution runtime-based when the deployed origin is not known, and use explicit public assets for static social previews.

**Why:** The portfolio build failed until the root canonical asset reference was removed; the runtime canonical still produces the correct origin and pathname.

**How to apply:** For artifact apps without a fixed public domain, add canonical and bundled social image metadata in the app, while only referencing concrete files from `public/` in index.html.