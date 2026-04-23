# Worklog — Connect Frontend to Database (Articles)

## Date: 2025-06-05

## Summary
Connected the public-facing frontend to the SQLite database via a new public API route and a React context provider. Admin changes (marking articles as trending, featured, etc.) are now reflected live on the site.

## Files Created

### 1. `src/app/api/articles/route.ts` — Public Articles API
- **GET** endpoint that returns published articles from the database
- Supports query params: `category`, `featured`, `trending`, `search`, `id`
- Always filters by `published: true`
- Maps DB fields to frontend format before returning

### 2. `src/lib/articles-context.tsx` — Articles Context Provider
- `ArticlesProvider` component that fetches all published articles on mount
- `useArticles()` hook with computed article sets
- Listens for `articles-refresh` custom event from admin

## Files Modified
- All public components updated to use `useArticles()` instead of static data
- `src/app/page.tsx` wrapped in `<ArticlesProvider>`

---

## Date: 2026-04-23

## Summary
Implemented two major features: image upload for articles and multi-user editor management. Fixed 7+ bugs across the platform.

## Features Implemented

### Image Upload for Articles
- **New API**: `src/app/api/upload/route.ts` — POST endpoint for file uploads
  - Validates file type (JPG, PNG, GIF, WebP, SVG) and size (max 5MB)
  - Stores files in `public/uploads/` with unique filenames
  - Returns public URL path
- **Updated**: `src/components/admin/article-form.tsx` — Complete redesign
  - Toggle between "Televerser" (upload) and "URL" modes
  - Real-time image preview with remove button
  - Drag-to-browse file selector with loading state
  - Client-side validation before upload
- **Updated**: `next.config.ts` — Added `images.remotePatterns` for external images

### Editor Management System
- **New API**: `src/app/api/admin/editors/route.ts` — GET, POST, DELETE
  - GET: Lists all users (admin + editors)
  - POST: Creates new user with bcrypt-hashed password
  - DELETE: Removes user with safety checks (no self-delete, no last-admin delete)
  - Role-based access: only "admin" role can manage editors
- **New Page**: `src/app/admin/editors/page.tsx`
  - Form to add new editors with name, email, password, role selection
  - User list with role badges (admin/editor), avatar initials
  - Delete confirmation dialog
  - Current user protection (can't delete yourself)
  - Access restricted to admin role only
- **Updated**: `src/app/admin/layout.tsx` — Added "Editeurs" nav item with Users icon

## Bug Fixes
- **Social share buttons** (`article-dialog.tsx`): Added onClick handlers for Facebook, Twitter, LinkedIn sharing
- **Environnement category** (`header.tsx`): Added to navigation with Leaf icon
- **"Tout voir" buttons** (`latest-news.tsx`): Now scrolls to rubriques section
- **Footer category links** (`footer.tsx`): Made functional with scroll + category switch
- **Footer social links**: Added target="_blank" and rel="noopener noreferrer"
- **Prisma logging** (`db.ts`): Disabled in production, enabled only in dev
- **next.config.ts**: Added remote image patterns for external URLs

## Build Verification
- Next.js build successful (17 pages, 10 API routes)
- All new routes functional: /admin/editors, /api/upload, /api/admin/editors

---
Task ID: 1
Agent: Main Agent
Task: Fix article dialog centering, image display, and footer black background

Work Log:
- Read article-dialog.tsx and identified that the hero image container lost its height when image loaded (transition from absolute to static positioning caused container to collapse)
- Read footer.tsx and identified bg-foreground instead of explicit bg-black
- Read ui/dialog.tsx to understand base DialogContent classes that needed overriding
- Fixed hero image section: restructured with aspect-[16/9] sm:aspect-[2.2/1] on container, skeleton as absolute overlay, added imageError state with fallback UI
- Fixed dialog centering: added !flex, !flex-col, !sm:max-w-none, !gap-0, !shadow-none to properly override base DialogContent classes (grid, sm:max-w-lg, gap-4, shadow-lg)
- Fixed footer: changed bg-foreground to bg-black in both top banner and main footer area
- Build verified: 0 errors

Stage Summary:
- article-dialog.tsx: Hero image now always has aspect ratio, image displays correctly with fade-in, error fallback shown if image fails
- article-dialog.tsx: Dialog properly fullscreen with all base classes overridden using !important
- footer.tsx: Both footer sections now use explicit bg-black
