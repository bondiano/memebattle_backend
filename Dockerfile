FROM node:9

RUN npm install -g yarn

WORKDIR /var/www/backend

ADD package.json .
ADD yarn.lock .

COPY . .

RUN yarn --pure-lockfile --network-timeout 1000000
RUN yarn global add pm2

EXPOSE 8080
EXPOSE 8000
EXPOSE 8001

CMD pm2-runtime ecosystem.config.js && pm2 logs
