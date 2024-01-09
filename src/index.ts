import express from "express";
import "dotenv/config";

import streamRouter from "./modules/node_streams";
import { setupSocket } from "./modules/sockets";

const main = () => {
  const app = express();
  const PORT = process.env.PORT || 8080;
  const httpServer = app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
  });

  app.use("/streams", streamRouter);

  setupSocket({ httpServer, app });
};

main();
