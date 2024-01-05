import express from "express";
import 'dotenv/config'


import streamRouter from "./modules/node_streams";


const main = () => {
  const app = express();
  app.use("/streams", streamRouter);

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT,()=>{

	console.log(`server running on PORT ${PORT}`)
  });
};

main();
