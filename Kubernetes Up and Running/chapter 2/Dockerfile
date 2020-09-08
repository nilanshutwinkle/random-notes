FROM node:10.22.0-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
