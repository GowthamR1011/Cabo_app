import { Socket } from "socket.io-client";
import { Message } from "./Message";
export interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connectToServer: Function;
  disconnectFromServer: Function;
  playerName: string;
  setPlayerName: Function;
}
