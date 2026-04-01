@AGENTS.md

# LinkedIn Post App — Claude Code Instructions

## Quick Reference

- **Framework**: Next.js 16.2.1 (App Router) — check `node_modules/next/dist/docs/` before using any API
- **React**: 19.2.4 (Server Components by default)
- **Styling**: Tailwind CSS v4 (inline `@theme`, NOT config file)
- **Language**: TypeScript 5.x (strict mode)
- **Linting**: ESLint 9.x (flat config)
- **Path alias**: `@/*` maps to `./src/*`

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Agents

Specialized agents in `.claude/agents/`:

| Agent | When to Use |
|-------|-------------|
| `frontend` | UI components, pages, styling, accessibility |
| `backend` | API routes, server actions, auth, middleware |
| `testing` | Unit/integration/E2E tests |
| `reviewer` | Code review, security audit, quality check |
| `devops` | CI/CD, Docker, deployment, env management |
| `database` | Schema design, migrations, queries, ORM |

## Rules

1. Read Next.js docs at `node_modules/next/dist/docs/` before using any Next.js API
2. Server Components by default — only add `'use client'` when interactivity is needed
3. No `any` types, no `@ts-ignore`, no `console.log` in production code
4. Validate all inputs at system boundaries (API routes, forms)
5. Never expose secrets — `NEXT_PUBLIC_` prefix only for browser-safe values
6. Run `npm run lint` and `npm run build` before considering work done
