import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/meal-plans
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    const whereClause = startDate && endDate ? {
      plannedDate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    } : undefined;

    const mealPlans = await prisma.mealPlan.findMany({
      where: whereClause,
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
      orderBy: {
        plannedDate: 'asc'
      }
    });

    return NextResponse.json(mealPlans);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch meal plans' }, { status: 500 });
  }
}

// POST /api/meal-plans
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const mealPlan = await prisma.mealPlan.create({
      data: {
        plannedDate: new Date(json.plannedDate),
        notes: json.notes,
        recipe: {
          connect: { id: json.recipeId }
        }
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
      }
    });
    return NextResponse.json(mealPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create meal plan' }, { status: 500 });
  }
}

// PUT /api/meal-plans/[id]
export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing meal plan ID' }, { status: 400 });
    }

    const mealPlan = await prisma.mealPlan.update({
      where: { id },
      data: {
        plannedDate: json.plannedDate ? new Date(json.plannedDate) : undefined,
        notes: json.notes,
        recipe: json.recipeId ? {
          connect: { id: json.recipeId }
        } : undefined
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
      }
    });
    return NextResponse.json(mealPlan);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update meal plan' }, { status: 500 });
  }
}

// DELETE /api/meal-plans/[id]
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing meal plan ID' }, { status: 400 });
    }

    await prisma.mealPlan.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Meal plan deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete meal plan' }, { status: 500 });
  }
}