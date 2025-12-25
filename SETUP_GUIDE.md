# Quick Setup Guide

Follow these steps to see your refactored application in action:

## Step 1: Set Up Database

You have two options:

### Option A: Use Docker (Recommended)
```bash
# Start PostgreSQL container
docker-compose up -d

# Wait a few seconds for database to initialize
```

### Option B: Use Local PostgreSQL
Make sure PostgreSQL is running and create a database:
```sql
CREATE DATABASE flex_living;
```

## Step 2: Configure Backend Environment

Create a `.env` file in `apps/server/`:

```bash
cd apps/server
touch .env
```

Add this content (adjust if using local PostgreSQL):
```env
DATABASE_URL="postgresql://username:password@localhost:5434/flex_living?schema=public"
PORT=5000
```

**For Docker setup**, use:
```env
DATABASE_URL="postgresql://username:password@localhost:5434/flex_living?schema=public"
PORT=5000
```

**For local PostgreSQL**, use:
```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/flex_living?schema=public"
PORT=5000
```

## Step 3: Install Dependencies (if not done)

```bash
# From project root
yarn install
# or
npm install
```

## Step 4: Set Up Database Schema

```bash
cd apps/server

# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev

# When prompted for migration name, press Enter to use default
```

## Step 5: Seed the Database

```bash
# Still in apps/server directory
yarn prisma:seed
# or
npm run prisma:seed
```

You should see:
```
[PropertySeeder] Seeding properties...
[ReviewSeeder] Seeding reviews...
[PrismaSeeder] Seeding completed successfully! 🎉
```

## Step 6: Start Backend Server

```bash
# Still in apps/server directory
yarn start:dev
# or
npm run start:dev
```

You should see:
```
Server running on port 5000
```

**Keep this terminal open!**

## Step 7: Start Frontend Server

Open a **new terminal** and run:

```bash
cd apps/web
yarn dev
# or
npm run dev
```

You should see:
```
▲ Next.js 16.1.0
- Local:        http://localhost:3000
```

## Step 8: Access the Application

1. **Dashboard**: Open http://localhost:3000/dashboard
   - You should see reviews loaded from the backend
   - Try filtering, sorting, and pagination
   - Test the approval workflow

2. **Property Page**: Open http://localhost:3000/property/[property-id]
   - Replace `[property-id]` with an actual property ID from your database
   - You can find property IDs by checking the database or API:
     ```bash
     curl http://localhost:5000/api/properties
     ```

3. **API Endpoints**: Test directly:
   - http://localhost:5000/api/properties
   - http://localhost:5000/api/reviews/hostaway?page=1&pageSize=10
   - http://localhost:5000/api/reviews/public

## Troubleshooting

### Database Connection Error
- Check that PostgreSQL is running
- Verify `DATABASE_URL` in `.env` matches your setup
- For Docker: `docker-compose ps` to check container status

### Port Already in Use
- Backend (5000): Change `PORT` in `apps/server/.env`
- Frontend (3000): Change port in `apps/web/package.json` dev script

### CORS Errors
- Make sure backend is running on port 5000
- Check that frontend is on port 3000
- Verify CORS config in `apps/server/src/main.ts`

### No Reviews Showing
- Check if seeding completed successfully
- Verify database has data: `npx prisma studio` (in apps/server)
- Check browser console for API errors

## Verify Everything Works

1. ✅ Backend API responds: http://localhost:5000/api/properties
2. ✅ Dashboard loads reviews from API
3. ✅ Can filter/sort/paginate reviews
4. ✅ Can approve/decline reviews (checkboxes work)
5. ✅ Property pages show approved reviews only
6. ✅ Loading states and error handling work

Enjoy your refactored application! 🎉

