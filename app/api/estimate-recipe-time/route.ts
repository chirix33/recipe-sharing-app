import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

export const estimateRecipeTimeSchema = z.object({
    estimatedTimeInMinutes: z.number().min(1, 
        'Estimated time must be at least 1 minute'),
});

export async function GET() {
    return NextResponse.json({ message: 'Hello from estimate-recipe-time API' }, { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body) {
            return NextResponse.json({ error: 'No Body' }, { status: 500 });
        }

        const { ingredients, instructions } = body;

        if (!instructions || typeof instructions !== 'string' || instructions === '') {
            return NextResponse.json({ error: 'Invalid instructions' }, { status: 400 });
        }

        const prompt = `
            Based on the following recipe ingredients and instructions, estimate the total preparation time in minutes. 
            Only provide the numeric estimate, no additional text.
            Recipe indredients:
            ${ingredients}
            Recipe instructions:
            ${instructions}
        `;

        const { text } = await generateText({
            model: openai(`${process.env.GPT_MODEL}`),
            prompt: prompt,
        });

        const timeInMinutes = parseInt(text.trim(), 10);

        if (isNaN(timeInMinutes)) {
            return NextResponse.json({ error: 'Failed to generate a valid time estimate' }, { status: 500 });
        }

        const response = { estimatedTimeInMinutes: timeInMinutes };

        const validation = estimateRecipeTimeSchema.safeParse(response);
        if (!validation.success) {
            console.error('Validation error:', validation.error);
            return NextResponse.json({ error: 'Invalid response format', details: validation.error.errors }, { status: 400 });
        }

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error estimating recipe time:', error);
        return NextResponse.json({ error: 'An error occurred while estimating the recipe time' }, { status: 500 });
    }
}