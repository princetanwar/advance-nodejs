import express from "express";
import "dotenv/config";

import streamRouter from "./modules/node_streams";
import authRouter from "./modules/auth";
import { setupSocket } from "./modules/sockets";
import bodyParser from "body-parser";

const main = () => {
  const app = express();
  const PORT = process.env.PORT || 8080;
  const httpServer = app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
  });

  app.use(bodyParser.json());

  app.use("/streams", streamRouter);
  app.use("/auth", authRouter);

  setupSocket({ httpServer, app });
};

main();
