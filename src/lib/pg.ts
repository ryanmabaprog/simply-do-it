import { Pool } from "pg";
import env from "../utils/env.js";

export const database = new Pool({
  connectionString: env.POSTGRES_DB_CONN_STRING,
});