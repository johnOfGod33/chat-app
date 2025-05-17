import cors from "cors";
import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { PORT } from "./config/constants";
import { setupSocket } from "./socket";

const app: Express = express();
const server = createServer(app);
const swaggerFile = require("./config/swagger-output.json");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

setupSocket(io);

server.listen(PORT, () => {
  console.log(
    `server is runing, check docs at :  http://localhost:${PORT}/docs`
  );
});
