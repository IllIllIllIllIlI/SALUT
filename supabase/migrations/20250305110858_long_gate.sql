/*
  # Create SOS tables

  1. New Tables
    - `sos_posts`
      - `id` (uuid, primary key)
      - `author_id` (uuid, foreign key)
      - `title` (text)
      - `description` (text)
      - `severity` (integer) - 1-10 scale
      - `category` (text)
      - `city` (text)
      - `region` (text)
      - `status` (text) - 'active', 'resolved', 'closed'
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `sos_updates`
      - `id` (uuid, primary key)
      - `sos_id` (uuid, foreign key)
      - `content` (text)
      - `created_at` (timestamp)
    
    - `sos_helpers`
      - `sos_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create sos_posts table
CREATE TABLE IF NOT EXISTS sos_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  severity integer CHECK (severity BETWEEN 1 AND 10) NOT NULL,
  category text NOT NULL,
  city text NOT NULL,
  region text NOT NULL,
  status text CHECK (status IN ('active', 'resolved', 'closed')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sos_updates table
CREATE TABLE IF NOT EXISTS sos_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sos_id uuid REFERENCES sos_posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create sos_helpers table
CREATE TABLE IF NOT EXISTS sos_helpers (
  sos_id uuid REFERENCES sos_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (sos_id, user_id)
);

-- Enable RLS
ALTER TABLE sos_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_helpers ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read SOS posts in their region
CREATE POLICY "Users can read SOS posts in their region"
  ON sos_posts
  FOR SELECT
  TO authenticated
  USING (
    region IN (
      SELECT region FROM users WHERE id = auth.uid()
    )
  );

-- Users can create SOS posts
CREATE POLICY "Users can create SOS posts"
  ON sos_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Users can update their own SOS posts
CREATE POLICY "Users can update their own SOS posts"
  ON sos_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Users can read updates for accessible SOS posts
CREATE POLICY "Users can read updates for accessible SOS posts"
  ON sos_updates
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sos_posts
      WHERE sos_posts.id = sos_updates.sos_id
      AND sos_posts.region IN (
        SELECT region FROM users WHERE id = auth.uid()
      )
    )
  );

-- Authors can create updates for their SOS posts
CREATE POLICY "Authors can create updates for their SOS posts"
  ON sos_updates
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sos_posts
      WHERE sos_posts.id = sos_updates.sos_id
      AND sos_posts.author_id = auth.uid()
    )
  );

-- Users can read helpers for accessible SOS posts
CREATE POLICY "Users can read helpers for accessible SOS posts"
  ON sos_helpers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sos_posts
      WHERE sos_posts.id = sos_helpers.sos_id
      AND sos_posts.region IN (
        SELECT region FROM users WHERE id = auth.uid()
      )
    )
  );

-- Users can manage their own helper status
CREATE POLICY "Users can manage their own helper status"
  ON sos_helpers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);