# apps/api/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package.json yarn.lock turbo.json ./

# Copy app source
COPY apps/server ./apps/server
COPY apps/server/prisma ./apps/server/prisma

# Install dependencies (including turbo)
RUN yarn install --frozen-lockfile


# Build the NestJS app
RUN yarn turbo run build --filter=api

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# Run migrations on startup
CMD ["sh", "-c", "yarn prisma migrate deploy && yarn prisma:seed && node dist/main.js"]