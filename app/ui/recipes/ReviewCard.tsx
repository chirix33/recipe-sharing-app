"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ThumbUpIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ThumbUpIcon as ThumbUpIconSolid } from '@heroicons/react/24/solid';
import StarRating from './StarRating';
import { voteReviewHelpful, deleteReview } from '@/app/lib/actions';
import type { RecipeReview } from '@/app/lib/types';

interface ReviewCardProps {
  review: RecipeReview;
  recipeId: string;
  currentUserEmail?: string;
}

export default function ReviewCard({ review, recipeId, currentUserEmail }: ReviewCardProps) {
  const [helpfulVotes, setHelpfulVotes] = useState(review.helpful_votes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleVoteHelpful = async () => {
    if (hasVoted) return;
    
    const success = await voteReviewHelpful(review.id, true);
    if (success) {
      setHelpfulVotes(prev => prev + 1);
      setHasVoted(true);
    }
  };

  const handleDeleteReview = async () => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    setIsDeleting(true);
    const success = await deleteReview(review.id, recipeId);
    if (success) {
      // The page will revalidate automatically
    }
    setIsDeleting(false);
  };

  const isOwner = currentUserEmail === review.user_email;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Image
            src={review.user_image}
            alt={review.user_name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{review.user_name}</h4>
            <div className="flex items-center space-x-2">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-sm text-gray-500">
                {formatDate(review.created_at)}
              </span>
            </div>
          </div>
        </div>
        
        {isOwner && (
          <button
            onClick={handleDeleteReview}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 disabled:opacity-50"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      </div>

      {/* Review Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {review.photos.map((photo, index) => (
              <div key={index} className="relative">
                <Image
                  src={photo}
                  alt={`Review photo ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-90"
                  onClick={() => window.open(photo, '_blank')}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleVoteHelpful}
          disabled={hasVoted}
          className={`flex items-center space-x-1 text-sm ${
            hasVoted 
              ? 'text-mallard-600' 
              : 'text-gray-500 hover:text-mallard-600'
          } disabled:cursor-not-allowed`}
        >
          {hasVoted ? (
            <ThumbUpIconSolid className="w-4 h-4" />
          ) : (
            <ThumbUpIcon className="w-4 h-4" />
          )}
          <span>
            {hasVoted ? 'Helpful' : 'Helpful'} ({helpfulVotes})
          </span>
        </button>
      </div>
    </div>
  );
}