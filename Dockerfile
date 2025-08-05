# Stage 1: Build
FROM node:alpine AS builder

WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:alpine

WORKDIR /app

# Copy only built code and deps
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install

# Start the app
CMD ["node", "dist/index.js"]
