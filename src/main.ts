import { app } from "./app";
import * as http from "http";
import { getEnv } from "./env";
import { Sequelize } from "sequelize";
import * as chalk from "chalk";

const SERVER_PORT = getEnv().SERVER_PORT;
const DATABASE_OPTION = getEnv().DATABASE_OPTION;
const DATABASE_USER = getEnv().DATABASE_USER;
const DATABASE_HOST = getEnv().DATABASE_HOST;
const DATABASE_NAME = getEnv().DATABASE_NAME;
const DATABASE_PASS = getEnv().DATABASE_PASS;
const DATABASE_PORT = getEnv().DATABASE_PORT;

let sequelize;
const server = http.createServer(app);
server.listen(SERVER_PORT);
server.on("listening", async () => {
  console.info(chalk.blue.underline.bold(`Listening on port ${SERVER_PORT}`));

  if (DATABASE_OPTION == 1) {
    sequelize = new Sequelize(`postgres://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`);
  } else if (DATABASE_OPTION == 2) {
    sequelize = new Sequelize('sqlite::memory:');
  } else {
    console.error(chalk.red(`Bad option in .env file: ${DATABASE_OPTION}, please choose 1 or 2`));
  }

  try {
    await sequelize.authenticate();
    console.info("Connection has been established successfully.");
  } catch (error) {
    console.error(chalk.red(`Unable to connect to the database: ${error}`));
  }
});

export { sequelize };