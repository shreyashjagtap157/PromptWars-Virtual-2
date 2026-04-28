# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .

# Inject build args for Next.js static site generation
ARG NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBf1Ryfr9HlE2AGBEY5koSpvkPexgsBMs0
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gen-lang-client-0949773976.firebaseapp.com
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID=gen-lang-client-0949773976
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gen-lang-client-0949773976.firebasestorage.app
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=609095350122
ARG NEXT_PUBLIC_FIREBASE_APP_ID=1:609095350122:web:2b56642fa1103d3dc11713

RUN NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY \
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN \
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID \
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET \
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID \
    NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID \
    npm run build

# Stage 2: Build Backend
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine
WORKDIR /app

# Install concurrently for multi-process management
RUN npm install -g concurrently

# Copy Backend
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY backend/package.json ./backend/

# Copy Frontend
COPY --from=frontend-builder /app/frontend/.next/standalone ./frontend/
COPY --from=frontend-builder /app/frontend/.next/static ./frontend/.next/static
COPY --from=frontend-builder /app/frontend/public ./frontend/public

# Configure internal routing
ENV NODE_ENV=production
ENV BACKEND_URL=http://localhost:3001

CMD ["concurrently", "\"PORT=3001 node backend/dist/index.js\"", "\"node frontend/server.js\""]
