# PostFlow — AI-Powered LinkedIn Post Generator

A premium LinkedIn post dashboard that **auto-generates** engaging posts using Claude AI, based on diverse trending professional topics. Browse, search, copy, and manage your generated post collection.

## Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | Next.js 15+ (App Router)            |
| Language     | TypeScript (strict, no `any`)       |
| Styling      | Tailwind CSS 4                      |
| Animation    | Motion for React (`motion/react`)   |
| Database     | Supabase Postgres                   |
| Storage      | Supabase Storage (image uploads)    |
| AI           | Claude API (Anthropic SDK)          |
| Images       | Lorem Picsum (auto-matched)         |
| Testing      | Vitest + React Testing Library      |
| Package Mgr  | pnpm                                |

## Features

- **AI Post Generation** — Auto-generates LinkedIn posts using Claude, based on 20+ diverse topic categories (leadership, hiring, design, sales, career growth, mental health, side projects, etc.)
- **Trending Topics** — Each refresh picks a random professional topic for variety
- **Custom Topics** — Optionally type your own topic to generate about
- **Auto-Save** — Every generated post is automatically saved to Supabase
- **Copy to Clipboard** — One-click copy button on every post (preview + detail page)
- **Post Images** — Auto-attached stock images matched to each post topic
- **Dashboard** — Stats cards (total, drafts, scheduled, published) + full post list with search, status filters, and sorting
- **Post Detail** — View, edit, or delete any post
- **LinkedIn Preview** — Posts render in a LinkedIn-style card format

## Pages

| Route           | Description                                           |
| --------------- | ----------------------------------------------------- |
| `/`             | Dashboard — stats + searchable/filterable post list   |
| `/posts/new`    | Generate — AI post generator with live preview        |
| `/posts/[id]`   | Post detail — view, copy, edit, delete                |

## Setup

### 1. Clone and install

```bash
git clone https://github.com/rishat5081/linkedin-post.git
cd linkedin-post
pnpm install
```

### 2. Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql` to create the `posts` table
3. Optionally run `supabase/seed.sql` to insert 10 sample LinkedIn posts
4. Go to **Storage** and create a public bucket named `post-images`

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

| Variable                        | Where to find it                              |
| ------------------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase Dashboard → Settings → API           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API (anon key)|
| `ANTHROPIC_API_KEY`             | [console.anthropic.com](https://console.anthropic.com) → API Keys |

### 4. Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to run tests

```bash
pnpm test          # Run all tests
pnpm test:watch    # Watch mode
pnpm test:coverage # With coverage report
```

**54 tests** covering:
- Utility functions — hashtag parsing, date formatting, post filtering, stats calculation, truncation
- Component rendering — Badge, StatCard, PostPreview
- Behavioral assertions — filter by status/search, empty states, edge cases

## Supabase Schema

```sql
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  hook text not null,
  body text not null,
  cta text,
  hashtags text[] not null default '{}',
  image_urls text[] not null default '{}',
  status text not null default 'draft'
    check (status in ('draft', 'scheduled', 'published')),
  scheduled_for timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Full schema with triggers: [`supabase/schema.sql`](./supabase/schema.sql)

## Project Structure

```
src/
├── app/
│   ├── api/generate/route.ts     # Claude AI post generation endpoint
│   ├── (dashboard)/
│   │   ├── layout.tsx            # AppShell with sidebar
│   │   ├── page.tsx              # Dashboard (stats + post list)
│   │   ├── dashboard-client.tsx
│   │   └── posts/
│   │       ├── new/page.tsx      # AI post generator
│   │       └── [id]/
│   │           ├── page.tsx      # Post detail (server)
│   │           └── post-detail-client.tsx
│   ├── layout.tsx                # Root layout
│   └── globals.css
├── components/
│   ├── ui/                       # Button, Input, Badge, Card, SearchBar, etc.
│   ├── layout/                   # AppShell, Sidebar, PageHeader
│   ├── dashboard/                # StatCard, FeaturedPost, RecentPosts
│   ├── posts/                    # PostPreview, PostForm, HistoryList, etc.
│   └── motion/                   # FadeIn, StaggerGroup, AnimatedPanel, etc.
├── lib/
│   ├── supabase/                 # Client + storage helpers
│   ├── posts/                    # CRUD actions (getPosts, createPost, etc.)
│   ├── utils/                    # Hashtags, dates, post helpers
│   ├── constants/                # Status options, colors, app config
│   └── data/                     # Seed data (TypeScript)
├── types/                        # Post, PostFormData, PostStats, PostFilters
└── test/                         # Vitest setup
```

## Design

Inspired by Linear, Sanity, Clerk, and 21st.dev:

- Content-first layout with generous whitespace
- Geist font family for expressive typography
- Neutral zinc palette — no generic purple AI styling
- Subtle layered cards with refined borders and shadows
- Dark mode via `prefers-color-scheme`
- Sidebar navigation with animated active indicator

## Motion

Motion for React used intentionally:

- **FadeIn** — page-level reveal with directional variants
- **StaggerGroup / StaggerItem** — cascading card and chip entrances
- **AnimatedListItem** — staggered list entries with hover lift
- **AnimatedPanel** — spring transitions for panels
- **Sidebar** — shared layout animation (`layoutId`)
- **Buttons** — subtle scale on hover/tap
- **`prefers-reduced-motion`** — all animations disabled for accessibility

## Next Steps

- [ ] Add RLS (Row Level Security) policies for production
- [ ] User authentication (Supabase Auth or Clerk)
- [ ] LinkedIn API integration for direct publishing
- [ ] AI image generation (DALL-E 3) instead of stock photos
- [ ] Analytics dashboard (impressions, engagement tracking)
- [ ] Playwright end-to-end tests
- [ ] Mobile-responsive sidebar (hamburger menu)
- [ ] Scheduling via cron/edge function
