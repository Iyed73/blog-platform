FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx nx build blog-api

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist/apps/blog-api ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "main.js"]
