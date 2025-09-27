import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { updateReviewHelpfulVotes } from '@/app/lib/functions';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { reviewId, increment } = await req.json();

    if (!reviewId) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    const success = await updateReviewHelpfulVotes(reviewId, increment !== false);
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to update helpful votes' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating helpful votes:', error);
    return NextResponse.json({ error: 'Failed to update helpful votes' }, { status: 500 });
  }
}