#Use Node.js 18 for Vite + React (supports structuredClone)
FROM node:18 AS build

WORKDIR /app

#Copy and install dependencies
COPY package*.json ./
COPY . .
RUN npm install

#Copy the rest of the app and build
RUN npm run build

#Use nginx to serve the build output
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

#Expose port 5173 for development purposes
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]