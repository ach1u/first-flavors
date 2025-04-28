import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/recipes/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id },
      include: {
        recipeIngredients: {
          include: {
            ingredient: true
          }
        },
        reactions: {
          orderBy: {
            reactionDate: 'desc'
          }
        }
      }
    });

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 }
    );
  }
}