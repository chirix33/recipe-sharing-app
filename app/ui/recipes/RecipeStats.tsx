"use client";

import StarRating from './StarRating';
import type { RecipeStats } from '@/app/lib/types';

interface RecipeStatsProps {
  stats: RecipeStats;
}

export default function RecipeStats({ stats }: RecipeStatsProps) {
  const { average_rating, total_reviews, rating_distribution } = stats;

  const getPercentage = (count: number) => {
    return total_reviews > 0 ? (count / total_reviews) * 100 : 0;
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Average';
    if (rating >= 2.0) return 'Below Average';
    return 'Poor';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {average_rating.toFixed(1)}
          </div>
          <StarRating rating={average_rating} size="lg" />
          <p className="text-lg font-medium text-gray-700 mt-2">
            {getRatingText(average_rating)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Based on {total_reviews} review{total_reviews !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Rating Distribution */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Rating Distribution</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 w-2">
                  {star}
                </span>
                <StarRating rating={1} size="sm" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getPercentage(rating_distribution[star as keyof typeof rating_distribution])}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">
                  {rating_distribution[star as keyof typeof rating_distribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}