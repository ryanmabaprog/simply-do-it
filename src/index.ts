import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import router from "./router.js";
import env from "./utils/env.js";

const app = express();

app.all("/api/auth/{*path}", toNodeHandler(auth));

app.use(express.json());

app.use(router);

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});