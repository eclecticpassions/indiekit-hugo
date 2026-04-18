# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22

# sharp image lib fails on Alpine ARM64 (Pi), use Debian Node instead
#FROM node:${NODE_VERSION}-alpine
FROM node:22-bookworm-slim

# Sharp ARM64 system deps
RUN apt-get update && apt-get install -y \
    libvips42 build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Set production environment to optimize npm
ENV NODE_ENV=production

# Install node modules
COPY package*.json ./

# Pi optimized, do not use --no-optional as that skips `sharp` and causes sharp failure
RUN npm ci --include=optional --no-audit \
    && npm rebuild sharp --build-from-source

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the server by default, this can be overwritten at runtime
# Equiv to "indiekit serve"
CMD [ "npm", "start" ]