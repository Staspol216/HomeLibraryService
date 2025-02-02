FROM node:18-alpine

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start:dev"]