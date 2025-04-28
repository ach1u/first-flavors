# First Flavors 🍎🍌🥦

First Flavors is a personalized Next.js application designed to help parents track and manage baby food recipes. The application focuses on introducing new flavor combinations to a 9-month-old baby. It provides an intuitive interface for managing recipes, tracking ingredient introductions, and planning meals.

## 🚀 Current Progress

- ✅ Initial project setup with Next.js 14 and TypeScript
- ✅ Database schema design and Prisma integration
- ✅ Basic UI components with Material UI
- 🏗️ Recipe management system
- 🏗️ Ingredient tracking functionality
- 🏗️ Meal planning calendar

## ✨ Features

- **Recipe Management**
  - Create, edit, and delete baby food recipes
  - Filter recipes by age appropriateness
  - Categorize by meal type and preparation time
  - Track ingredients and preparation instructions

- **Ingredient Tracking**
  - Log first introduction dates for new ingredients
  - Monitor potential allergens
  - Record baby's reactions and preferences
  - Track ingredient history

- **Meal Planning**
  - Interactive calendar for meal scheduling
  - Automatic shopping list generation
  - Photo storage for successful meals
  - Notes and observations tracking

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd first-flavors
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your PostgreSQL connection string.

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Visit [[http://localhost:5558](http://localhost:5558/)](http://localhost:5558) to see the application.

## 🚀 Deployment

This application is configured for deployment on Vercel with a PostgreSQL database hosted on Supabase/Railway. Follow these steps:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure your environment variables in Vercel
4. Deploy!

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Material UI Documentation](https://mui.com/docs/getting-started/overview/)
- [Prisma Documentation](https://www.prisma.io/docs/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
