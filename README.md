# First Flavors 🍎🍌🥦

First Flavors is a personalized Next.js application designed to help parents track and manage baby food recipes. The application focuses on introducing new flavor combinations to a 9-month-old baby. It provides an intuitive interface for managing recipes, tracking ingredient introductions, and planning meals.

## 🚀 Current Progress

### ✅ Accomplished So Far
- **Project Setup**: Completed with Next.js 14 and TypeScript. 🛠️
- **UI Framework**: Material UI (MUI) v5 installed for modern and consistent design. 🎨
- **Database**: PostgreSQL initialized and connected using Prisma ORM. 🗄️
- **Schema**: Defined models for Ingredients, Recipes, RecipeIngredients, MealPlan, and Reactions. 📋
- **CRUD Operations**: Implemented complete management for recipes and ingredients. ✍️
- **UI Components**: Developed recipe cards, forms, and ingredient tracking. 🖼️
- **API Routes**: Built robust endpoints for all database interactions. 🌐
- **Calendar View**: Created interactive meal planning calendar. 📅
- **Shopping List**: Added generation of shopping lists from meal plans. 🛒

### 🛠️ What's Next
1. **Photo Storage**: Implement for successful meals. 📸
2. **Testing**: Use Prisma Studio to test database operations. 🧪
3. **Responsive Design**: Enhance mobile usability for kitchen use. 📱
4. **Deployment**: Deploy to Vercel and configure the database on Supabase or Railway. 🚢

## ✨ Features

### Recipe Management
- Create and manage recipes with ingredients, instructions, and preparation times
- Track age appropriateness for different recipes
- Associate ingredients with quantities and units

### Ingredient Tracking
- Log first introduction dates for new ingredients
- Mark and monitor potential allergens
- Keep notes on baby's reactions

### Meal Planning
- Interactive calendar view for planning meals
- Add and edit meal plans with specific recipes
- Generate shopping lists for planned meals
- Track notes for each planned meal

### Shopping List Generation
- Automatically compile ingredients from planned meals
- Show quantities needed for each ingredient
- Group by recipe for easy reference
- Highlight allergens for extra attention

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
