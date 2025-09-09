# JobTracker Pro

A comprehensive job search automation platform designed specifically for software developers, AI engineers, and machine learning professionals. JobTracker Pro streamlines your job search process with intelligent application tracking, automated follow-ups, and performance analytics.

## Features

### 🎯 Job Search & Discovery
- **Advanced Search Filtering**: Filter by role category, experience level, job type, salary range, and location
- **Real-time Job Listings**: Browse curated job opportunities from top tech companies
- **Smart Job Recommendations**: AI-powered suggestions based on your profile and preferences

### 📝 Application Management
- **Quick Apply System**: Streamlined application process with pre-filled templates
- **Application Tracking**: Monitor application status (Applied, Interview, Offer, Rejected)
- **Template Management**: Create and manage resume, cover letter, and email templates
- **Document Organization**: Keep all application materials organized and easily accessible

### 📅 Follow-up Automation
- **Automated Reminders**: Schedule follow-up emails and status checks
- **Communication Tracking**: Log all interactions with potential employers
- **Smart Scheduling**: Intelligent follow-up timing based on application status

### 📊 Analytics & Insights
- **Performance Metrics**: Track response rates, interview conversion, and success rates
- **Trend Analysis**: Identify patterns in your job search performance
- **Goal Tracking**: Monitor progress toward your career objectives

## Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** + **shadcn/ui** for modern, responsive design
- **TanStack Query** for efficient server state management
- **Wouter** for lightweight client-side routing
- **React Hook Form** + **Zod** for form validation

### Backend
- **Node.js** + **Express.js** for robust server architecture
- **TypeScript** for end-to-end type safety
- **Drizzle ORM** for database operations
- **PostgreSQL** for reliable data persistence

### Development Tools
- **Vite** for fast development and optimized builds
- **ESLint** + **TypeScript** for code quality
- **Hot Module Replacement** for efficient development

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- PostgreSQL database (optional - uses in-memory storage by default)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone [<your-repo-url>](https://github.com/nanikarthik141149/JobHunterAI.git)
   cd jobtracker-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup (Optional)**
   
   For PostgreSQL database (recommended for production):
   ```bash
   # Create .env file
   echo "DATABASE_URL=your_postgresql_connection_string" > .env
   ```
   
   For development, the app uses in-memory storage by default.

4. **Database Setup (PostgreSQL only)**
   ```bash
   # Apply database schema
   npm run db:push
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

6. **Access the application**
   
   Open your browser and navigate to `http://localhost:5000`

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production application |
| `npm run start` | Start production server |
| `npm run db:push` | Apply database schema changes |
| `npm run check` | Run TypeScript type checking |

## Project Structure

```
jobtracker-pro/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages/routes
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and types
│   │   └── index.css      # Global styles and theme
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage interface
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema and types
└── package.json          # Dependencies and scripts
```

## Usage Guide

### 1. Dashboard Overview
The main dashboard provides a comprehensive view of your job search activities:
- Application statistics and metrics
- Recent job opportunities
- Upcoming follow-ups and reminders
- Quick access to all major features

### 2. Job Search
- Use the search interface to find relevant opportunities
- Apply advanced filters to narrow down results
- Save interesting positions for later review
- Use the "Quick Apply" feature for streamlined applications

### 3. Application Tracking
- Monitor all your applications in one centralized location
- Update application status as you progress through hiring processes
- Add notes and track communication history
- Set up automated follow-up reminders

### 4. Template Management
- Create reusable resume and cover letter templates
- Customize templates for different types of roles
- Use templates in the Quick Apply process for efficiency

### 5. Analytics & Reporting
- Review your job search performance metrics
- Identify successful strategies and areas for improvement
- Track trends over time
- Export data for external analysis

## Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (optional)
- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Server port (defaults to 5000)

### Customization
- **Themes**: Modify `client/src/index.css` for custom styling
- **Job Categories**: Update role categories in `shared/schema.ts`
- **Templates**: Add default templates in `server/storage.ts`

## API Documentation

### Endpoints
- `GET /api/jobs` - Retrieve job listings with optional filters
- `POST /api/applications` - Submit new job application
- `GET /api/applications` - Retrieve user's applications
- `GET /api/followups` - Retrieve scheduled follow-ups
- `GET /api/templates` - Retrieve user's templates
- `GET /api/analytics/stats` - Retrieve performance statistics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred hosting platform

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, Heroku, or VPS
- **Database**: Neon, Supabase, or managed PostgreSQL

## Support

For questions, issues, or feature requests:
1. Check the existing GitHub issues
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs
4. Provide system information and browser details

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Roadmap

### Upcoming Features
- [ ] Email integration for automated communications
- [ ] AI-powered application optimization
- [ ] Salary negotiation tools
- [ ] Interview preparation resources
- [ ] Team collaboration features
- [ ] Mobile application
- [ ] Integration with job boards (LinkedIn, Indeed, etc.)

---

**Built with ❤️ for the tech community**

*Streamline your job search and land your dream role in software development, AI, or machine learning.*
