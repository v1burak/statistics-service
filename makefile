DC_DEV=docker compose -f docker-compose.dev.yml
DC_PROD=docker compose -f docker-compose.prod.yml

dev-up:
	$(DC_DEV) up --build -d

dev-down:
	$(DC_DEV) down

prod-up:
	$(DC_PROD) up --build -d

prod-down:
	$(DC_PROD) down

logs:
	$(DC_DEV) logs -f

ps:
	$(DC_DEV) ps

restart-dev:
	$(DC_DEV) down && $(DC_DEV) up --build -d

restart-prod:
	$(DC_PROD) down && $(DC_PROD) up --build -d