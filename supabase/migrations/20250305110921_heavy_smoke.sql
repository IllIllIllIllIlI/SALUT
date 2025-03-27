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
  status text CHECK (status IN ('active', 'resolved', 'closed')) NOT NULL DEFAULT 'active',
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
-- Users can read any SOS post
CREATE POLICY "Users can read any SOS post"
  ON sos_posts
  FOR SELECT
  TO authenticated
  USING (true);

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

-- Users can read any SOS updates
CREATE POLICY "Users can read any SOS updates"
  ON sos_updates
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can create updates for their own SOS posts
CREATE POLICY "Users can create updates for their own SOS posts"
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

-- Users can read helpers
CREATE POLICY "Users can read helpers"
  ON sos_helpers
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can manage their own help offers
CREATE POLICY "Users can manage their own help offers"
  ON sos_helpers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create function to notify users in the same area
CREATE OR REPLACE FUNCTION notify_nearby_users()
RETURNS TRIGGER AS $$
BEGIN
  -- In a real implementation, this would trigger push notifications
  -- to users in the same city/region based on severity level
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for notifications on new SOS posts
CREATE TRIGGER on_sos_post_create
  AFTER INSERT ON sos_posts
  FOR EACH ROW
  EXECUTE FUNCTION notify_nearby_users();