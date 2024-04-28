# Use the official Node.js 14 (or latest) LTS image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 3000 (the port that React uses by default)
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "start"]

