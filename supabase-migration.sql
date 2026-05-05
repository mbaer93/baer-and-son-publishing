-- Run this in the Supabase SQL Editor for the main project
-- https://supabase.com/dashboard/project/vmkexipeczllifkrnnqf/sql

CREATE TABLE IF NOT EXISTS book_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  author_name text NOT NULL,
  email text NOT NULL,
  phone text,
  book_title text NOT NULL,
  genre text,
  word_count text,
  synopsis text,
  manuscript_path text,
  cover_art_path text,
  how_heard text,
  rights_confirmed boolean DEFAULT false,
  status text DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE book_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access" ON book_submissions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON contact_messages
  FOR ALL TO service_role USING (true) WITH CHECK (true);
