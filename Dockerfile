# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Copy and make the entrypoint executable
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expose the backend port
EXPOSE 5000

# Run app via entrypoint
CMD ["./entrypoint.sh"]
