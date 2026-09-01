#!/bin/sh
set -e

echo "Pushing Prisma schema to PostgreSQL database using DATABASE_URL=${DATABASE_URL}..."
npx prisma db push --url "${DATABASE_URL}" --accept-data-loss

echo "Starting QuantFlow Next.js server..."
exec npm run start
