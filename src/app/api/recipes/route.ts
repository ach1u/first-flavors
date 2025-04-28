import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/recipes
export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        recipeIngredients: {
          include: {
            ingredient: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

// POST /api/recipes
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const recipe = await prisma.recipe.create({
      data: {
        name: json.name,
        description: json.description,
        preparationTime: json.preparationTime,
        ageRangeStart: json.ageRangeStart,
        ageRangeEnd: json.ageRangeEnd,
        instructions: json.instructions,
        recipeIngredients: {
          create: json.ingredients?.map((ing: any) => ({
            ingredient: {
              connect: { id: ing.id }
            },
            quantity: ing.quantity,
            unit: ing.unit
          })) || []
        }
      },
      include: {
        recipeIngredients: {
          include: {
            ingredient: true
          }
        }
      }
    });
    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}

// PUT /api/recipes/[id]
export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing recipe ID' }, { status: 400 });
    }

    // First, delete all existing recipe ingredients
    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: id }
    });

    // Then update the recipe and create new recipe ingredients
    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name: json.name,
        description: json.description,
        preparationTime: json.preparationTime,
        ageRangeStart: json.ageRangeStart,
        ageRangeEnd: json.ageRangeEnd,
        instructions: json.instructions,
        recipeIngredients: {
          create: json.ingredients?.map((ing: any) => ({
            ingredient: {
              connect: { id: ing.id }
            },
            quantity: ing.quantity,
            unit: ing.unit
          })) || []
        }
      },
      include: {
        recipeIngredients: {
          include: {
            ingredient: true
          }
        }
      }
    });
    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
  }
}

// DELETE /api/recipes/[id]
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing recipe ID' }, { status: 400 });
    }

    await prisma.recipe.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Recipe deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
  }
}