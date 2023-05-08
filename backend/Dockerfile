 #stage 1
FROM node:lts as node
WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install  

COPY . .

RUN node_modules/.bin/nest build 

CMD npm run start:prod