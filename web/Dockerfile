FROM node:21.5.0-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./package.json .

RUN npm install

COPY . .

CMD npm start.prod