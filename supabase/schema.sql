-- PostFlow: LinkedIn Post Dashboard Schema
-- Run this in Supabase SQL Editor to set up the database

create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  hook text not null,
  body text not null,
  cta text,
  hashtags text[] not null default '{}',
  image_urls text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published')),
  scheduled_for timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at on row changes
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;

create trigger posts_set_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();

-- Storage bucket for post images
-- Run this via Supabase Dashboard > Storage > New Bucket
-- Bucket name: post-images
-- Public: true
