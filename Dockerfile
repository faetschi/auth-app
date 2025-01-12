# Use Node.js LTS version as base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY ./src ./src

# Expose the application port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
