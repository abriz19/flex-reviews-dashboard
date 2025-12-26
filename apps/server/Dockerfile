# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20-alpine AS deps

# Install build dependencies for native modules
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy root package files for workspace setup
COPY package.json yarn.lock turbo.json ./
COPY apps/server/tsconfig*.json ./apps/server/


# Copy server package.json
COPY apps/server/package.json ./apps/server/

# Install dependencies using yarn workspaces
RUN yarn install --frozen-lockfile --network-timeout 1000000

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/server/node_modules ./apps/server/node_modules

# Copy workspace configuration
COPY package.json yarn.lock turbo.json ./
COPY apps/server/tsconfig*.json ./apps/server/


# Copy server source code and Prisma schema
COPY apps/server ./apps/server

# Generate Prisma Client
WORKDIR /app/apps/server
RUN npx prisma generate

# Build the NestJS application
WORKDIR /app
RUN yarn turbo run build --filter=server

# ============================================
# Stage 3: Production
# ============================================
FROM node:20-alpine AS runner

# Install yarn for dependency management
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

WORKDIR /app

# Copy package.json and yarn.lock for dependency installation
COPY --from=builder --chown=nestjs:nodejs /app/apps/server/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/yarn.lock ./yarn.lock

# Copy Prisma schema and migrations
COPY --from=builder --chown=nestjs:nodejs /app/apps/server/prisma ./prisma

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/apps/server/dist ./dist

# Install only production dependencies and Prisma CLI
RUN yarn install --production --frozen-lockfile --network-timeout 1000000 && \
    yarn add -D prisma@6.19.1 ts-node typescript tsconfig-paths && \
    npx prisma generate && \
    yarn cache clean


# Fix permissions for all files
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run migrations, seed, and start server
CMD ["sh", "-c", "npx prisma migrate deploy && yarn prisma:seed && node dist/main.js"]
