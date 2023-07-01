# Use the official Node.js image as the base image
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that the application will listen on
EXPOSE 4000

# Run the start command with the wait-for-it script as the entrypoint
CMD ["npm", "start"]