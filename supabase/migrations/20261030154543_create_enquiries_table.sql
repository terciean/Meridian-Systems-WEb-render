/*
# Create enquiries table (public write-only intake)

1. New Tables
- `enquiries`
  - `id` (uuid, primary key)
  - `service` (text, the solution the visitor chose)
  - `name` (text, required)
  - `email` (text, required)
  - `phone` (text, optional)
  - `business` (text, optional)
  - `answers` (jsonb, the full questionnaire answers)
  - `created_at` (timestamp)

2. Security
- Enable RLS on `enquiries`.
- Visitors (anonymous and signed-in) may only INSERT new enquiries. They cannot read, change or delete any enquiry, so other people's details stay private.
- Length and shape checks on every column limit what can be stored.
- No SELECT grant is given, so the public key cannot list enquiries.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL CHECK (char_length(service) BETWEEN 1 AND 60),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  business text CHECK (business IS NULL OR char_length(business) <= 160),
  answers jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(answers) = 'object' AND pg_column_size(answers) <= 8192),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "public_insert_enquiries" ON enquiries;
CREATE POLICY "public_insert_enquiries" ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
