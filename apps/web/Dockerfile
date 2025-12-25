# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20-alpine AS deps

# Install build dependencies
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy root package files for workspace setup
COPY package.json yarn.lock turbo.json ./
COPY packages ./packages

# Copy web package.json
COPY apps/web/package.json ./apps/web/

# Install dependencies using yarn workspaces
RUN yarn install --frozen-lockfile --network-timeout 1000000

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages ./packages

# Copy workspace configuration
COPY package.json yarn.lock turbo.json ./
COPY apps/web/tsconfig*.json ./apps/web/

COPY packages ./packages

# Copy web source code
COPY apps/web ./apps/web

# Set build-time environment variable (can be overridden via ARG)
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build Next.js application
WORKDIR /app
RUN yarn turbo run build --filter=web

# ============================================
# Stage 3: Production Runner
# ============================================
FROM node:20-alpine AS runner

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder
# Next.js standalone output creates a minimal server in .next/standalone
# The structure depends on the monorepo setup - copy the standalone directory
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start Next.js server (standalone mode creates server.js at the root of standalone)
# For monorepo, it may be at apps/web/server.js or server.js - adjust if needed
CMD ["node", "apps/web/server.js"]
