FROM node:20-bullseye

# Enable corepack for pnpm
RUN corepack enable

# Set pnpm configuration
ENV PNPM_HOME="/home/node/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Create pnpm directory with proper permissions
RUN mkdir -p /home/node/.local/share/pnpm && \
    chown -R node:node /home/node/.local/share/pnpm

# Install global packages
RUN npm install -g turbo@latest

# Install additional tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Switch to node user
USER node

# Set working directory
WORKDIR /workspace

# Configure pnpm to use shared store
RUN pnpm config set store-dir /home/node/.local/share/pnpm

# Expose common ports for Vite development
# EXPOSE 5173
#EXPOSE 3000 3001 5173 5174 4173 4174
