import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/ingredients
export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(ingredients);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 });
  }
}

// POST /api/ingredients
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const ingredient = await prisma.ingredient.create({
      data: {
        name: json.name,
        dateIntroduced: json.dateIntroduced ? new Date(json.dateIntroduced) : null,
        isAllergen: json.isAllergen ?? false,
        notes: json.notes
      }
    });
    return NextResponse.json(ingredient, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ingredient' }, { status: 500 });
  }
}

// PUT /api/ingredients/[id]
export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ingredient ID' }, { status: 400 });
    }

    const ingredient = await prisma.ingredient.update({
      where: { id },
      data: {
        name: json.name,
        dateIntroduced: json.dateIntroduced ? new Date(json.dateIntroduced) : null,
        isAllergen: json.isAllergen ?? false,
        notes: json.notes
      }
    });
    return NextResponse.json(ingredient);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update ingredient' }, { status: 500 });
  }
}

// DELETE /api/ingredients/[id]
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ingredient ID' }, { status: 400 });
    }

    await prisma.ingredient.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Ingredient deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete ingredient' }, { status: 500 });
  }
}