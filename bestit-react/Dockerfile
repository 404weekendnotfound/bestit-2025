# syntax=docker/dockerfile:1

FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies based on lock file when available
COPY package.json package-lock.json* ./
RUN npm install --production=false

# Bundle app source
COPY . .

EXPOSE 3000

# Start React development server (Compose overrides ports)
CMD ["npm", "start"]
