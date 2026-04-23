# Worklog — Connect Frontend to Database (Articles)

## Date: 2025-06-05

## Summary
Connected the public-facing frontend to the SQLite database via a new public API route and a React context provider. Admin changes (marking articles as trending, featured, etc.) are now reflected live on the site.

## Files Created

### 1. `src/app/api/articles/route.ts` — Public Articles API
- **GET** endpoint that returns published articles from the database
- Supports query params: `category`, `featured`, `trending`, `search`, `id`
- Always filters by `published: true`
- Maps DB fields to frontend format before returning:
  - `authorName` / `authorRole` → `author: { name, role }`
  - `createdAt` → `date` (ISO string)

### 2. `src/lib/articles-context.tsx` — Articles Context Provider
- `ArticlesProvider` component that fetches all published articles on mount
- `useArticles()` hook exposing:
  - `articles`, `featuredArticles`, `trendingArticles`, `latestArticles`
  - `getArticlesByCategory()`, `getArticleById()`, `getRelatedArticles()`, `searchArticles()`
  - `refreshArticles()`, `loading` state
- Listens for `articles-refresh` custom event (dispatched by admin after save)
- Exports `Article` interface matching the static `data.ts` type

## Files Modified

### 3. `src/components/trending-sidebar.tsx`
- Replaced static `trendingArticles` import with `useArticles()` hook
- Added skeleton loading state (pulse animation)
- Kept `categoryColors` import from `data.ts`

### 4. `src/components/breaking-news.tsx`
- Replaced static `trendingArticles` import with `useArticles()` hook

### 5. `src/components/hero-section.tsx`
- Replaced static `featuredArticles` import with `useArticles()` hook
- Added skeleton loading state for hero grid
- Kept `categoryColors` import from `data.ts`

### 6. `src/components/latest-news.tsx`
- Replaced static `latestArticles` import with `useArticles()` hook
- Added skeleton loading state (6 card placeholders)
- Kept `categoryColors` import from `data.ts`

### 7. `src/components/category-section.tsx`
- Replaced static `getArticlesByCategory` import with `useArticles()` hook
- Kept `categoryColors` and `Category` type imports from `data.ts`

### 8. `src/components/opinion-section.tsx`
- Moved static `opinionArticles` filter inside the component
- Uses `useArticles()` hook to get the articles array
- `Article` type now imported from `articles-context.tsx`

### 9. `src/components/article-dialog.tsx`
- Replaced static `getArticleById` and `getRelatedArticles` with `useArticles()` hook
- Kept `categoryColors` from `data.ts`, `Article` type from context

### 10. `src/components/search-dialog.tsx`
- Replaced static `searchArticles` with `useArticles()` hook
- Moved `React` import to top of file (was at bottom)
- Added `searchArticles` to `useMemo` dependency array
- Kept `categoryColors` from `data.ts`

### 11. `src/app/page.tsx`
- Wrapped entire page content in `<ArticlesProvider>`

### 12. `src/components/admin/article-form.tsx`
- After successful save, dispatches `articles-refresh` custom event on `window`
- This triggers the `ArticlesProvider` to re-fetch articles from the database

## Design Decisions
- **`data.ts` left untouched** — serves as reference/seed data
- **`categoryColors` stays in `data.ts`** — only article data imports changed
- **Loading states** — skeleton placeholders with `animate-pulse` for hero, latest news, and trending sidebar
- **Breaking news** — no loading skeleton needed (compact ticker bar renders quickly)
- **Article type** — context exports a compatible `Article` interface so components need minimal changes
- **Admin refresh** — uses custom DOM events (`articles-refresh`) so the public page refreshes without direct coupling to the admin

## Verification
- ESLint passes (0 new errors; 2 pre-existing in header.tsx/info-widgets.tsx)
- Dev server compiles and serves `/` with `200` status
- `/api/articles` endpoint returns published articles from the database
- Prisma queries confirmed in dev logs (filtered by `published`, ordered by `createdAt DESC`)
