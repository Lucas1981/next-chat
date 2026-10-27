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

# Test connection
# Should output "Script executed successfully."
echo "SELECT 1;" | npx prisma db execute --stdin

# Start Studio with an absolute URL that overrides the config. We need the file://.
npx prisma studio --url "file:///Users/[user]/path/to/repo/dev.db"

# Whenever prisma/schema.prisma changes, run:
# npx prisma generate