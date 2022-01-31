FROM node:17-alpine

# Create app directory
WORKDIR /usr/server

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5001

CMD [ "npm", "run", "start" ]
