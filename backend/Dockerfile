 #stage 1
FROM node:lts as node
WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY ./src ./src
COPY ./.env .
COPY nest-cli.json .
COPY tsconfig.build.json .
COPY tsconfig.json .

RUN node_modules/.bin/nest build

CMD npm run start:prod
