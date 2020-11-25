# Tic-Tac-Toe backend

## Setup

Install dependencies:

    npm install

Create environment `.env` file:

    SERVER_PORT=YOUR_SERVER_PORT
    DATABASE_OPTION= 1 == PostgreSQL || 2 == SQLite
    DATABASE_USER='YOUR_DB_USERNAME' (needed if DATABASE_OPTION == 1)
    DATABASE_HOST='YOUR_HOST_ADDRESS' (needed if DATABASE_OPTION == 1)
    DATABASE_NAME='YOUR_DB_NAME' (needed if DATABASE_OPTION == 1)
    DATABASE_PASS='YOUR_DB_PASSWORD' (needed if DATABASE_OPTION == 1)
    DATABASE_PORT=YOUR_DB_PORT (needed if DATABASE_OPTION == 1)

Generate routes:

    npm run generate

Start:

    npm run start

open another terminal and check:

    npm run test


