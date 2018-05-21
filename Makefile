up:
	sudo docker-compose up -d
down:
	sudo docker-compose down
build:
	sudo docker-compose build --no-cache
start:
	sudo docker-compose up --build
yarn:
	sudo docker exec meme_nodejs bash -c "yarn"
migrate:
	sudo docker exec meme_nodejs bash -c "yarn migrate"