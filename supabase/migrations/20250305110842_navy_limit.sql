/*
  # Create posts and related tables

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `author_id` (uuid, foreign key)
      - `content` (text)
      - `community_id` (uuid, foreign key, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `post_media`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key)
      - `url` (text)
      - `type` (text) - 'image' or 'video'
      - `created_at` (timestamp)
    
    - `post_reactions`
      - `post_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `type` (text) - 'like', 'bookmark'
      - `created_at` (timestamp)
    
    - `post_stats`
      - `post_id` (uuid, foreign key)
      - `likes_count` (integer)
      - `comments_count` (integer)
      - `shares_count` (integer)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  community_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create post_media table
CREATE TABLE IF NOT EXISTS post_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  url text NOT NULL,
  type text CHECK (type IN ('image', 'video')) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create post_reactions table
CREATE TABLE IF NOT EXISTS post_reactions (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text CHECK (type IN ('like', 'bookmark')) NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, user_id, type)
);

-- Create post_stats table
CREATE TABLE IF NOT EXISTS post_stats (
  post_id uuid PRIMARY KEY REFERENCES posts(id) ON DELETE CASCADE,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read any post
CREATE POLICY "Users can read any post"
  ON posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can create posts
CREATE POLICY "Users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Users can update their own posts
CREATE POLICY "Users can update their own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete their own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Users can read any post media
CREATE POLICY "Users can read any post media"
  ON post_media
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can manage media for their own posts
CREATE POLICY "Users can manage media for their own posts"
  ON post_media
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_media.post_id
      AND posts.author_id = auth.uid()
    )
  );

-- Users can read any post reactions
CREATE POLICY "Users can read any post reactions"
  ON post_reactions
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can manage their own reactions
CREATE POLICY "Users can manage their own reactions"
  ON post_reactions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can read any post stats
CREATE POLICY "Users can read any post stats"
  ON post_stats
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update post stats
CREATE OR REPLACE FUNCTION update_post_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update likes count
  UPDATE post_stats
  SET 
    likes_count = (
      SELECT COUNT(*) FROM post_reactions 
      WHERE post_id = NEW.post_id AND type = 'like'
    ),
    updated_at = now()
  WHERE post_id = NEW.post_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating stats on reaction changes
CREATE TRIGGER on_reaction_change
  AFTER INSERT OR DELETE ON post_reactions
  FOR EACH ROW
  EXECUTE FUNCTION update_post_stats();

-- Create trigger to initialize post stats
CREATE OR REPLACE FUNCTION initialize_post_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO post_stats (post_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_post_create
  AFTER INSERT ON posts
  FOR EACH ROW
  EXECUTE FUNCTION initialize_post_stats();