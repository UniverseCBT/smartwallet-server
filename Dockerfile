FROM node:14

WORKDIR /home/app

COPY package*.json .

RUN yarn install

COPY . .
