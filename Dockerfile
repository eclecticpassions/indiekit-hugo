# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22

# sharp image lib fails on Alpine ARM64 (Pi), use Debian Node instead
#FROM node:${NODE_VERSION}-alpine
FROM node:22-bookworm-slim

# Create app directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Install node modules
COPY package*.json ./

# Pi optimized
COPY package*.json ./
RUN npm ci --no-optional --no-audit

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the server by default, this can be overwritten at runtime
# Equiv to "indiekit serve"
CMD [ "npm", "start" ]