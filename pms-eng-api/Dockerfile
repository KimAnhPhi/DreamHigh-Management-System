# DreamHigh PMS API — build & chạy production (PostgreSQL ngoài container, vd. Aiven).
# Build: docker build -t dreamhigh-api .
# Chạy: cần env DATABASE_URL, DIRECT_URL, JWT_SECRET, CORS_ORIGINS (và tu�� chọn GOOGLE_CLIENT_ID).
# Migrate: lệnh dư��i chạy migrate trư��c khi start; lần đầu hoặc sau khi pull migration mới.

FROM node:22-bookworm-slim AS runner
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY prisma ./prisma
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src

RUN npx prisma generate && npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
