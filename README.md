# First Flavors 🍎🍌🥦

First Flavors is a personalized Next.js application designed to help parents track and manage baby food recipes. The application focuses on introducing new flavor combinations to a 9-month-old baby. It provides an intuitive interface for managing recipes, tracking ingredient introductions, and planning meals.

## 🚀 Current Progress

### ✅ Accomplished
- **Core Features**: Complete implementation of all planned features
- **Database**: PostgreSQL with Prisma ORM, fully tested
- **UI Components**: Mobile-responsive recipe cards, forms, and calendars
- **Image Storage**: Cloudinary integration for production
- **API Routes**: Complete coverage for all database operations
- **Mobile Design**: Enhanced responsive layout for kitchen use
- **Deployment Ready**: Configuration prepared for Vercel and Supabase

## ✨ Features

### Recipe Management
- Create and manage recipes with ingredients, instructions, and preparation times
- Track age appropriateness for different recipes
- Associate ingredients with quantities and units
- Mobile-optimized forms for easy kitchen use

### Ingredient Tracking
- Log first introduction dates for new ingredients
- Mark and monitor potential allergens
- Keep notes on baby's reactions
- Intuitive mobile interface for quick updates

### Meal Planning
- Interactive calendar view for planning meals
- Add and edit meal plans with specific recipes
- Generate shopping lists for planned meals
- Track notes for each planned meal
- Mobile-friendly calendar navigation

### Photo Storage
- Capture and store photos of successful meals
- Cloud storage integration via Cloudinary
- Organize photos by recipe and date
- Mobile-optimized photo upload

### Shopping List Generation
- Automatically compile ingredients from planned meals
- Show quantities needed for each ingredient
- Group by recipe for easy reference
- Highlight allergens for extra attention
- Mobile-responsive layout for in-store use

## 🛠️ Getting Started

1. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd first-flavors
npm install
```

2. Set up your environment variables:
```bash
cp .env.example .env
```

3. Update your .env file with your database and Cloudinary credentials

4. Initialize the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

### Prerequisites
- Supabase account for database hosting
- Vercel account for application deployment
- Cloudinary account for image storage

### Steps
1. Set up your Supabase database
2. Configure Vercel project settings
3. Add required environment variables
4. Deploy using the Vercel CLI or GitHub integration

Detailed deployment instructions can be found in [DEPLOYMENT.md](DEPLOYMENT.md).

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/overview/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
