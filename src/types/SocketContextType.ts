import { Socket } from "socket.io-client";
export interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connectToServer: Function;
  disconnectFromServer: Function;
}
