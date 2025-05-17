declare module "socket.io" {
  interface Socket {
    username: string;
  }
}

export interface Message {
  name: string;
  profileImgUrl: string;
  text: string;
}

export interface User {
  userID: string;
  username: string;
}
