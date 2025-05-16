# syntax=docker/dockerfile:1

FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies based on lock file when available
COPY package.json package-lock.json* ./
RUN npm install --production=false

# Bundle app source
COPY . .

EXPOSE 5173

# Start React development server (Compose overrides ports)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
