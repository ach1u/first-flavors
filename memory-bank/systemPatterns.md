# System Patterns: First Flavors

## System Architecture
- **Frontend**: Built with Next.js using the App Router for routing and server-side rendering.
- **Backend**: Prisma ORM for database interactions with PostgreSQL.
- **Deployment**: Frontend hosted on Vercel, database hosted on Supabase or Railway.

## Key Technical Decisions
1. Use of Material UI for consistent and modern UI design.
2. PostgreSQL chosen for its robust relational database capabilities.
3. Prisma ORM for simplified database schema management and type safety.

## Design Patterns in Use
- **Component-Based Architecture**: Reusable React components for UI elements like recipe cards and forms.
- **API Routes**: Next.js API routes for handling CRUD operations.
- **Responsive Design**: Ensuring usability on mobile devices for kitchen use.

## Component Relationships
- Recipes are linked to ingredients through a many-to-many relationship.
- Meal plans reference recipes and include additional notes and planned dates.
- Reactions are tied to recipes and include ratings, notes, and optional photos.