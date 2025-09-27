import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getRecipeReviews, getRecipeStats } from '@/app/lib/functions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get('recipeId');

    if (!recipeId) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
    }

    const [reviews, stats] = await Promise.all([
      getRecipeReviews(recipeId),
      getRecipeStats(recipeId)
    ]);

    return NextResponse.json({ reviews, stats });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}