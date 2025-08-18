# Jobs Tracker

A modern, full-stack job application tracking system built with Next.js 14, TailwindCSS, and Prisma. Track your job applications through different stages, manage notes and tags, and gain insights into your job search progress.

## Features

### Core Features
- **Authentication**: Secure email and password login with NextAuth.js.
- **Job Management**: Complete CRUD operations for job applications.
- **Pipeline Tracking**: Monitor jobs through stages (Applied, Interview, Offer, Rejected, Withdrawn).
- **Notes System**: Add and manage notes for each job application.
- **Tagging System**: Organize jobs with customizable tags and colors.
- **Search & Filters**: Find jobs by company, title, stage, or priority.

### Advanced Features
- **Dashboard Analytics**: Visual statistics and progress tracking.
- **Responsive Design**: Mobile-first design using TailwindCSS.
- **Form Validation**: Zod schema validation with React Hook Form.
- **Optimistic Updates**: Real-time UI updates to improve user experience.
- **Role-based Access**: User and admin roles for future growth.

### Technical Features
- **Next.js 14 App Router**: Latest features and performance of Next.js.
- **TypeScript**: Full type safety throughout the application.
- **Prisma ORM**: Type-safe database operations using SQLite.
- **Testing**: Vitest for unit tests and Playwright for end-to-end tests.
- **Modern UI**: Radix UI components with custom styling.

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript, TailwindCSS.
- **Backend**: Next.js API Routes, Prisma ORM.
- **Database**: SQLite (can easily switch to PostgreSQL).
- **Authentication**: NextAuth.js with credentials provider.
- **Forms**: React Hook Form with Zod validation.
- **Testing**: Vitest, Testing Library, Playwright.
- **UI Components**: Radix UI, Lucide React icons.
- **Charts**: Recharts for data visualization.

## Prerequisites

- Node.js 18 or higher.
- npm or yarn.
- Git.

## Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd jobs-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with demo data
npm run seed
```

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

The application comes with pre-seeded demo data:

- **Email**: `demo@example.com`
- **Password**: `demo123`

## Project Structure

```
jobs-tracker/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── jobs/          # Job CRUD endpoints
│   │   │   ├── notes/         # Notes endpoints
│   │   │   └── tags/          # Tags endpoints
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard page
│   │   └── jobs/              # Job management pages
│   ├── components/             # React components
│   │   ├── forms/             # Form components
│   │   ├── providers/         # Context providers
│   │   └── ui/                # UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility libraries
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Helper functions
├── prisma/                     # Database schema and migrations
├── e2e/                        # Playwright E2E tests
└── public/                     # Static assets
```

## Database Schema

### Core Models

- **User**: Authentication and user management.
- **Job**: Job application details and metadata.
- **Note**: Notes and comments for jobs.
- **Tag**: Customizable tags for organizing jobs.
- **JobTag**: Many-to-many relationship between jobs and tags.

### Enums

- **Stage**: APPLIED, INTERVIEW, OFFER, REJECTED, WITHDRAWN.
- **Priority**: LOW, MEDIUM, HIGH, URGENT.
- **Role**: USER, ADMIN.

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User sign in.
- `POST /api/auth/signout` - User sign out.

### Jobs
- `GET /api/jobs` - List all jobs (with filters).
- `POST /api/jobs` - Create new job.
- `GET /api/jobs/[id]` - Get specific job.
- `PUT /api/jobs/[id]` - Update job.
- `DELETE /api/jobs/[id]` - Delete job.

### Notes
- `POST /api/notes` - Create note.

### Tags
- `GET /api/tags` - List all tags.
- `POST /api/tags` - Create new tag.

## Testing

### Unit Tests (Vitest)
```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

### E2E Tests (Playwright)
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Install Playwright browsers (first time only)
npx playwright install
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy automatically upon push.

### Other Platforms
You can deploy the application to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Database connection string | Yes | - |
| `NEXTAUTH_SECRET` | Secret for JWT encryption | Yes | - |
| `NEXTAUTH_URL` | Base URL for authentication | Yes | - |

## Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name <migration-name>

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## Customization

### Styling
- Change `tailwind.config.js` for theme customization.
- Update styles in individual component files.
- Use CSS variables for consistent theming.

### Adding New Features
1. Create new Prisma models in `schema.prisma`.
2. Add API routes in `src/app/api/`.
3. Create React components in `src/components/`.
4. Add TypeScript types in `src/types/`.
5. Write tests for new functionality.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m "Add amazing feature"`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the outstanding React framework.
- [Prisma](https://www.prisma.io/) for the excellent ORM.
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework.
- [Radix UI](https://www.radix-ui.com/) for accessible UI components.
- [NextAuth.js](https://next-auth.js.org/) for authentication.

## Support

If you have questions or need help:

1. Check the [Issues](../../issues) page.
2. Create a new issue with detailed information.
3. Join our community discussions.