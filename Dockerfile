FROM node:9

WORKDIR /var/www/backend

ADD package.json .

COPY . .

EXPOSE 8080

CMD npm i && node_modules/.bin/nodemon