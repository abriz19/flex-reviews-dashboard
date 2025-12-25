# Flex Living Reviews Dashboard

A comprehensive reviews management system enabling Flex Living property managers to monitor, filter, and approve guest reviews with a clean, intuitive dashboard interface.

## Project Overview

The Flex Living Reviews Dashboard provides property managers with powerful tools to:

- **Monitor** review performance across all properties with real-time statistics
- **Filter & Search** reviews by rating, property, channel, date, and category
- **Approve/Reject** reviews for public display on property pages
- **Analyze** trends and recurring issues to improve guest experience
- **Display** approved reviews on public-facing property detail pages

The system integrates with Hostaway review data, normalizes it for consistency, and provides a manager-controlled approval workflow before reviews appear on public property pages.

## Tech Stack

### Backend

- **NestJS** - Enterprise-grade Node.js framework providing structure, scalability, and TypeScript support
- **Prisma** - Type-safe ORM with excellent developer experience and migration management
- **PostgreSQL** - PostgreSQL for local development and production (via `DATABASE_URL`)
- **Swagger/OpenAPI** - Auto-generated API documentation at `/api/docs`

### Frontend

- **Next.js 16 (App Router)** - React framework with server components, routing, and optimized performance
- **Tailwind CSS** - Utility-first CSS for rapid, consistent UI development
- **Recharts** - Chart library for data visualization in dashboard analytics
- **TypeScript** - Type safety across the entire stack

### Infrastructure

- **Turborepo** - Monorepo build system for efficient development and deployment
- **Docker + docker-compose** - Containerization for consistent development and deployment environments

## Key Design Decisions

### Backend Data Normalization

All Hostaway review data is normalized server-side before API responses:

- **Overall Rating Calculation**: Automatically computed as average of category ratings when missing
- **Category Flattening**: Categories array transformed to object (`{ cleanliness: 5, communication: 4 }`) for easier frontend access
- **Channel Inference**: Missing channels default to "Hostaway"
- **Date Standardization**: All dates converted to ISO format

**Rationale**: Ensures consistent, predictable data structures across all endpoints, reducing frontend complexity and potential bugs.

### Manager Approval System

Reviews use an `isApproved` boolean field for full manager control:

- **Pending** reviews require manager approval before public display
- **Published** reviews appear on public property pages
- **Declined** reviews remain in system but hidden from public view

**Rationale**: Gives managers complete control over public-facing content, enabling quality control and brand protection.

### Hybrid Filtering Strategy

- **Backend**: Handles pagination, full-text search, complex filters (date ranges, rating ranges, property/channel filters)
- **Client-side**: Fast UI updates for status and category filters on small datasets

**Rationale**: Balances API efficiency with responsive user experience. Backend handles heavy lifting; client-side provides instant feedback.

### UI Design Philosophy

Interface inspired by Flex Living's premium aesthetic:

- **Minimal white space** for clean, uncluttered layouts
- **Elegant typography** with clear hierarchy
- **Subtle shadows** for depth without distraction
- **Responsive grid** layouts for all screen sizes
- **No unnecessary colors** - focused, professional palette

**Rationale**: Maintains brand consistency with Flex Living's public website while providing powerful functionality.

### Demo Data

Seeded **40 realistic mock reviews** across **6 properties** with varied:

- Ratings (1-5 stars)
- Statuses (published, pending, declined)
- Dates (spread across past 3 months)
- Guest names and authentic review text

**Rationale**: Enables comprehensive testing and demonstration without requiring live Hostaway API integration.

## API Behaviors

### Primary Endpoints

#### `GET /api/reviews/hostaway`

**Purpose**: Primary endpoint for dashboard review management (tested endpoint)

**Features**:

- Pagination (`page`, `pageSize` - max 100)
- Full-text search across `guestName` and `publicReview`
- Advanced filtering via `filterBy` JSON object
- Sorting via `orderBy` JSON object
- Returns normalized review data

**Query Parameters**:

```
?page=1&pageSize=25&search=john&filterBy={"propertyId":{"equals":"uuid"},"overallRating":{"gte":4}}&orderBy={"createdAt":"desc"}
```

**Response**: `PaginatedResponse<Review>` with `items`, `total`, `currentPage`, `pageSize`, `totalPages`

#### `GET /api/reviews/public?propertyId=:id`

**Purpose**: Retrieve approved reviews for public property pages

**Behavior**: Returns only reviews where `isApproved: true`, optionally filtered by property ID

**Response**: `Array<Review>` (normalized)

