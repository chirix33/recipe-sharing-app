# Recipe Rating & Review System

This document describes the new rating and review system implemented for the RecipeShare platform.

## Features

### 🌟 **Star Rating System**
- Interactive 5-star rating system
- Visual feedback with filled/outlined stars
- Hover effects for better user experience
- Displays average ratings and rating distribution

### 📝 **Review System**
- Users can write detailed reviews with titles and comments
- Photo upload support (up to 3 photos per review)
- Review validation and error handling
- Users can only submit one review per recipe

### 📊 **Recipe Statistics**
- Average rating calculation
- Total review count
- Rating distribution (1-5 stars)
- Visual progress bars for rating breakdown

### 👍 **Social Features**
- Helpful votes on reviews
- Review deletion (for review authors)
- User profile integration with avatars

## Database Schema

### `recipe_reviews` Table
```sql
CREATE TABLE recipe_reviews (
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
```

## Components

### `StarRating.tsx`
- Reusable star rating component
- Supports interactive and display modes
- Configurable sizes (sm, md, lg)
- Optional rating number display

### `ReviewForm.tsx`
- Form for submitting new reviews
- Photo upload with preview
- Form validation and error handling
- Server action integration

### `ReviewCard.tsx`
- Displays individual reviews
- User information and rating
- Photo gallery support
- Helpful voting functionality
- Review deletion for authors

### `RecipeStats.tsx`
- Displays recipe statistics
- Average rating and total reviews
- Rating distribution visualization
- Responsive design

### `ReviewsSection.tsx`
- Main container for all review functionality
- Server component with Suspense
- Handles data loading and display
- Integrates all review components

## API Routes

### `GET /api/reviews?recipeId={id}`
- Fetches all reviews and statistics for a recipe
- Returns reviews array and stats object

### `POST /api/reviews/helpful`
- Updates helpful votes for a review
- Requires authentication
- Body: `{ reviewId, increment }`

## Server Actions

### `submitReview(recipeId, prevState, formData)`
- Handles review submission
- Validates form data
- Uploads photos to Vercel Blob
- Saves review to database

### `voteReviewHelpful(reviewId, increment)`
- Updates helpful vote count
- Revalidates page data

### `deleteReview(reviewId, recipeId)`
- Deletes a review (author only)
- Revalidates page data

## Setup Instructions

1. **Database Setup**
   ```bash
   npm run setup-db
   ```

2. **Environment Variables**
   Ensure you have the following environment variables set:
   - `POSTGRES_URL` - Database connection string
   - `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token

3. **Dependencies**
   All required dependencies are already included in package.json

## Usage

The review system is automatically integrated into recipe detail pages. Users can:

1. **View Reviews**: See all reviews and statistics on recipe pages
2. **Write Reviews**: Submit reviews with ratings, titles, comments, and photos
3. **Vote Helpful**: Mark reviews as helpful
4. **Delete Reviews**: Remove their own reviews

## Future Enhancements

- Review moderation system
- Review sorting and filtering
- Review reporting functionality
- Email notifications for new reviews
- Review analytics dashboard