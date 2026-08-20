-- ============================================================
-- Add profile fields for the profile page
-- ============================================================

alter table public.profiles
  add column if not exists phone_number text,
  add column if not exists major text,
  add column if not exists bio text,
  add column if not exists graduation_year text;
