import { Suspense } from 'react';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import RecipeStats from './RecipeStats';
import { getUserReviewForRecipe, getRecipeReviews, getRecipeStats } from '@/app/lib/functions';
import type { RecipeReview, RecipeStats as RecipeStatsType } from '@/app/lib/types';

interface ReviewsSectionProps {
  recipeId: string;
  currentUserEmail?: string;
}

async function ReviewsContent({ recipeId, currentUserEmail }: ReviewsSectionProps) {
  const [reviews, stats, userReview] = await Promise.all([
    getRecipeReviews(recipeId),
    getRecipeStats(recipeId),
    currentUserEmail ? getUserReviewForRecipe(recipeId, currentUserEmail) : null
  ]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>
      
      {/* Recipe Statistics */}
      {stats && stats.total_reviews > 0 && (
        <RecipeStats stats={stats} />
      )}

      {/* Review Form */}
      {currentUserEmail && !userReview && (
        <ReviewForm 
          recipeId={recipeId} 
        />
      )}

      {/* User's Existing Review */}
      {userReview && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Your Review</h3>
          <ReviewCard 
            review={userReview} 
            recipeId={recipeId}
            currentUserEmail={currentUserEmail}
          />
        </div>
      )}

      {/* All Reviews */}
      {reviews.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            All Reviews ({reviews.length})
          </h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                recipeId={recipeId}
                currentUserEmail={currentUserEmail}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No reviews yet. Be the first to review this recipe!</p>
        </div>
      )}
    </div>
  );
}

export default function ReviewsSection({ recipeId, currentUserEmail }: ReviewsSectionProps) {
  return (
    <Suspense fallback={
      <div className="animate-pulse">
        <div className="bg-gray-200 h-32 rounded-lg mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    }>
      <ReviewsContent recipeId={recipeId} currentUserEmail={currentUserEmail} />
    </Suspense>
  );
}