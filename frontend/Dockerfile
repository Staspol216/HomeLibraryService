FROM node:18-alpine as build-stage

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]