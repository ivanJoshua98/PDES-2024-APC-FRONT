# Base image
FROM node:18-alpine

# Make app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all content to the app directory
COPY . .

# Build the React app
RUN npm run build

# Set the startup command
CMD ["npx", "serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000
