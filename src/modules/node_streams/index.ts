import { NextFunction, Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import { Transform } from "stream";

const appRouter = Router();

const filepath = path.join(__dirname, "../../../data/bigFile.txt");

const beforeApiChecks = (_: Request,res:Response,next:NextFunction) => {
	const fileExists = fs.existsSync(filepath);
	if (!fileExists) {
	  res.send('please run "npm run create-mock" first \n');
	  return;
	}
	next()

};

// send data as it receive using streams.
appRouter.get("/stream-big-file", (_, res) => {
  try {
    const readableStream = fs.createReadStream(filepath);

    readableStream.pipe(res);
  } catch (error) {
    console.log(error);
    if (typeof error === "string") {
      res.send(`error - ${error}`);
    } else if (error instanceof Error) {
      res.send(`error - ${error.message}`);
    }
  }
});

// below is a non-blocking code but it will load complete file in memory before sending any data.
appRouter.get("/big-file", (_, res) => {
  try {
    const filepath = path.join(__dirname, "../../../data/bigFile.txt");
    const fileExists = fs.existsSync(filepath);
    if (!fileExists) {
      res.send('please run "npm run create-mock" first \n');
      return;
    }

    fs.readFile(filepath, (err, data) => {
      if (err) {
        console.log(err);
        res.send(`error in file read ${err.message}`);
        return;
      }
      res.send(data);
    });
  } catch (error) {
    console.log(error);
    if (typeof error === "string") {
      res.send(`error - ${error}`);
    } else if (error instanceof Error) {
      res.send(`error - ${error.message}`);
    }
  }
});

const uppercaseTransformer = new Transform({
  transform: (chunk: Buffer, enc, cb) => {
    const d = chunk.toString().toUpperCase();
    cb(null, d);
  },
});

// send data as it receive using streams.
appRouter.get("/stream-big-file-uppercase",beforeApiChecks, (_, res) => {
  try {
    const filepath = path.join(__dirname, "../../../data/bigFile.txt");
    const fileExists = fs.existsSync(filepath);
    if (!fileExists) {
      res.send('please run "npm run create-mock" first \n');
      return;
    }
    const readableStream = fs.createReadStream(filepath);
    readableStream.pipe(uppercaseTransformer).pipe(res);

    //     readableStream.pipe(res);
  } catch (error) {
    console.log(error);
    if (typeof error === "string") {
      res.send(`error - ${error}`);
    } else if (error instanceof Error) {
      res.send(`error - ${error.message}`);
    }
  }
});

export default appRouter;
