import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  // Test ingredients
  const banana = await prisma.ingredient.create({
    data: {
      name: 'Banana',
      dateIntroduced: new Date('2025-04-01'),
      isAllergen: false,
      notes: 'Well tolerated, good first food'
    }
  });

  const avocado = await prisma.ingredient.create({
    data: {
      name: 'Avocado',
      dateIntroduced: new Date('2025-04-15'),
      isAllergen: false,
      notes: 'Rich in healthy fats'
    }
  });

  const peanutButter = await prisma.ingredient.create({
    data: {
      name: 'Peanut Butter',
      dateIntroduced: new Date('2025-04-20'),
      isAllergen: true,
      notes: 'Introduce carefully, common allergen'
    }
  });

  // Test recipe
  const bananaSmoothie = await prisma.recipe.create({
    data: {
      name: 'Banana Avocado Smoothie',
      description: 'Creamy and nutritious smoothie',
      preparationTime: 5,
      ageRangeStart: 9,
      ageRangeEnd: 12,
      instructions: '1. Blend banana and avocado\n2. Add breast milk or formula to desired consistency',
      recipeIngredients: {
        create: [
          {
            ingredient: { connect: { id: banana.id } },
            quantity: 1,
            unit: 'medium'
          },
          {
            ingredient: { connect: { id: avocado.id } },
            quantity: 0.5,
            unit: 'medium'
          }
        ]
      }
    }
  });

  // Test meal plan
  await prisma.mealPlan.create({
    data: {
      recipe: { connect: { id: bananaSmoothie.id } },
      plannedDate: new Date('2025-04-29'),
      notes: 'First try with avocado'
    }
  });

  console.log('Test data seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });