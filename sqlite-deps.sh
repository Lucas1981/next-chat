#!/bin/sh

# Install dependencies
npm install @prisma/client @prisma/adapter-better-sqlite3 better-sqlite3 dotenv
npm install -D prisma@7.10.1 @types/better-sqlite3

# Init prisma
# --no-skills skips the .agents, .claude and .windsurf folders
npx prisma init --datasource-provider sqlite --output ../lib/generated/prisma --no-skills

# Generate client and create the database
npx prisma migrate dev --name init

# Writes the client to ./lib/generated/prisma.
npx prisma generate