# Flex Living Reviews Dashboard

A comprehensive reviews management system for Flex Living properties, featuring a NestJS backend with Prisma and a Next.js frontend dashboard.

## Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework for building efficient server-side applications
- **Prisma** - Next-generation ORM with type safety
- **PostgreSQL** - Database (configured via `DATABASE_URL` environment variable)
- **TypeScript** - Type-safe JavaScript
- **class-validator** & **class-transformer** - DTO validation and transformation

### Frontend
- **Next.js 16** (App Router) - React framework with server-side rendering
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Recharts** - Chart library for data visualization (used in dashboard)
- **date-fns** - Date utility library

### Development Tools
- **Turborepo** - Monorepo build system
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Project Structure

```
flex-reviews-dashboard/
├── apps/
│   ├── server/          # NestJS backend
│   │   ├── src/
│   │   │   ├── property/    # Property module (controller, service)
│   │   │   ├── review/      # Review module (controller, service, DTOs)
│   │   │   ├── prisma/      # Prisma module and service
│   │   │   └── common/      # Shared utilities, DTOs, helpers
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── seeders/     # Database seeders
│   └── web/             # Next.js frontend
│       └── src/
│           ├── app/         # Next.js app router pages
│           ├── components/  # React components
│           ├── hooks/       # Custom React hooks
│           └── lib/         # Utilities and API client
└── packages/            # Shared packages
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database (or use SQLite for development)
- Git

### Installation

1. **Clone the repository** (if not already cloned)
   ```bash
   git clone <repository-url>
   cd flex-reviews-dashboard
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up the database**
   
   Create a `.env` file in `apps/server/`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/flex_reviews?schema=public"
   # For SQLite (development):
   # DATABASE_URL="file:./dev.db"
   ```

4. **Run database migrations**
   ```bash
   cd apps/server
   npx prisma migrate dev
   # or
   yarn prisma migrate dev
   ```

5. **Seed the database**
   ```bash
   cd apps/server
   yarn prisma:seed
   # or
   npm run prisma:seed
   ```

6. **Start the development servers**

   In separate terminals:
   
   **Backend (port 5000):**
   ```bash
   cd apps/server
   yarn start:dev
   # or
   npm run start:dev
   ```

   **Frontend (port 3000):**
   ```bash
   cd apps/web
   yarn dev
   # or
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Dashboard: http://localhost:3000/dashboard

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Properties

**GET `/api/properties`**
- Returns all properties
- Response: `Array<Property>`

**GET `/api/properties/:id`**
- Returns a single property by ID
- Response: `Property`

#### Reviews

**GET `/api/reviews/hostaway`**
- Returns normalized reviews with pagination, filtering, and sorting
- Query Parameters:
  - `page` (number, default: 1) - Page number
  - `pageSize` (number, default: 25, max: 100) - Items per page
  - `search` (string, optional) - Search in guestName and publicReview
  - `filterBy` (JSON string, optional) - Filter object (see below)
  - `orderBy` (JSON string, optional) - Sort object (see below)
- Response: `PaginatedResponse<Review>`

**Filter Examples:**
```json
{
  "propertyId": { "equals": "property-uuid" },
  "overallRating": { "gte": 4, "lte": 5 },
  "channel": { "equals": "Hostaway" },
  "createdAt": { "gte": "2024-01-01", "lte": "2024-12-31" }
}
```

**Sort Examples:**
```json
{
  "createdAt": "desc"
}
// or
{
  "overallRating": "desc"
}
```

**GET `/api/reviews/public?propertyId=:id`**
- Returns only approved reviews for a property (or all approved if no propertyId)
- Query Parameters:
  - `propertyId` (string, optional) - Filter by property ID
- Response: `Array<Review>`

**PATCH `/api/reviews/:id/approve`**
- Toggle review approval status
- Body: `{ "approved": boolean }`
- Response: `Review`

### Data Normalization

The backend automatically normalizes review data:

