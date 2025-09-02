FROM node:lts-alpine AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=turborepo-nestjs --docker

FROM node:lts-alpine AS installer
WORKDIR /app
# Copy the pruned lockfile and package.json files
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install --frozen-lockfile

FROM node:lts-alpine AS builder
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN
WORKDIR /app
# Copy installed dependencies
COPY --from=installer /app/ .
# Copy the full source code
COPY --from=pruner /app/out/full/ .
RUN npm run build

FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy the built application
COPY --from=builder /app/apps/turborepo-nestjs/dist ./apps/turborepo-nestjs/dist
COPY --from=builder /app/apps/turborepo-nestjs/package.json ./apps/turborepo-nestjs/package.json
# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
WORKDIR /app/apps/turborepo-nestjs
CMD ["npm", "run", "start:prod"]
