-- Create recipe_reviews table for the rating and review system
CREATE TABLE IF NOT EXISTS recipe_reviews (
    id VARCHAR(255) PRIMARY KEY,
    recipe_id VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_image TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    photos JSONB DEFAULT '[]',
    helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipe_reviews_recipe_id ON recipe_reviews(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_reviews_user_email ON recipe_reviews(user_email);
CREATE INDEX IF NOT EXISTS idx_recipe_reviews_created_at ON recipe_reviews(created_at DESC);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_recipe_reviews_updated_at ON recipe_reviews;
CREATE TRIGGER update_recipe_reviews_updated_at 
    BEFORE UPDATE ON recipe_reviews 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();