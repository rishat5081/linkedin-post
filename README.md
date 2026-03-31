<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-strict-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Claude_AI-Powered-F97316?style=for-the-badge&logo=anthropic" />
  <img src="https://img.shields.io/badge/Supabase-Postgres-3FCF8E?style=for-the-badge&logo=supabase" />
  <img src="https://img.shields.io/github/actions/workflow/status/rishat5081/linkedin-post/ci.yml?style=for-the-badge&label=CI" />
</p>

<h1 align="center">🚀 PostFlow</h1>
<p align="center"><strong>AI-Powered LinkedIn Post Generator & Dashboard</strong></p>
<p align="center">
  Generate scroll-stopping LinkedIn posts in one click. Powered by Claude AI, styled like a premium SaaS product.
</p>

---

## ✨ What It Does

PostFlow generates **high-quality LinkedIn posts** using Claude AI across 20+ diverse professional topics — from leadership and hiring to open source, mental health, and founder stories. Every post is auto-saved, comes with a matched stock image, and renders in a pixel-perfect LinkedIn-style preview.

**One click. One post. Ready to publish.**

---

## 🎯 Features

| | Feature | Description |
|---|---------|-------------|
| 🤖 | **AI Generation** | Claude crafts engaging posts from 20+ topic categories |
| 🎲 | **Topic Roulette** | Each refresh picks a random professional topic for variety |
| ✏️ | **Custom Topics** | Type your own topic to generate targeted content |
| 💾 | **Auto-Save** | Every generated post instantly saved to Supabase |
| 📋 | **Copy to Clipboard** | One-click copy on every post — preview & detail pages |
| 🖼️ | **Auto Images** | Stock images matched to each post's topic keyword |
| 📊 | **Dashboard** | Stats cards + full post list with search, filters, sorting |
| 👁️ | **LinkedIn Preview** | Posts render in a realistic LinkedIn card format |
| ✏️ | **Edit & Delete** | Full CRUD on every post |
| 🎬 | **Motion Design** | Smooth animations via Motion for React |

---

## 🗺️ Pages

| Route | Description |
|-------|-------------|
| `/` | 📊 Dashboard — stats + searchable/filterable post list |
| `/posts/new` | 🤖 Generate — AI post generator with live preview |
| `/posts/[id]` | 👁️ Post detail — view, copy, edit, delete |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ⚡ Framework | Next.js 15+ (App Router) |
| 🔷 Language | TypeScript (strict, zero `any`) |
| 🎨 Styling | Tailwind CSS v4 |
| 🎬 Animation | Motion for React (`motion/react`) |
| 🗄️ Database | Supabase Postgres |
| 🧠 AI | Claude API (`@anthropic-ai/sdk`) |
| 🖼️ Images | Lorem Picsum (auto-matched) |
| 🧪 Testing | Vitest + React Testing Library |
| 📦 Package Manager | pnpm |

---

## ⚡ Quick Start

### 1️⃣ Clone & Install

```bash
git clone https://github.com/rishat5081/linkedin-post.git
cd linkedin-post
pnpm install
```

### 2️⃣ Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the **SQL Editor** to create the `posts` table
3. *(Optional)* Run `supabase/seed.sql` to insert 10 sample posts
4. Create a public Storage bucket named `post-images`

### 3️⃣ Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API (anon key) |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys |

### 4️⃣ Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🧪 Testing

```bash
pnpm test          # Run all 54 tests
pnpm test:watch    # Watch mode
pnpm test:coverage # With coverage report
```

**54 tests** covering utilities (hashtag parsing, date formatting, filtering, stats, truncation) and components (Badge, StatCard, PostPreview).

---

## 🏗️ CI/CD

GitHub Actions runs on every push and PR to `main`:

| Job | What it does |
|-----|-------------|
| 🔍 **Lint** | ESLint checks |
| 🔷 **Type Check** | `tsc --noEmit` strict validation |
| 🧪 **Test** | Vitest runs all 54 tests |
| 📦 **Build** | Full Next.js production build |

---

## 🗃️ Database Schema

```sql
create table public.posts (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  hook          text not null,
  body          text not null,
  cta           text,
  hashtags      text[] not null default '{}',
  image_urls    text[] not null default '{}',
  status        text not null default 'draft'
                  check (status in ('draft', 'scheduled', 'published')),
  scheduled_for timestamptz,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
```

Full schema with triggers → [`supabase/schema.sql`](./supabase/schema.sql)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/generate/route.ts        # 🧠 Claude AI post generation
│   ├── (dashboard)/
│   │   ├── layout.tsx               # AppShell with sidebar
│   │   ├── page.tsx                 # 📊 Dashboard (stats + post list)
│   │   ├── dashboard-client.tsx
│   │   └── posts/
│   │       ├── new/page.tsx         # 🤖 AI post generator
│   │       └── [id]/
│   │           ├── page.tsx         # 👁️ Post detail (server)
│   │           └── post-detail-client.tsx
│   ├── layout.tsx                   # Root layout
│   └── globals.css
├── components/
│   ├── ui/                          # Button, Input, Badge, Card, SearchBar…
│   ├── layout/                      # AppShell, Sidebar, PageHeader
│   ├── dashboard/                   # StatCard, FeaturedPost, RecentPosts
│   ├── posts/                       # PostPreview, HistoryList, PostForm…
│   └── motion/                      # FadeIn, StaggerGroup, AnimatedPanel…
├── lib/
│   ├── supabase/                    # Client + storage helpers
│   ├── posts/                       # CRUD actions
│   ├── utils/                       # Hashtags, dates, post helpers
│   ├── constants/                   # Config, status options, colors
│   └── data/                        # Seed data (TypeScript)
├── types/                           # Post, PostFormData, PostStats, PostFilters
└── test/                            # Vitest setup
```

---

## 🎨 Design Philosophy

Inspired by **Linear**, **Sanity**, **Clerk**, and **21st.dev**:

- 📐 Content-first layout with generous whitespace
- 🔤 Geist font family for expressive typography
- 🎨 Neutral zinc palette — no generic purple AI styling
- 🪟 Subtle layered cards with refined borders and shadows
- 🌙 Dark mode via `prefers-color-scheme`
- 🧭 Sidebar navigation with animated active indicator

---

## 🎬 Motion & Animation

Motion for React used with intention, not decoration:

- **FadeIn** — page-level reveal with directional variants
- **StaggerGroup** — cascading card and chip entrances
- **AnimatedListItem** — staggered list entries with hover lift
- **AnimatedPanel** — spring transitions for panels
- **Sidebar** — shared layout animation (`layoutId`)
- **Buttons** — subtle scale on hover/tap
- **`prefers-reduced-motion`** — all animations respect accessibility

---

<p align="center">
  Built with 🧠 Claude AI &nbsp;·&nbsp; ⚡ Next.js &nbsp;·&nbsp; 💚 Supabase
</p>
<p align="center">
  <sub>Made by <a href="https://github.com/rishat5081">@rishat5081</a></sub>
</p>
