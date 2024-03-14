FROM node:lts-alpine

EXPOSE 3333

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:api" ]