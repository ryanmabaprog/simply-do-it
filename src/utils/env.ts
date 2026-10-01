import dotenv from "dotenv";

dotenv.config();

type Env = {
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    POSTGRES_DB_CONN_STRING: string;
    PORT: number;
}

const env: Env = {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "",
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "",
    POSTGRES_DB_CONN_STRING: process.env.POSTGRES_DB_CONN_STRING || "",
    PORT: Number(process.env.PORT) || 3000,
};
export default env;
