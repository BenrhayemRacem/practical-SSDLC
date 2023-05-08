 #stage 1
FROM node:lts as node


WORKDIR /app

COPY package.json .

COPY package-lock.json .
COPY ./tsconfig.json .
COPY ./angular.json .
COPY ./tsconfig.app.json .
COPY ./tsconfig.spec.json .
RUN npm install --ignore-scripts 

COPY ./src ./src

RUN node_modules/.bin/ng analytics disable --global
RUN node_modules/.bin/ng build --configuration production --aot
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html
