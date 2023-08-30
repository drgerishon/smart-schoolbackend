FROM node:slim

# Set the working directory to the root of the project
WORKDIR /

# Copy the contents of the root directory into the container
COPY . .

# Install npm dependencies
RUN npm install

# Expose port 3001 (matching your application's port)
EXPOSE 3001

# Set the heap size limit for Node.js
ENV NODE_OPTIONS="--max-old-space-size=512"

# Start the Node.js server using nodemon
CMD npm run dev
