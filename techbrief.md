# Tech Brief: First Flavors

## Project Overview
A personalized Next.js application to track and manage baby food recipes, focusing on introducing new flavor combinations to a 9-month-old. First Flavors will store recipe data, ingredient introduction history, and track baby's reactions to different foods.

## Tech Stack
- **Frontend**: Next.js 14 with TypeScript and App Router
- **UI Framework**: Material UI (MUI) v5
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel (frontend) + Supabase/Railway (database)
- **Development Environment**: VSCode on macOS

## Core Features
1. **Recipe Management**
   - CRUD operations for recipes
   - Categorization by age appropriateness, meal type, and preparation time
   - Filter by ingredients introduced/not introduced

2. **Ingredient Tracking**
   - Log first introduction dates
   - Track potential allergens
   - Note baby's reactions and preferences

3. **Recipe Planning**
   - Calendar view for meal planning
   - Shopping list generation
   - Photo storage of successful meals

## Database Schema (Initial)
- **Ingredients**: id, name, dateIntroduced, isAllergen, notes
- **Recipes**: id, name, description, preparationTime, ageRangeStart, ageRangeEnd, instructions, createdAt
- **RecipeIngredients**: recipeId, ingredientId, quantity, unit
- **MealPlan**: id, recipeId, plannedDate, notes
- **Reactions**: id, recipeId, reactionDate, notes, rating, photoUrl

## Project Setup Commands

```bash
# Install Homebrew packages if needed
brew update
brew install node postgresql

# Start PostgreSQL service
brew services start postgresql

# Create a new database
createdb first_flavors_db

# Create a new Next.js project with TypeScript
npx create-next-app@latest first-flavors --typescript --eslint --tailwind=false --app --src-dir

# Navigate to project directory
cd first-flavors

# Install dependencies
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install prisma @prisma/client
npm install -D @types/node

# Initialize Prisma
npx prisma init

# Configure environment variables
echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/first_flavors_db\"" > .env
```

## Next Steps After Setup

1. Configure Prisma schema in `prisma/schema.prisma`:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Ingredient {
  id                 String             @id @default(cuid())
  name               String
  dateIntroduced     DateTime?
  isAllergen         Boolean            @default(false)
  notes              String?
  recipeIngredients  RecipeIngredient[]
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
}

model Recipe {
  id                 String             @id @default(cuid())
  name               String
  description        String?
  preparationTime    Int?               // in minutes
  ageRangeStart      Int?               // in months
  ageRangeEnd        Int?               // in months
  instructions       String?
  recipeIngredients  RecipeIngredient[]
  mealPlans          MealPlan[]
  reactions          Reaction[]
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
}

model RecipeIngredient {
  recipe       Recipe     @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  recipeId     String
  ingredient   Ingredient @relation(fields: [ingredientId], references: [id], onDelete: Cascade)
  ingredientId String
  quantity     Float?
  unit         String?

  @@id([recipeId, ingredientId])
}

model MealPlan {
  id          String    @id @default(cuid())
  recipe      Recipe    @relation(fields: [recipeId], references: [id])
  recipeId    String
  plannedDate DateTime
  notes       String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Reaction {
  id          String    @id @default(cuid())
  recipe      Recipe    @relation(fields: [recipeId], references: [id])
  recipeId    String
  reactionDate DateTime
  notes       String?
  rating      Int?      // 1-5 scale
  photoUrl    String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

2. Generate Prisma client and apply migrations:

```bash
npx prisma migrate dev --name init
```

3. Start the development server with Turbopack:

```bash
npx next dev --turbo
```

4. Access First Flavors at http://localhost:3000

## Development Workflow
1. Create reusable components for recipe cards, forms, etc.
2. Implement API routes for CRUD operations
3. Build the UI following MUI design patterns
4. Test database operations with Prisma Studio (`npx prisma studio`)
5. Implement responsive design for kitchen use on mobile devices