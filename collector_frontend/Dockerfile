FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React application
RUN npm run build

# Expose port 80 for the container
EXPOSE 3000

# Set the command to run when the container starts
CMD ["sh", "-c", "PORT=${PORT:-3000} npm start"]
