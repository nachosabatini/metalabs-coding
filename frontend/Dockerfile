# Use the official Node.js image as the base image
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend directory to the container
COPY . .

# Build the frontend
RUN npm run build

# Set the command to start the frontend server
CMD ["npm", "start"]