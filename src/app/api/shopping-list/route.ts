import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/shopping-list
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Start date and end date are required' },
        { status: 400 }
      );
    }

    // Fetch meal plans for the date range with their recipes and ingredients
    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        plannedDate: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        recipe: {
          include: {
            recipeIngredients: {
              include: {
                ingredient: true
              }
            }
          }
        }
      },
    });

    // Aggregate ingredients and their quantities
    const ingredientMap = new Map();

    mealPlans.forEach((mealPlan) => {
      mealPlan.recipe.recipeIngredients.forEach((ri) => {
        const key = ri.ingredient.id;
        const existing = ingredientMap.get(key) || {
          id: ri.ingredient.id,
          name: ri.ingredient.name,
          isAllergen: ri.ingredient.isAllergen,
          quantities: []
        };

        if (ri.quantity && ri.unit) {
          existing.quantities.push({
            quantity: ri.quantity,
            unit: ri.unit,
            recipe: mealPlan.recipe.name
          });
        }

        ingredientMap.set(key, existing);
      });
    });

    // Convert map to array and sort by name
    const shoppingList = Array.from(ingredientMap.values())
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(shoppingList);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate shopping list' },
      { status: 500 }
    );
  }
}