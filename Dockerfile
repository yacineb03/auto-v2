# Build stage
FROM node:18-slim as build-stage

WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:18-slim as production-stage

WORKDIR /app

# Better-sqlite3 needs the binary, so we copy it from build
COPY --from=build-stage /app/.output ./.output
COPY --from=build-stage /app/package.json ./package.json

# Create data directory for SQLite
RUN mkdir -p /data

ENV PORT=3000
ENV NODE_ENV=production
ENV DATABASE_PATH=/data/driveflow.sqlite

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
