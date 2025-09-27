"use client";

import { useState, useRef } from 'react';
import { useActionState } from 'react';
import { StarIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/global/buttons';
import StarRating from './StarRating';
import { submitReview, ReviewFormState } from '@/app/lib/actions';
import Image from 'next/image';

interface ReviewFormProps {
  recipeId: string;
}

export default function ReviewForm({ recipeId }: ReviewFormProps) {
  const initialState: ReviewFormState = { errors: {} };
  const [formState, formAction, isPending] = useActionState(
    (prevState: ReviewFormState, formData: FormData) => 
      submitReview(recipeId, prevState, formData),
    initialState
  );
  
  const [rating, setRating] = useState(0);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension!);
    });

    if (validFiles.length + selectedPhotos.length > 3) {
      alert('You can only upload up to 3 photos');
      return;
    }

    setSelectedPhotos(prev => [...prev, ...validFiles]);
    
    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (formData: FormData) => {
    formData.append('rating', rating.toString());
    formAction(formData);
    
    if (formState.success) {
      setRating(0);
      setSelectedPhotos([]);
      setPhotoPreviews([]);
    }
  };

  if (formState.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-green-800 font-medium">Thank you for your review!</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      <form action={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            interactive={true}
            size="lg"
          />
          {formState.errors?.rating && (
            <p className="text-red-500 text-sm mt-1">{formState.errors.rating[0]}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Review Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mallard-500 focus:border-transparent"
            placeholder="Summarize your experience"
          />
          {formState.errors?.title && (
            <p className="text-red-500 text-sm mt-1">{formState.errors.title[0]}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="comment"
            name="comment"
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mallard-500 focus:border-transparent"
            placeholder="Share your experience cooking this recipe..."
          />
          {formState.errors?.comment && (
            <p className="text-red-500 text-sm mt-1">{formState.errors.comment[0]}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photos (Optional)
          </label>
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <PhotoIcon className="w-5 h-5" />
              Add Photos (up to 3)
            </button>
            
            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {formState.errors?.photos && (
            <p className="text-red-500 text-sm mt-1">{formState.errors.photos[0]}</p>
          )}
        </div>

        {/* Hidden file inputs for form submission */}
        {selectedPhotos.map((photo, index) => (
          <input
            key={index}
            type="file"
            name="photos"
            style={{ display: 'none' }}
            // This is a workaround to include files in form submission
            ref={(el) => {
              if (el) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(photo);
                el.files = dataTransfer.files;
              }
            }}
          />
        ))}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending || rating === 0}
            className="bg-mallard-600 text-white px-6 py-2 rounded-md hover:bg-mallard-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>

        {/* Error Messages */}
        {formState.errors?.other && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-800 text-sm">{formState.errors.other[0]}</p>
          </div>
        )}
      </form>
    </div>
  );
}