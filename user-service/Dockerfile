# Path: user-management-service/user-service/Dockerfile

# Use a Node.js base image (version 18-alpine for a lightweight distribution)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's build cache.
# If these files don't change, npm install won't be re-run on subsequent builds.
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
# This copies all files from the current build context (./user-service on host)
# into the /app directory inside the container.
COPY . .

# Expose the port on which the the Express application will be listening.
# This informs Docker that the container uses this port at runtime.
EXPOSE 5000

# Define the command to start the application when the container launches.
# This command points to the main server file within the container's /app directory.
# Based on your project structure, it is now correctly set to 'src/server.js'.
CMD ["node", "src/server.js"]