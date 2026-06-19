# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

# ---- Production stage ----
FROM node:20-alpine AS production

RUN apk update && apk upgrade --no-cache && \
    addgroup -S appgroup && adduser -S appuser -G appgroup && \
    apk --no-cache add dumb-init

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY . .

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 5000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]