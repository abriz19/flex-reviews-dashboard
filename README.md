# Flex Living Reviews Dashboard

A full-stack application for property managers to assess and manage guest reviews across multiple properties. Built with modern web technologies in a Turborepo monorepo architecture.

## 🚀 Live Deployment

- **Frontend**: [https://flex-reviews-dashboard-1.onrender.com](https://flex-reviews-dashboard-1.onrender.com)
- **Backend API**: [https://flex-reviews-dashboard-u2uk.onrender.com/api](https://flex-reviews-dashboard-u2uk.onrender.com/api)

## 📋 Project Overview

The Flex Living Reviews Dashboard helps property managers:
- View and analyze guest reviews across all properties
- Approve or decline reviews before public display
- Track performance metrics and trends
- Filter and search reviews by various criteria
- Display approved reviews on public property pages

The application simulates integration with Hostaway (a property management system) and provides a complete review management workflow.

## 🛠 Tech Stack

| Technology | Purpose | Justification |
|------------|---------|---------------|
| **NestJS** | Backend API | Robust, scalable framework with built-in TypeScript support, dependency injection, and excellent Prisma integration |
| **Next.js 16** | Frontend Framework | Server-side rendering, optimized performance, and seamless React development experience |
| **Prisma** | ORM | Type-safe database access, migrations, and excellent developer experience |
| **PostgreSQL** | Database | Relational database for structured review and property data |
| **Docker** | Containerization | Consistent development and deployment environments |
| **Turborepo** | Monorepo | Efficient build system for managing multiple packages with shared dependencies |

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Dashboard  │  │ Property Page│  │  Listings    │      │
│  │  (Overview,  │  │  (Public)    │  │   Page       │      │
│  │   Reviews)   │  │              │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼─────────────────┼──────────────┘
          │                  │                 │
          │  HTTP Requests   │                 │
          │  (REST API)      │                 │
          ▼                  ▼                 ▼
┌─────────────────────────────────────────────────────────────┐
│                 Backend (NestJS)                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers:                                        │  │
│  │  • GET  /api/reviews/hostaway (paginated, filtered) │  │
│  │  • GET  /api/reviews/public (approved only)        │  │
│  │  • PATCH /api/reviews/:id/approve                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Services:                                            │  │
│  │  • Review normalization                               │  │
│  │  • Pagination & filtering                             │  │
│  │  • Approval management                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│                    Prisma ORM                                │
└──────────────────────────┼───────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              PostgreSQL Database                             │
│  ┌──────────────┐              ┌──────────────┐            │
│  │  Properties  │◄─────────────►│   Reviews    │            │
│  │  (6 seeded)  │              │ (40 seeded)  │            │
│  └──────────────┘              └──────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### Key Data Flows

1. **Fetch Reviews**: Frontend → Backend → Prisma → PostgreSQL → Normalized Response
2. **Approve Review**: Frontend → PATCH /api/reviews/:id/approve → Update `isApproved` flag
3. **Public Display**: Property page → GET /api/reviews/public?propertyId=... → Only approved reviews

## ✨ Key Features

### Manager Dashboard
- **Overview Section**: 
  - Total, published, pending, and declined review counts
  - Average rating across all reviews
  - Per-property performance metrics
  - Category-based issue tracking (ratings < 4)
- **Review Management**:
  - Paginated review list (10 per page)
  - Filter by status, property, channel, category, date range
  - Sort by date, rating, or property name
  - Approve/decline reviews with one click
  - Real-time status updates

### Public Property Pages
- Display only approved reviews
- Property-specific review filtering
- Clean, user-friendly interface

### Data Management
- Seeded database with 40 realistic reviews across 6 properties
- Review normalization from Hostaway format
- Support for both `rating` and `overallRating` fields
- Category-based review analysis

## 🎯 Key Design and Logic Decisions

### 1. Backend Normalization
**Decision**: Normalize review data in the backend service layer.

**Rationale**: 
- Ensures consistent data structure across all API consumers
- Handles variations in Hostaway data format (e.g., `rating` vs `overallRating`)
- Centralizes business logic, making frontend simpler

**Implementation**: `ReviewsService.getNormalizedReviews()` transforms Prisma models into a consistent API response format.

### 2. Approval System
**Decision**: Use boolean `isApproved` flag instead of status enum.

**Rationale**:
- Simpler data model (boolean vs enum)
- Clear binary state: approved or not
- Frontend maps to `published`/`pending`/`declined` for UX

**Implementation**: 
- Backend: `isApproved: boolean` in database
- Frontend: Maps `isApproved=true` → `status='published'`, `isApproved=false` → `status='pending'`

### 3. Client-Side Filtering for UX
**Decision**: Hybrid approach - backend pagination/filtering + client-side category filtering.

**Rationale**:
- Category data is nested in `reviewCategory` array - complex to filter server-side
- Client-side filtering provides instant feedback
- Backend handles heavy filtering (status, property, date range) for performance

### 4. Seeded Mock Data
**Decision**: Pre-populate database with realistic mock data on startup.

**Rationale**:
- Enables immediate testing and demos
- Realistic data structure for development
- No external API dependencies during development

**Implementation**: Prisma seed script creates 6 properties and 40 reviews with varied ratings, categories, and statuses.

### 5. Pagination Strategy
**Decision**: Backend pagination with fixed page size (10 reviews per page).

**Rationale**:
- Prevents loading large datasets
- Better performance and user experience
- Respects backend validation (max 100 items per request)

## 📡 API Behaviors

### Base URL
```
Production: https://flex-reviews-dashboard-u2uk.onrender.com/api
Local: http://localhost:5000/api
```

### Endpoints

#### 1. Get Reviews (Hostaway Format)
```http
GET /api/reviews/hostaway
```

**Query Parameters**:
- `page` (number, default: 1): Page number
- `pageSize` (number, 1-100, default: 10): Items per page
- `search` (string, optional): Search in guestName and publicReview
- `filterBy` (JSON string, optional): Filter object
  ```json
  {
    "isApproved": { "equals": true },
    "propertyId": { "equals": "uuid" },
    "channel": { "equals": "Hostaway" },
    "overallRating": { "gte": 4, "lte": 5 },
    "createdAt": { "gte": "2024-01-01T00:00:00Z" }
  }
  ```
- `orderBy` (JSON string, optional): Sort object
  ```json
  {
    "createdAt": "desc",
    "overallRating": "desc",
    "guestName": "asc"
  }
  ```

**Response**:
```json
{
  "data": [
    {
      "id": "uuid",
      "propertyId": "uuid",
      "property": {
        "id": "uuid",
        "name": "Central Flat in Spitalfields",
        "listingName": "Central Flat in Spitalfields",
        "slug": "central-flat-spitalfields"
      },
      "guestName": "John Doe",
      "publicReview": "Great stay!",
      "reviewCategory": [
        { "category": "cleanliness", "rating": 5 }
      ],
      "overallRating": 4.5,
      "type": "guest-to-host",
      "channel": "Hostaway",
      "isApproved": false,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 40,
  "currentPage": 1,
  "pageSize": 10,
  "totalPages": 4
}
```

#### 2. Get Public Reviews
```http
GET /api/reviews/public?propertyId={uuid}
```

**Query Parameters**:
- `propertyId` (string, optional): Filter by property ID

**Response**: Array of approved reviews (simplified format for public display)

#### 3. Approve Review
```http
PATCH /api/reviews/:id/approve
Content-Type: application/json

{
  "approved": true
}
```

**Response**: Updated review object

## 🔍 Google Reviews Findings

During the assessment, I explored Google Places API for potential integration:

### Findings
- **Places API (New)**: Limited to 5 reviews per place, no pagination support
- **Places API (Legacy)**: Deprecated, not recommended for new projects
- **Reviews Data**: Requires Place ID, which needs geocoding or manual mapping

### Decision
**Not implemented** due to:
1. **Limited Data**: Only 5 reviews per property is insufficient
2. **No Pagination**: Cannot retrieve historical reviews
3. **Complexity**: Requires Place ID mapping for each property
4. **Scope**: Assessment focused on Hostaway integration

### Alternative Approach
Focused on Hostaway mock integration, which provides:
- Complete review history
- Structured data format
- Category-based ratings
- Approval workflow

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js 18+ and Yarn
- PostgreSQL 14+ (or Docker)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flex-reviews-dashboard
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**

   Create `.env` files in both `apps/server` and `apps/web`:

   **`apps/server/.env`**:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/flex_reviews"
   PORT=5000
   FRONTEND_URL="http://localhost:3000"
   ```

   **`apps/web/.env.local`**:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```

4. **Set up database**
   ```bash
   cd apps/server
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start development servers**
   ```bash
   # From root directory
   yarn dev
   ```

   This starts:
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000

## 🐳 Docker Setup

### Using Docker Compose

1. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

2. **Access services**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - PostgreSQL: localhost:5432

3. **Run migrations and seed**
   ```bash
   docker-compose exec server npx prisma migrate deploy
   docker-compose exec server npx prisma db seed
   ```

### Docker Compose Services

- **web**: Next.js frontend (port 3000)
- **server**: NestJS backend (port 5000)
- **postgres**: PostgreSQL database (port 5432)

### Notes
- Database data persists in Docker volume
- Environment variables are configured in `docker-compose.yml`
- Services communicate via Docker network (service names as hostnames)

## 📁 Project Structure

```
flex-reviews-dashboard/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/         # Next.js app router
│   │   │   ├── components/  # React components
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   └── lib/         # Utilities, API client
│   │   └── package.json
│   └── server/              # NestJS backend
│       ├── src/
│       │   ├── review/      # Review module
│       │   ├── prisma/      # Prisma service
│       │   └── main.ts      # Application entry
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── seeders/     # Database seeders
│       └── package.json
├── docker-compose.yml
├── package.json             # Turborepo root
└── README.md
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Dashboard loads with review statistics
- [ ] Filter reviews by status, property, channel
- [ ] Pagination works correctly
- [ ] Approve/decline reviews updates status
- [ ] Public property page shows only approved reviews
- [ ] Property performance table displays correctly

## 📝 Notes

- Database is seeded with 40 reviews across 6 properties
- All reviews start as unapproved (`isApproved: false`)
- Frontend uses normalized `Review` type (different from backend `ApiReview`)
- CORS is enabled for `http://localhost:3000` in development

## 📄 License

This project was created for a technical assessment.

---

**Built with ❤️ using NestJS, Next.js, and PostgreSQL**
