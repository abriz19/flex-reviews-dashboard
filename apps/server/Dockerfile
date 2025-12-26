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

# Copy package.json and yarn.lock
COPY --from=builder --chown=nestjs:nodejs /app/apps/server/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/yarn.lock ./yarn.lock

# Copy Prisma schema and migrations
COPY --from=builder --chown=nestjs:nodejs /app/apps/server/prisma ./prisma

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/apps/server/dist ./dist

# Install production dependencies + Prisma CLI (needed for migrate)
RUN yarn install --production --frozen-lockfile --network-timeout 1000000 && \
    yarn add prisma@6.19.1 && \  # ← Only prisma CLI needed in prod for migrate
    npx prisma generate && \
    yarn cache clean

# Fix permissions
RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run migrations and start server (NO seed — manual only)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]