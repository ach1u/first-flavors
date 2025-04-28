import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

// GET /api/reactions
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const recipeId = url.searchParams.get('recipeId');

    const whereClause = recipeId ? { recipeId } : undefined;

    const reactions = await prisma.reaction.findMany({
      where: whereClause,
      orderBy: { reactionDate: 'desc' },
      include: {
        recipe: true
      }
    });
    
    return NextResponse.json(reactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reactions' }, { status: 500 });
  }
}

// POST /api/reactions
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const recipeId = formData.get('recipeId') as string;
    const notes = formData.get('notes') as string;
    const rating = formData.get('rating') ? parseInt(formData.get('rating') as string) : null;
    const photoFile = formData.get('photo') as File | null;

    if (!recipeId) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 });
    }

    let photoUrl: string | null = null;
    if (photoFile) {
      const bytes = await photoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate unique filename
      const uniqueFilename = `${Date.now()}_${photoFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      const filePath = path.join(uploadDir, uniqueFilename);
      
      // Save file to uploads directory
      await writeFile(filePath, buffer);
      photoUrl = `/uploads/${uniqueFilename}`;
    }

    const reaction = await prisma.reaction.create({
      data: {
        recipeId,
        reactionDate: new Date(),
        notes,
        rating,
        photoUrl,
      },
      include: {
        recipe: true
      }
    });

    return NextResponse.json(reaction, { status: 201 });
  } catch (error) {
    console.error('Error creating reaction:', error);
    return NextResponse.json({ error: 'Failed to create reaction' }, { status: 500 });
  }
}

// DELETE /api/reactions
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing reaction ID' }, { status: 400 });
    }

    await prisma.reaction.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Reaction deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete reaction' }, { status: 500 });
  }
}