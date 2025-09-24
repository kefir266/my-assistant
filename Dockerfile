FROM node:24.1.0-alpine3.21

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

ENTRYPOINT [ "npm", "run", "start:prod" ]
