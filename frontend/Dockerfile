# ========================
# Stage 1 — Build
# ========================
FROM node:18-alpine AS builder

WORKDIR /app

# Install only what’s needed to build
COPY package*.json ./
RUN npm ci

# Copy the rest of the source
COPY . .

# Build the Nuxt 3 application
RUN npm run build

# ========================
# Stage 2 — Runtime
# ========================
FROM node:18-alpine

WORKDIR /app

# Copy only what's needed for production runtime
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]