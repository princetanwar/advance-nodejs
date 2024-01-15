import { Router } from "express";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { checkAuth } from "../../../middleware/checkAuth";

const appRouter = Router();

appRouter.post("/login", (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.send("insufficient data");
      return;
    }
    if (email !== "test@mail.com") {
      res.send("invalid email");
      return;
    }
    if (password !== "123") {
      res.send("invalid password");
      return;
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET as string);
    res.json({ accessToken });
  } catch (error) {
    console.log({ error });
    res.send(error);
  }
});

declare global {
  namespace Express {
    interface Request {
      decodedToken?: any;
      // Add other custom properties as needed
    }
  }
}

appRouter.get("/secure-file", checkAuth, (req, res) => {
  try {
    console.log(req.decodedToken);
    const filepath = path.join(__dirname, "../../../data/secure.txt");
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

export default appRouter;
