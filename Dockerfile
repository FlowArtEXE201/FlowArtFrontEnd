# Use the official Node.js image as the base image
FROM node:18.19.1

# Set the working directory inside the container
WORKDIR /front-end

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Install the dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Start the app in development mode
CMD ["ng", "serve", "--host", "0.0.0.0"]
