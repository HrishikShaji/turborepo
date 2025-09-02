FROM node:lts-alpine AS pruner
WORKDIR /app
RUN npm install -g turbo
# Copy from the monorepo root (two levels up)
COPY ../../ .
RUN turbo prune --scope=turborepo-nestjs --docker

FROM node:lts-alpine AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install --frozen-lockfile

FROM node:lts-alpine AS builder
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN npm run build

FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/turborepo-nestjs/dist ./dist
COPY --from=builder /app/apps/turborepo-nestjs/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
CMD ["npm", "run", "start:prod"]
