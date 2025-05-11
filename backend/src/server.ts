import cors from "cors";
import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { PORT } from "./config/constants";

const app: Express = express();
const server = createServer(app);
const swaggerFile = require("./config/swagger-output.json");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

declare module "socket.io" {
  interface Socket {
    username: string;
  }
}

interface Message {
  name: string;
  profileImgUrl: string;
  text: string;
}

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

io.use((socket, next) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error("No username found in handshake"));
  }

  socket.username = username;

  next();
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("new_message", (message: Message) => {
    console.log({ message });
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(
    `server is runing, check docs at :  http://localhost:${PORT}/docs`
  );
});
