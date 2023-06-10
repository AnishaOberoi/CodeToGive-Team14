FROM node:16

# Set the working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install npm
RUN npm install

# Copy files from your host to your current working directory
COPY . .

# Expose port
EXPOSE 8080

# Run the application
CMD [ "node", "index.js" ]
