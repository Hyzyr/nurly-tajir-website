-- Upgrade public.projects table with new fields
-- Run this BEFORE the seed file

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS client       TEXT,
  ADD COLUMN IF NOT EXISTS tags         TEXT[],
  ADD COLUMN IF NOT EXISTS stats        TEXT[],
  ADD COLUMN IF NOT EXISTS location     TEXT,
  ADD COLUMN IF NOT EXISTS completed_at DATE,
  ADD COLUMN IF NOT EXISTS show_in_main BOOLEAN NOT NULL DEFAULT false;
