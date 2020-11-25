import * as path from "path";
import { config as dotenvConfig } from "dotenv";

export interface EnvConfig {
  SERVER_PORT: number;
  DATABASE_OPTION: number;
  DATABASE_USER: string;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_PASS: string;
  DATABASE_PORT: number;
}

export function getEnv(): Partial<EnvConfig> {
  dotenvConfig({ path: path.resolve(process.cwd(), ".env") });

  return process.env;
}
