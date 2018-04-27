FROM node:9

RUN npm install -g yarn

WORKDIR /var/www/backend

ADD package.json .
ADD yarn.lock .

COPY . .

EXPOSE 8080

CMD yarn --pure-lockfile && yarn start