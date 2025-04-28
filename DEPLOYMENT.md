# Deployment Guide for First Flavors

This guide covers both local development setup and production deployment procedures for the First Flavors application.

## Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL (local)
- Homebrew (for macOS users)
- Git

### Initial Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd first-flavors
```

2. Install dependencies:
```bash
npm install
```

3. Set up local PostgreSQL database:
```bash
brew services start postgresql
createdb first_flavors_db
```

4. Create `.env` file:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/first_flavors_db"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

## Production Deployment

### Database Setup (Supabase)

1. Create a new Supabase project:
   - Go to [https://app.supabase.com](https://app.supabase.com)
   - Click "New Project"
   - Fill in project details
   - Save the database connection string

2. Update environment variables in Vercel:
   - `DATABASE_URL`: Your Supabase connection string
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

3. Run migrations in production:
```bash
DATABASE_URL="your-supabase-connection-string" npx prisma migrate deploy
```

### Vercel Deployment

1. Push your code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Connect to Vercel:
   - Go to [https://vercel.com](https://vercel.com)
   - Create a new project
   - Import your GitHub repository
   - Configure build settings:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: .next

3. Configure environment variables in Vercel:
   - Add all variables from your `.env` file
   - Ensure production URLs and keys are used

4. Deploy:
   - Vercel will automatically deploy when you push to main
   - Manual deployment can be triggered from Vercel dashboard

### Post-Deployment Checks

1. Verify database connections:
   - Check API endpoints
   - Ensure data operations work
   - Monitor Supabase dashboard for queries

2. Performance monitoring:
   - Set up Vercel Analytics
   - Monitor database performance in Supabase
   - Check error logging

3. Regular maintenance:
   - Keep dependencies updated
   - Monitor database usage
   - Backup data regularly

## Troubleshooting

### Common Issues

1. Database Connection Issues:
   - Verify connection string format
   - Check IP allow list in Supabase
   - Confirm SSL requirements

2. Build Failures:
   - Check Node.js version
   - Verify all dependencies are installed
   - Review build logs in Vercel

3. Runtime Errors:
   - Check environment variables
   - Review Vercel deployment logs
   - Monitor Supabase logs

### Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## Security Considerations

1. Environment Variables:
   - Never commit .env files
   - Use different keys for development and production
   - Regularly rotate production keys

2. Database Security:
   - Enable Row Level Security in Supabase
   - Implement proper authentication
   - Regular security audits

3. API Security:
   - Implement rate limiting
   - Use proper CORS settings
   - Validate all inputs

## Monitoring and Maintenance

1. Set up monitoring:
   - Vercel Analytics for frontend
   - Supabase monitoring for database
   - Error tracking (e.g., Sentry)

2. Regular maintenance tasks:
   - Database backups
   - Dependency updates
   - Security patches

3. Performance optimization:
   - Regular performance audits
   - Database query optimization
   - Image optimization checks

### Additional Setup Steps

1. Install Material UI (MUI) dependencies if not already installed:
```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

2. Set up Prisma Studio for database management:
```bash
npx prisma studio
```
   Access Prisma Studio at http://localhost:5555

## Alternative Database Deployment (Railway)

As an alternative to Supabase, you can deploy the database on Railway:

1. Create a Railway account:
   - Go to [https://railway.app](https://railway.app)
   - Sign up with GitHub

2. Create a new PostgreSQL database:
   - Click "New Project"
   - Select "Provision PostgreSQL"
   - Save the connection string

3. Configure database URL:
   - Add DATABASE_URL to Vercel environment variables
   - Format: `postgresql://user:password@host:port/database`

4. Run migrations on Railway:
```bash
DATABASE_URL="your-railway-connection-string" npx prisma migrate deploy
```

5. Monitor database:
   - Use Railway dashboard for metrics
   - Set up alerts for resource usage

## Build Optimization

1. Configure Next.js build settings:
   ```js
   // next.config.ts
   const config = {
     swcMinify: true,
     compress: true,
     // Enable image optimization
     images: {
       domains: ['your-upload-domain.com']
     }
   };
   ```

2. Material UI optimization:
   - Use `@emotion/cache` for SSR
   - Implement proper CSS extraction
   - Use dynamic imports for large components

3. Database query optimization:
   - Use Prisma's include/select for specific fields
   - Implement proper indexing
   - Monitor query performance

## CI/CD Pipeline

1. GitHub Actions setup:
   - Lint and type checking
   - Run tests
   - Build verification
   - Automatic deployments

2. Quality checks:
   - TypeScript strict mode
   - ESLint configuration
   - Prettier formatting

3. Environment separation:
   - Development
   - Staging
   - Production

## File Upload Configuration

1. Configure upload provider:
   - Set up cloud storage (e.g., S3, Cloudinary)
   - Set proper CORS headers
   - Configure upload limits

2. Environment variables for uploads:
   - Storage API keys
   - Upload endpoints
   - Access credentials

## Monitoring Setup

1. Error tracking:
   ```bash
   npm install @sentry/nextjs
   ```
   - Configure Sentry for error monitoring
   - Set up error boundaries
   - Configure error reporting

2. Performance monitoring:
   - Implement Web Vitals tracking
   - Monitor API response times
   - Database query performance

3. Usage analytics:
   - Set up Vercel Analytics
   - Configure custom events
   - Monitor user patterns