1. **Overall Rating Calculation**: If `overallRating` is missing, it's calculated as the average of all category ratings
2. **Category Flattening**: Categories array is flattened to an object for easier access
3. **Channel Inference**: If channel is missing, defaults to "Hostaway"
4. **Date Formatting**: Dates are standardized to ISO format

### Example API Response

```json
{
  "items": [
    {
      "id": "uuid",
      "propertyId": "property-uuid",
      "property": {
        "id": "property-uuid",
        "name": "Central Flat in Spitalfields",
        "listingName": "Central Flat in Spitalfields",
        "slug": "central-flat-spitalfields"
      },
      "guestName": "Sarah Johnson",
      "publicReview": "Amazing stay!",
      "reviewCategory": [
        { "category": "cleanliness", "rating": 5 }
      ],
      "categories": {
        "cleanliness": 5
      },
      "overallRating": 5.0,
      "rating": 5.0,
      "type": "guest-to-host",
      "channel": "Hostaway",
      "isApproved": true,
      "status": "published",
      "createdAt": "2024-12-15T14:30:00Z",
      "submittedAt": "2024-12-15T14:30:00Z"
    }
  ],
  "total": 100,
  "currentPage": 1,
  "pageSize": 25,
  "totalPages": 4
}
```

## Key Decisions

### Backend Normalization
- **Why**: Ensures consistent data structure across all API responses
- **Implementation**: Normalization happens in the service layer before returning data
- **Benefits**: Frontend receives clean, predictable data structures

### Client-Side Filtering (Partial)
- **Why**: Some filtering is done client-side for fast UI updates
- **Implementation**: Backend handles pagination, search, and complex filters; simple status/property filters can be done client-side
- **Trade-off**: Balance between API calls and client-side performance

### Prisma Schema Design
- **Why**: Uses PostgreSQL with proper indexing for performance
- **Features**: 
  - Soft deletes via `deletedAt` field
  - JSON field for flexible category storage
  - Proper foreign key relationships
  - Indexes on frequently queried fields

### CORS Configuration
- **Why**: Frontend and backend run on different ports
- **Implementation**: CORS enabled for `http://localhost:3000` in development

## Google Reviews Integration

### Findings

After exploring Google Places API for reviews integration:

1. **Limitations**:
   - Google Places API (New) returns a maximum of 5 reviews per place
   - No pagination support for reviews
   - Reviews are read-only (cannot be managed through API)
   - Requires Google Cloud billing account

2. **Recommendations**:
   - For production, consider third-party services like:
     - **ReviewPush** - Aggregates reviews from multiple platforms
     - **Podium** - Review management and messaging platform
     - **Birdeye** - Reputation management with Google Reviews integration
   - Alternatively, implement manual import via CSV/JSON upload
   - Consider web scraping (with proper permissions and legal compliance)

3. **Current Status**:
   - Google Reviews integration is not implemented
   - The system is designed to accept reviews from Hostaway and other channels
   - Architecture supports adding new review sources via the `channel` field

## Development

### Running Tests
```bash
# Backend tests
cd apps/server
yarn test

# Frontend type checking
cd apps/web
yarn check-types
```

### Database Management
```bash
cd apps/server

# View database in Prisma Studio
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate
```

### Building for Production
```bash
# Build all apps
yarn build

# Build specific app
yarn build --filter=server
yarn build --filter=web
```

## Environment Variables

### Backend (`apps/server/.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/flex_reviews?schema=public"
PORT=5000
```

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env` file
- Run `npx prisma migrate dev` to create database schema

### CORS Errors
- Verify backend CORS configuration allows `http://localhost:3000`
- Check that backend is running on port 5000

### API Not Responding
- Ensure backend server is running: `yarn start:dev` in `apps/server`
- Check backend logs for errors
- Verify API base URL in frontend `.env.local`

## License

Private - Flex Living Internal Use

## Support

For issues or questions, contact the development team.
