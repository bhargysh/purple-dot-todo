FROM node:14-alpine3.12

# Create app directory
WORKDIR /usr/server

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

CMD [ "npm", "run", "start" ]
