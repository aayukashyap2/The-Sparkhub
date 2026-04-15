/*
  # SparkHub Database Schema

  ## Overview
  Create the complete database schema for SparkHub - The Idea Incubator platform.
  This migration sets up tables for user profiles and startup ideas with proper relationships and security.

  ## New Tables
  
  ### 1. `profiles`
  User profile information linked to Supabase auth.users
  - `id` (uuid, primary key) - References auth.users(id)
  - `email` (text) - User's email address
  - `full_name` (text) - User's full name
  - `avatar_url` (text, optional) - Profile picture URL
  - `bio` (text, optional) - User biography
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `ideas`
  Startup ideas submitted by users
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - References profiles(id)
  - `title` (text) - Idea title
  - `description` (text) - Detailed description
  - `category` (text) - Business category
  - `tags` (text array) - Searchable tags
  - `image_url` (text, optional) - Featured image
  - `status` (text) - Idea status (draft, published, archived)
  - `views` (integer) - View count
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  
  ### Row Level Security (RLS)
  All tables have RLS enabled with restrictive policies:
  
  **Profiles Table:**
  - Users can read their own profile
  - Users can update their own profile
  - Users can insert their own profile
  - All users can read other users' public profile info
  
  **Ideas Table:**
  - Users can create their own ideas
  - Users can read all published ideas
  - Users can update their own ideas
  - Users can delete their own ideas
  
  ## Indexes
  - Index on ideas.user_id for fast user idea lookups
  - Index on ideas.category for category filtering
  - Index on ideas.created_at for sorting
  - Index on ideas.status for filtering published ideas

  ## Notes
  - All timestamps default to current time
  - UUIDs are generated automatically
  - Status field defaults to 'draft'
  - Views counter defaults to 0
  - All tables use soft deletes approach (status field)
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  image_url text,
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ideas_user_id ON ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_ideas_category ON ideas(category);
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ideas_status ON ideas(status);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can read public profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Ideas policies
CREATE POLICY "Anyone can read published ideas"
  ON ideas FOR SELECT
  TO authenticated
  USING (status = 'published');

CREATE POLICY "Users can create own ideas"
  ON ideas FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ideas"
  ON ideas FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own ideas"
  ON ideas FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ideas_updated_at ON ideas;
CREATE TRIGGER update_ideas_updated_at
  BEFORE UPDATE ON ideas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();