FROM node:9

RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
  && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
  && rm -rf /opt/yarn \
  && mkdir -p /opt/yarn \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/yarn --strip-components=1 \
  && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz


WORKDIR /var/www/backend

ADD package.json package.json
ADD yarn.lock yarn.lock
ADD ecosystem.config.js ecosystem.config.js
ADD .env .env
ADD .sequelizerc .sequelizerc

RUN yarn global add pm2
RUN yarn install --pure-lockfile --network-timeout 1000000

EXPOSE 8080
EXPOSE 8000
EXPOSE 8001

CMD pm2-runtime ecosystem.config.js && pm2 logs
