import cors from "cors";
import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { PORT } from "./config/constants";
import { html } from "./template/index.html";

const app: Express = express();
const server = createServer(app);
const swaggerFile = require("./config/swagger-output.json");
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get("/", (req: Request, res: Response) => {
  res.send(html);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
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
