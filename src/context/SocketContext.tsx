"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { connectSocket, disconnectSocket } from "../utils/socket";

import { SocketContextType } from "../types/SocketContextType";

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  connectToServer: () => {},
  disconnectFromServer: () => {},
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectToServer = () => {
    const newSocket = connectSocket();

    // Set up event listeners
    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(newSocket);
  };

  const disconnectFromServer = () => {
    if (socket) {
      socket.off("connect");
      socket.off("disconnect");
      disconnectSocket();
      setSocket(null);
      setIsConnected(false);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnectFromServer();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, connectToServer, disconnectFromServer }}
    >
      {children}
    </SocketContext.Provider>
  );
}
