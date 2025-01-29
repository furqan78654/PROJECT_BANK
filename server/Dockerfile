# Use Node.js official image
FROM node:16

# Set the working directory
WORKDIR /app

# Install nodemon globally
RUN npm install -g nodemon

# Copy package.json and package-lock.json (if present) and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the backend port
EXPOSE 7001
RUN chmod +x /app/node_modules/.bin/nodemon

# RUN chmod +x /usr/src/app/node_modules/.bin/nodemon
# RUN sudo chmod +x ./node_modules/nodemon/bin/nodemon.js`

# Command to start the backend server
CMD ["npm", "run", "start"]
