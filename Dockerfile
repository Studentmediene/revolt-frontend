FROM node:9-alpine

WORKDIR /srv/app

RUN apk add --update --no-cache git openssh

COPY package.json .
COPY package-lock.json .
RUN npm install
