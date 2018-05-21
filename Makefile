up:
	docker-compose up -d
down:
	docker-compose down
build:
	docker-compose build --no-cache
start:
	docker-compose up --build
yarn:
	docker exec meme_nodejs bash -c "yarn"
migrate:
	docker exec meme_nodejs bash -c "yarn migrate"