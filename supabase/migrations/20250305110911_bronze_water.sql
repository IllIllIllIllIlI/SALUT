/*
  # Create premium subscription tables

  1. New Tables
    - `premium_subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `stripe_customer_id` (text)
      - `stripe_subscription_id` (text)
      - `plan` (text) - 'monthly' or 'yearly'
      - `status` (text)
      - `current_period_end` (timestamp)
      - `cancel_at_period_end` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `ai_message_usage`
      - `user_id` (uuid, foreign key)
      - `messages_used` (integer)
      - `reset_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create premium_subscriptions table
CREATE TABLE IF NOT EXISTS premium_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  plan text CHECK (plan IN ('monthly', 'yearly')) NOT NULL,
  status text NOT NULL,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ai_message_usage table
CREATE TABLE IF NOT EXISTS ai_message_usage (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  messages_used integer DEFAULT 0,
  reset_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE premium_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_message_usage ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read their own subscription
CREATE POLICY "Users can read their own subscription"
  ON premium_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can read their own AI message usage
CREATE POLICY "Users can read their own AI message usage"
  ON ai_message_usage
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to initialize AI message usage
CREATE OR REPLACE FUNCTION initialize_ai_message_usage()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO ai_message_usage (user_id, reset_at)
  VALUES (NEW.id, date_trunc('month', now()) + interval '1 month');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to initialize AI message usage for new users
CREATE TRIGGER on_user_create
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_ai_message_usage();

-- Create function to reset monthly AI message usage
CREATE OR REPLACE FUNCTION reset_monthly_ai_message_usage()
RETURNS void AS $$
BEGIN
  UPDATE ai_message_usage
  SET 
    messages_used = 0,
    reset_at = date_trunc('month', now()) + interval '1 month',
    updated_at = now()
  WHERE reset_at <= now();
END;
$$ LANGUAGE plpgsql;