/*
  # Create whiskeys table and setup security

  1. New Tables
    - `whiskeys`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `type` (text, required)
      - `origin` (text, required)
      - `price` (numeric, required)
      - `rating` (numeric, required)
      - `age` (text)
      - `abv` (numeric, required)
      - `image_url` (text, required)
      - `excerpt` (text, required)
      - `featured` (boolean)
      - `full_review` (text)
      - `review_date` (timestamptz)
      - `character` (numeric, required)
      - `complexity` (numeric, required)
      - `balance` (numeric, required)
      - `finish` (numeric, required)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage whiskeys
*/

-- Create whiskeys table
CREATE TABLE whiskeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  origin text NOT NULL,
  price numeric NOT NULL,
  rating numeric NOT NULL,
  age text,
  abv numeric NOT NULL,
  image_url text NOT NULL,
  excerpt text NOT NULL,
  featured boolean DEFAULT false,
  full_review text,
  review_date timestamptz DEFAULT now(),
  character numeric NOT NULL,
  complexity numeric NOT NULL,
  balance numeric NOT NULL,
  finish numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE whiskeys ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON whiskeys
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create"
  ON whiskeys
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update"
  ON whiskeys
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete"
  ON whiskeys
  FOR DELETE
  TO authenticated
  USING (true);

-- Create aromas table
CREATE TABLE aromas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  whiskey_id uuid REFERENCES whiskeys(id) ON DELETE CASCADE,
  name text NOT NULL,
  strength numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for aromas
ALTER TABLE aromas ENABLE ROW LEVEL SECURITY;

-- Create policies for aromas
CREATE POLICY "Allow public read access on aromas"
  ON aromas
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage aromas"
  ON aromas
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);