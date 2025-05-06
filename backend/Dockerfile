# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /code

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --prod

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the port the app runs on
EXPOSE ${PORT} 

# Command to run the application
CMD ["node", "dist/server.js"]