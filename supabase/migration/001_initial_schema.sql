-- ============================================================
-- CAMPUS MARKETPLACE
-- Initial Database Schema
-- ============================================================

-- ============================================================
-- 1. ENUM TYPES
-- ============================================================

-- Fixed categories for marketplace listings.
create type public.listing_category as enum (
  'electronics',
  'books',
  'clothing',
  'furniture',
  'school_supplies',
  'vehicles_rides',
  'other'
);

-- Listing availability status.
create type public.listing_status as enum (
  'available',
  'sold'
);


-- ============================================================
-- 2. PROFILES TABLE
-- ============================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  name text not null,

  avatar_url text,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);


-- ============================================================
-- 3. LISTINGS TABLE
-- ============================================================

create table public.listings (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  title text not null,

  description text not null,

  price numeric(12, 2) not null
    check (price >= 0),

  category public.listing_category not null,

  image_url text,

  status public.listing_status not null default 'available',

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);


-- ============================================================
-- 4. INDEXES
-- ============================================================

-- Quickly find listings belonging to a particular user.
create index listings_user_id_idx
on public.listings(user_id);

-- Quickly filter listings by category.
create index listings_category_idx
on public.listings(category);

-- Quickly filter listings by status.
create index listings_status_idx
on public.listings(status);

-- Quickly sort/filter by price.
create index listings_price_idx
on public.listings(price);

-- Quickly sort listings by newest.
create index listings_created_at_idx
on public.listings(created_at desc);


-- ============================================================
-- 5. AUTOMATIC PROFILE CREATION
-- ============================================================

-- This function creates a profile automatically whenever
-- a new user is created in Supabase Auth.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    name
  )
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'name',
      'New User'
    )
  );

  return new;
end;
$$;


-- Create the trigger that calls the function after signup.
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();


-- ============================================================
-- 6. UPDATED_AT FUNCTION
-- ============================================================

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- Update profiles.updated_at automatically.
create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute procedure public.handle_updated_at();


-- Update listings.updated_at automatically.
create trigger listings_updated_at
  before update on public.listings
  for each row
  execute procedure public.handle_updated_at();


-- ============================================================
-- 7. ENABLE ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;

alter table public.listings enable row level security;


-- ============================================================
-- 8. PROFILE RLS POLICIES
-- ============================================================

-- Users can view their own profile.
create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (
  auth.uid() = id
);


-- Users can update their own profile.
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (
  auth.uid() = id
)
with check (
  auth.uid() = id
);


-- ============================================================
-- 9. LISTING RLS POLICIES
-- ============================================================

-- Anyone, including unauthenticated visitors, can view listings.
create policy "Anyone can view listings"
on public.listings
for select
to anon, authenticated
using (
  true
);


-- Authenticated users can create listings.
-- The user_id must belong to the currently signed-in user.
create policy "Users can create their own listings"
on public.listings
for insert
to authenticated
with check (
  auth.uid() = user_id
);


-- Users can update only their own listings.
create policy "Users can update their own listings"
on public.listings
for update
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);


-- Users can delete only their own listings.
create policy "Users can delete their own listings"
on public.listings
for delete
to authenticated
using (
  auth.uid() = user_id
);


-- ============================================================
-- END OF SCHEMA
-- ============================================================