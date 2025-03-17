FROM node:23.9.0-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY /src /app/src

EXPOSE 3000

CMD [ "npm", "run", "dev"]