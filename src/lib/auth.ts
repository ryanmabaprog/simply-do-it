import { betterAuth, env } from "better-auth";
import { database } from "./pg.js";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: database,
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true },
  plugin: [nextCookies()]
},
  );
