# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# Copy the project
COPY . /app/

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
