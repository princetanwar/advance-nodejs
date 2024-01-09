import { IncomingMessage, ServerResponse, Server as IServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { Express } from "express";

interface IProps {
  httpServer: IServer<typeof IncomingMessage, typeof ServerResponse>;
  app: Express;
}

export const setupSocket = ({ httpServer, app }: IProps) => {
  app.get("/websocket/chat", (_, res) => {
    res.sendFile(path.join(__dirname, "../../html/index.html"));
  });

  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("chat message", (msg) => {
      // socket.emit("chat message", msg);
      console.log({ msg });
      socket.broadcast.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
