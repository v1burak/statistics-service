#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for DB at $DB_HOST:$DB_PORT..."
  sleep 1
done

echo "Running migrations..."
npm run db:migrate:prod

echo "Starting service..."
exec node dist/src/server.js