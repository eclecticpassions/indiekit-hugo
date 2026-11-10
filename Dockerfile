# Indikit Beta 31 requires at least v24.22.0 LTS
# Latest is 26.12.1 patched cve node2shell
# https://nodejs.org/en/download/archive/v26.13.0
ARG NODE_VERSION=26.13.0

FROM node:${NODE_VERSION}-bookworm-slim

# Create app directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Install dependencies using clean modern syntax
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Expose port
EXPOSE 3000

# Equiv to "indiekit serve"
CMD ["npm", "start"]