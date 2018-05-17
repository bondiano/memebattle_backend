FROM node:9

WORKDIR /var/www/backend

ADD package.json .
ADD yarn.lock .

COPY . .

RUN npm install -g pm2 yarn
RUN yarn --pure-lockfile --network-timeout 1000000

EXPOSE 8080
EXPOSE 8000
EXPOSE 8001

CMD pm2-runtime ecosystem.config.js && pm2 logs
