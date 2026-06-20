# Adjust NODE_VERSION as desired
#ARG NODE_VERSION=22
ARG NODE_VERSION=24

# sharp image lib fails on Alpine ARM64 (Pi), use Debian 12 Node instead
#FROM node:${NODE_VERSION}-alpine
#FROM node:22-bookworm-slim
FROM node:${NODE_VERSION}-bookworm-slim

# https://sharp.pixelplumbing.com/install/#building-from-source
# Install Sharp dependencies for node:22-bookworm-slim on arm64 ===
# RUN apt-get update && apt-get install -y \
#     libvips42 \
#     && rm -rf /var/lib/apt/lists/*

# Install Sharp dependencies
RUN apt-get update && apt-get install -y \
    libvips42 \
    && rm -rf /var/lib/apt/lists/*

# Force Sharp to use the prebuilt linux-arm64 binary
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1

# Create app directory
WORKDIR /app

# Set production environment to optimize npm
ENV NODE_ENV=production

# Install node modules
COPY package*.json ./

# Pi optimized, do not use --no-optional as that skips `sharp` and causes Sharp failure
#RUN npm ci --include=optional --no-audit \
 #   && npm install --platform=linux --arch=arm64 sharp
 
# Use prebuilt sharp for Pi (no build tools needed)
RUN npm ci --omit=optional --no-audit 

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the server by default, this can be overwritten at runtime
# Equiv to "indiekit serve"
CMD [ "npm", "start" ]