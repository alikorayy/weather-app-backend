#!/bin/sh

echo "Running Prisma generate & migrate..."
npx prisma generate
npx prisma migrate deploy

echo "Starting backend..."
npm run dev