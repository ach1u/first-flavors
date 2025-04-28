# Tech Context

## Technologies Used
- **Frontend**: Next.js 14 with TypeScript and App Router.
- **UI Framework**: Material UI (MUI) v5.
- **Database**: PostgreSQL with Prisma ORM.
- **Deployment**: Vercel for frontend, Supabase/Railway for database.
- **Development Environment**: VSCode on macOS.

## Development Setup
1. Install Node.js and PostgreSQL using Homebrew.
2. Initialize a new Next.js project with TypeScript.
3. Install dependencies including Material UI and Prisma.
4. Configure Prisma schema and apply migrations.
5. Start the development server with Turbopack.

## Technical Constraints
- Database schema must support tracking of ingredients, recipes, meal plans, and reactions.
- Application must be responsive for mobile use in the kitchen.
- Deployment must integrate seamlessly with Vercel and Supabase/Railway.

## Dependencies
- Material UI for UI components.
- Prisma for database ORM.
- PostgreSQL as the database backend.