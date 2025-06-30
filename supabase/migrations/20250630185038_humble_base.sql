/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `subject` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamp with time zone, default: now())
      - `status` (text, default: 'new')
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for service role to manage submissions
*/

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to manage submissions
CREATE POLICY "Service role can manage contact submissions"
  ON contact_submissions
  FOR ALL
  TO service_role
  USING (true);

-- Create policy for anon/authenticated users to insert only
CREATE POLICY "Users can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);