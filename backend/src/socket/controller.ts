import { Server, Socket } from "socket.io";
import { Message, User } from "./schema";

export const handleSocketConnection = (socket: Socket, io: Server) => {
  // all users emitter
  handleAllUsers(socket, io);
  // new message event listener
  handleNewMessageEvent(socket, io);
  // disconnect event listener
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

export const handleNewMessageEvent = (socket: Socket, io: Server) => {
  socket.on("new_message", (message: Message) => {
    console.log({ message });

    // broadcast message to all clients
    io.emit("receive_message", message);
  });
};

export const handleAllUsers = (socket: Socket, io: Server) => {
  const users: User[] = [];

  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }

  console.log({ users, message: "users connected" });

  socket.emit("users", users);
};
