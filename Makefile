up:
	docker-compose run -d db 
	npm run dev

init:
	docker-compose build db
	npm install
	npx prisma generate
	npx prisma migrate dev --name init
	npm run dev

reset_db:
	npx prisma migrate reset --force
	npx prisma generate