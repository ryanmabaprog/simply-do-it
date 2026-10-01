import express from "express";
import env from "./utils/env.js";

const server = express();

export default server.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});