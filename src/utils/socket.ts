import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io("ws://localhost:5000", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const sendMessage = (message: string) => {
  if (socket) {
    socket.emit("message", message);
  }
};

export const receiveMessage = (callback: (message: string) => void) => {
  if (socket) {
    socket.on("message", callback);
  }
};
