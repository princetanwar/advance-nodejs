import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers["authorization"];
  console.log({ authToken });
  try {
    if (!authToken) {
      res.status(403);
      res.json("un-authorized");
      return;
    }

    const decodedToken = jwt.verify(
      authToken,
      process.env.JWT_SECRET as string,
      { maxAge: "15s" }
    );
    console.log({ decodedToken });

    (req as any).decodedToken = decodedToken;

    next();
  } catch (error) {
    if (typeof error === "string") {
      res.send(`error - ${error}`);
    } else if (error instanceof Error) {
      res.send(`error - ${error.message}`);
    }
  }
};
