import { Server, Socket } from "socket.io";
import { handleSocketConnection } from "./controller";
import { checkUser } from "./middlewares";

export const setupSocket = (io: Server) => {
  io.use(checkUser);
  io.on("connection", (socket: Socket) => handleSocketConnection(socket, io));
};
