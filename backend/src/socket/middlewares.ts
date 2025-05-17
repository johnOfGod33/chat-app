import { ExtendedError, Socket } from "socket.io";

export const checkUser = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error("No username found in handshake"));
  }

  socket.username = username;

  next();
};
