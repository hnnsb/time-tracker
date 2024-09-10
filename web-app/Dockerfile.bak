# Stage 1: Build the application
FROM node:20 AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application code
COPY . .

ARG APP_VERSION
ENV NEXT_PUBLIC_APP_VERSION=$APP_VERSION
RUN npm run build

# Stage 2: Serve the application
FROM base AS runner

# Set working directory
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
# Expose port
EXPOSE 3000
ENV PORT 3000

ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]
