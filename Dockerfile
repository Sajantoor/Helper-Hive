FROM node:22-alpine

WORKDIR /app

COPY server/package*.json ./server/

WORKDIR /app/server
RUN npm ci

WORKDIR /app
COPY common /app/common
COPY server /app/server

WORKDIR /app/server

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]