# JobTracker Pro - Replit Development Guide

## Overview

JobTracker Pro is a comprehensive job application tracking system built for software developers, AI engineers, and machine learning professionals. The application provides a modern, intuitive interface for managing job searches, tracking applications, scheduling follow-ups, and analyzing job search performance.

## Recent Changes

**January 22, 2025**
- ✓ Complete application architecture implemented with Express backend and React frontend
- ✓ Job search interface with filtering and quick apply functionality
- ✓ Application tracking with status management and analytics
- ✓ Follow-up scheduler for automated reminders
- ✓ Template management for resumes, cover letters, and emails
- ✓ Professional UI with sidebar navigation and responsive design
- ✓ Comprehensive README.md added with installation and usage instructions

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter (lightweight React router)
- **Build Tool**: Vite for fast development and optimized builds
- **Component Strategy**: Modular component architecture with shared UI components

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **Development**: Hot module replacement with Vite integration

### Database Architecture
- **ORM**: Drizzle ORM with type-safe queries
- **Dialect**: PostgreSQL
- **Schema Location**: `shared/schema.ts` for type sharing between client and server
- **Migrations**: Managed through drizzle-kit with `/migrations` output directory

## Key Components

### Data Models
1. **Users**: Basic authentication and user management
2. **Job Listings**: Comprehensive job information with filtering capabilities
3. **Applications**: Detailed application tracking with status management
4. **Follow-ups**: Scheduled reminders and communication tracking
5. **Templates**: Reusable resume, cover letter, and email templates
6. **Saved Jobs**: Bookmarked job opportunities

### Core Features
1. **Dashboard**: Central hub with statistics, recent activity, and quick actions
2. **Job Search Interface**: Advanced filtering and search capabilities
3. **Application Tracker**: Status-based application management
4. **Follow-up Scheduler**: Automated reminders and communication tracking
5. **Template Manager**: Document template creation and management
6. **Analytics**: Performance metrics and trend analysis

### UI Components
- **Layout**: Fixed sidebar navigation with responsive design
- **Components**: Built on shadcn/ui with Radix UI primitives
- **Theming**: CSS custom properties with light/dark mode support
- **Icons**: Lucide React icon library
- **Forms**: React Hook Form with Zod validation

## Data Flow

### Client-Side Flow
1. React components fetch data using TanStack Query
2. Query client handles caching, background updates, and error states
3. Components render data with loading and error states
4. User interactions trigger mutations that update server state
5. Successful mutations invalidate relevant queries for fresh data

### Server-Side Flow
1. Express routes handle HTTP requests with validation
2. Controllers interact with storage layer for data operations
3. Storage interface abstracts database operations
4. Drizzle ORM handles type-safe database queries
5. Response data includes error handling and status codes

### Authentication Flow
- Session-based authentication with PostgreSQL session store
- User credentials stored securely with password hashing
- Protected routes require authentication middleware
- Session persistence across browser sessions

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (PostgreSQL serverless)
- **UI Library**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Validation**: Zod for runtime type validation
- **Forms**: React Hook Form with resolvers
- **Date Handling**: date-fns for date utilities

### Development Dependencies
- **Build Tools**: Vite with TypeScript support
- **Code Quality**: ESLint and TypeScript compiler
- **Database Tools**: Drizzle Kit for migrations and introspection

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React application to `dist/public`
2. **Server Build**: esbuild bundles Node.js server to `dist/index.js`
3. **Assets**: Static files served from build output directory
4. **Type Checking**: TypeScript compilation validation

### Environment Configuration
- **Development**: Hot reload with Vite dev server integration
- **Production**: Optimized builds with static file serving
- **Database**: Environment variable for DATABASE_URL connection
- **Sessions**: Secure session configuration for production

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (Neon Database recommended)
- Static file serving capability
- Environment variable support for configuration

### Database Setup
1. Provision PostgreSQL database (Neon Database)
2. Set DATABASE_URL environment variable
3. Run `npm run db:push` to apply schema migrations
4. Database schema automatically created from TypeScript definitions

## Development Workflow

### Local Development
1. Install dependencies: `npm install`
2. Set up database connection in environment
3. Apply database schema: `npm run db:push`
4. Start development server: `npm run dev`
5. Access application at local development URL

### Code Organization
- **Client**: React application in `client/src/`
- **Server**: Express API in `server/`
- **Shared**: Common types and schemas in `shared/`
- **Database**: Schema definitions and migrations

### Key Development Commands
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build production application
- `npm run start`: Start production server
- `npm run db:push`: Apply database schema changes
- `npm run check`: TypeScript type checking