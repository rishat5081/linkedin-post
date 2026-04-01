<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# LinkedIn Post App — Project Instructions

## Project Overview

A LinkedIn post creation and management application built with:
- **Next.js 16.2.1** (App Router — NOT Pages Router)
- **React 19.2.4** (Server Components by default)
- **TypeScript 5.x** (strict mode)
- **Tailwind CSS v4** (NOT v3 — config is different)
- **ESLint 9.x** (flat config format)

## Critical Rules — Read Before Any Code Change

### 1. Next.js 16.2.1 Specifics
- **ALWAYS** check `node_modules/next/dist/docs/` before using any Next.js API. Your training data is likely outdated.
- App Router ONLY — never create files under a `pages/` directory.
- All components in `src/app/` are **Server Components by default**. Add `'use client'` only when you need browser APIs, event handlers, or React hooks (`useState`, `useEffect`, etc.).
- Use `node_modules/next/dist/docs/01-app/03-api-reference/` for the canonical API reference.
- For data fetching, read `node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md`.
- For mutations/forms, read `node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md`.
- For route handlers (API routes), read `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`.
- For caching, read `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.

### 2. TypeScript Standards
- **Strict mode is ON** — no `any` types, no `@ts-ignore`, no `@ts-expect-error` without a linked issue.
- Prefer `interface` over `type` for object shapes. Use `type` for unions, intersections, and mapped types.
- Export types from a `types.ts` file co-located with the feature, or from `src/types/` for shared types.
- Use `satisfies` operator for type-safe object literals when appropriate.
- Function return types: let TypeScript infer for simple functions, annotate explicitly for public APIs and exports.

### 3. Tailwind CSS v4 — NOT v3
- v4 uses `@theme` inline in CSS, NOT `tailwind.config.js/ts`. There is no config file.
- Theme customization goes in `src/app/globals.css` inside `@theme {}` blocks.
- Use Tailwind utility classes directly. Avoid custom CSS unless absolutely necessary.
- Use CSS variables defined in `globals.css` for colors and spacing tokens.
- Dark mode: use `dark:` variant (system preference via `prefers-color-scheme`).
- Responsive: mobile-first with `sm:`, `md:`, `lg:`, `xl:` breakpoints.

### 4. File & Folder Conventions

```
src/
├── app/                    # Next.js App Router (pages, layouts, API routes)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (/)
│   ├── globals.css         # Global styles + Tailwind @theme
│   ├── (auth)/             # Route group for auth pages
│   ├── dashboard/          # /dashboard route
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── api/                # API route handlers
│       └── posts/
│           └── route.ts
├── components/             # Reusable React components
│   ├── ui/                 # Primitive UI components (Button, Input, Card, etc.)
│   └── features/           # Feature-specific composed components
├── lib/                    # Utility functions, API clients, helpers
├── hooks/                  # Custom React hooks (client-side only)
├── types/                  # Shared TypeScript type definitions
├── constants/              # App-wide constants and config values
└── services/               # Business logic, external API integrations
```

**Naming conventions:**
- Components: `PascalCase.tsx` (e.g., `PostEditor.tsx`)
- Utilities/hooks: `camelCase.ts` (e.g., `usePostForm.ts`, `formatDate.ts`)
- Constants: `SCREAMING_SNAKE_CASE` for values, `camelCase.ts` for filenames
- Route files: always `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`, `not-found.tsx`

### 5. Component Patterns

```tsx
// Server Component (default) — NO 'use client' directive
// Can: fetch data, access backend, use async/await
// Cannot: use hooks, event handlers, browser APIs
export default async function PostList() {
  const posts = await getPosts();
  return <div>{/* render posts */}</div>;
}

// Client Component — MUST have 'use client' directive
'use client';
// Can: use hooks, event handlers, browser APIs
// Cannot: be async, directly access backend
export function PostEditor({ initialData }: PostEditorProps) {
  const [content, setContent] = useState(initialData);
  return <textarea onChange={(e) => setContent(e.target.value)} />;
}
```

**Rules:**
- Push `'use client'` as far down the tree as possible. Wrap only the interactive parts.
- Never put `'use client'` on layout files unless absolutely required.
- Pass server data to client components as props — don't re-fetch on the client.
- Co-locate component-specific types in the same file or a sibling `types.ts`.

### 6. Data Fetching & Mutations

- **Server Components**: fetch directly with `async/await` — no `useEffect`, no client-side fetching for initial data.
- **Server Actions**: use `'use server'` functions for form submissions and mutations.
- **Route Handlers**: `src/app/api/*/route.ts` for webhook endpoints and external API integrations.
- **Client-side fetching**: only for real-time updates, polling, or user-initiated loads after initial render. Use `SWR` or `React Query` if added.

### 7. Error Handling

- Use `error.tsx` boundary files for route-level error handling.
- Use `loading.tsx` for route-level loading states.
- Validate all external input (API requests, form data) at the boundary.
- Use Zod or similar for runtime validation of API payloads and form data.
- Never expose internal errors to users — log details server-side, show generic messages client-side.
- Return proper HTTP status codes from API routes (400, 401, 403, 404, 500).

### 8. Security

- Never expose API keys, secrets, or tokens in client-side code.
- Environment variables: prefix with `NEXT_PUBLIC_` ONLY for values safe to expose to the browser.
- Sanitize all user-generated content before rendering (XSS prevention).
- Use `Content-Security-Policy` headers for production (see `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`).
- Validate and sanitize all inputs on the server side — never trust client data.
- Use parameterized queries for database operations — no string concatenation for SQL.

### 9. Performance

- Prefer Server Components to reduce client bundle size.
- Use `next/image` for all images — never use raw `<img>` tags.
- Use `next/font` for fonts — already configured with Geist.
- Lazy load heavy client components with `next/dynamic` or `React.lazy`.
- Avoid importing large libraries in client components — use tree-shakeable imports.
- Keep API route responses lean — only return needed data.

### 10. Git & Code Quality

- Write clear, descriptive commit messages (imperative mood: "Add post editor", not "Added post editor").
- Run `npm run lint` before committing. Fix all errors, warnings are acceptable only with justification.
- Run `npm run build` to verify no type errors before pushing.
- No commented-out code in commits. Use git history for old code.
- No `console.log` in production code — use a proper logging solution or remove before committing.

---

## Available Agents

Specialized agents are defined in `.claude/agents/` for focused tasks:

| Agent | File | Purpose |
|-------|------|---------|
| Frontend | `frontend.md` | UI components, pages, styling, accessibility, client interactions |
| Backend | `backend.md` | API routes, server actions, auth, data layer, server logic |
| Testing | `testing.md` | Unit tests, integration tests, E2E tests, coverage |
| Reviewer | `reviewer.md` | Code review, quality checks, security audit, performance review |
| DevOps | `devops.md` | CI/CD, deployment, Docker, environment config, infrastructure |
| Database | `database.md` | Schema design, migrations, ORM config, query optimization |

Each agent has strict behavioral rules, best practices, and anti-patterns documented. Invoke the appropriate agent for specialized work.