#### `PATCH /api/reviews/:id/approve`

**Purpose**: Toggle review approval status

**Body**: `{ "approved": boolean }`

**Response**: Updated `Review` object

#### `GET /api/properties`

**Purpose**: Retrieve all properties for listings and detail pages

**Response**: `Array<Property>`

### API Documentation

Interactive Swagger documentation available at **`/api/docs`** when server is running.

All endpoints support JSON query parameters (`filterBy`, `orderBy`) which must be URL-encoded when sent as query strings.

## Google Reviews Integration Findings

### Exploration Summary

Investigated Google Places API for reviews integration to complement Hostaway data.

### Key Findings

1. **Severe Limitations**:
   - **Maximum 5 reviews per place** - Place Details endpoint returns only 5 reviews
   - **No pagination** - Cannot retrieve additional reviews beyond the initial 5
   - **Read-only** - Reviews are algorithmically selected by Google; cannot be managed
   - **Manual Place ID required** - Each property needs its Google Place ID manually configured

2. **Technical Constraints**:
   - Requires Google Cloud billing account
   - Rate limits apply (costs increase with usage)
   - Reviews may not represent all guest feedback (Google's algorithm selects which reviews to show)

3. **Conclusion**:
   Google Places API is **not feasible** for a comprehensive reviews management system. The 5-review limit and lack of pagination make it unsuitable for properties with many reviews.

### Recommendations

- **Current Focus**: Hostaway integration with manager approval workflow (implemented)
- **Future Options**:
  - Third-party review aggregation services (ReviewPush, Podium, Birdeye)
  - Manual CSV/JSON import functionality
  - Web scraping (with proper permissions and legal compliance)
  - Direct integration with other booking platforms (Airbnb, Booking.com APIs)

## Local Setup Instructions

### Prerequisites

- Node.js 18+ and Yarn
- PostgreSQL (or SQLite for development)
- Git

### Step-by-Step Setup

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd flex-reviews-dashboard
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Configure environment**

   Create `apps/server/.env`:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/flex_reviews?schema=public"
   # Or for SQLite (development):
   # DATABASE_URL="file:./dev.db"
   PORT=5000
   ```

   Create `apps/web/.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Setup database**

   ```bash
   cd apps/server
   yarn prisma db push
   yarn prisma:seed
   ```

5. **Start development servers**

   ```bash
   # From project root
   yarn dev
   ```

   This starts both backend (port 5000) and frontend (port 3000) concurrently.

6. **Access application**
   - **Dashboard**: http://localhost:3000/dashboard
   - **Public Site**: http://localhost:3000
   - **API Docs**: http://localhost:5000/api/docs
   - **API Base**: http://localhost:5000/api

## Docker Setup

For containerized development:

```bash
docker-compose up --build
```

The Docker setup automatically:

- Builds backend and frontend containers
- Runs database migrations
- Seeds initial data
- Exposes services on configured ports

## Features Implemented

### Manager Dashboard (`/dashboard`)

- **Overview Section**:
  - Summary cards (Total Reviews, Published, Pending, Avg Rating)
  - Property performance table with aggregated statistics
  - Trends & recurring issues visualization (categories with ratings < 4.0)
- **Review Management Section**:
  - Paginated review list with full details
  - Multi-criteria filtering (status, property, channel, category, date range)
  - Sorting by date, rating, or property
  - Approval toggles for each review
  - Real-time status updates

### Public Property Pages (`/property/[id]`)

- Replicates Flex Living website design
- Hero image carousel
- Property description and amenities grid
- **Approved reviews section** - Only displays reviews with `isApproved: true`
- Clean, premium layout matching brand aesthetic

### Home Page (`/`)

- Property listings with search functionality
- Interactive map showing property locations
- Links to individual property detail pages

## Project Structure

```
flex-reviews-dashboard/
├── apps/
│   ├── server/          # NestJS backend
│   │   ├── src/
│   │   │   ├── property/    # Property module
│   │   │   ├── review/      # Review module (controller, service, DTOs)
│   │   │   ├── prisma/      # Prisma service
│   │   │   └── common/      # Shared utilities, DTOs, helpers
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── seeders/     # 40 mock reviews + 6 properties
│   └── web/             # Next.js frontend
│       └── src/
│           ├── app/         # Pages (dashboard, property, home)
│           ├── components/  # React components
│           ├── hooks/       # Custom hooks
│           └── lib/         # API client
└── packages/            # Shared packages (eslint, typescript configs)
```

## License

Private - Flex Living Internal Use
