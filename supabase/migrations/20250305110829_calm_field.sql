/*
  # Create users table and related tables

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Links to Supabase Auth user
      - `username` (text, unique)
      - `display_name` (text)
      - `avatar_url` (text)
      - `bio` (text)
      - `city` (text)
      - `region` (text)
      - `website` (text)
      - `is_verified` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_stats`
      - `user_id` (uuid, foreign key)
      - `posts_count` (integer)
      - `followers_count` (integer)
      - `following_count` (integer)
      - `communities_count` (integer)
      - `updated_at` (timestamp)
    
    - `user_follows`
      - `follower_id` (uuid, foreign key)
      - `following_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  bio text,
  city text,
  region text,
  website text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  posts_count integer DEFAULT 0,
  followers_count integer DEFAULT 0,
  following_count integer DEFAULT 0,
  communities_count integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create user_follows table
CREATE TABLE IF NOT EXISTS user_follows (
  follower_id uuid REFERENCES users(id) ON DELETE CASCADE,
  following_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (follower_id, following_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_follows ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read any user profile
CREATE POLICY "Users can read any user profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can read any user stats
CREATE POLICY "Users can read any user stats"
  ON user_stats
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can read follows
CREATE POLICY "Users can read follows"
  ON user_follows
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can manage their own follows
CREATE POLICY "Users can manage their own follows"
  ON user_follows
  FOR ALL
  TO authenticated
  USING (auth.uid() = follower_id)
  WITH CHECK (auth.uid() = follower_id);

-- Create function to update user stats
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update followers count
  UPDATE user_stats
  SET followers_count = (
    SELECT COUNT(*) FROM user_follows WHERE following_id = NEW.following_id
  )
  WHERE user_id = NEW.following_id;
  
  -- Update following count
  UPDATE user_stats
  SET following_count = (
    SELECT COUNT(*) FROM user_follows WHERE follower_id = NEW.follower_id
  )
  WHERE user_id = NEW.follower_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating stats on follow/unfollow
CREATE TRIGGER on_follow_change
  AFTER INSERT OR DELETE ON user_follows
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats();