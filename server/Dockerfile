# Use Node.js official image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present) and install dependencies
# This allows Docker to cache the dependencies layer for future builds
COPY package*.json ./
COPY . .
RUN npm install

# Copy the rest of the application files

# Expose the backend port
EXPOSE 7001

# Command to start the backend server
CMD ["npm", "start"]
