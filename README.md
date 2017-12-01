# Memebattle backend

## Build Setup

``` bash
# install dependencies
npm install

# copy .env_s to .env and replace existed variables whith your

# install pg-migrate
npm install -g pg-migrate

# use pg-migrate for migrate db
pg-migrate -u postgres://postgres@localhost/membattle -d ./db/migrate

# start server
npm start

# or use nodemon for start serve with hot reload
npm run dev

```