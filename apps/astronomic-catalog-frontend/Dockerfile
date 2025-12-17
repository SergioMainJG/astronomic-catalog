FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG PUBLIC_CLOUDINARY_CLOUD_NAME
ARG PUBLIC_CLOUDINARY_UPLOAD_PRESET
ARG PUBLIC_API_URL

ENV PUBLIC_CLOUDINARY_CLOUD_NAME=${PUBLIC_CLOUDINARY_CLOUD_NAME}
ENV PUBLIC_CLOUDINARY_UPLOAD_PRESET=${PUBLIC_CLOUDINARY_UPLOAD_PRESET}
ENV PUBLIC_API_URL=${PUBLIC_API_URL}

RUN pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]