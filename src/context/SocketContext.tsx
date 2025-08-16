"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { connectSocket, disconnectSocket } from "../utils/socket";

import { SocketContextType } from "../types/SocketContextType";
import { useRouter } from "next/navigation";
import React from "react";

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  connectToServer: () => {},
  disconnectFromServer: () => {},
  setPlayerName: (name: string) => {},
  playerName: "",
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [playerName, setPlayerName] = useState<string>("");
  const router = useRouter();

  const connectToServer = () => {
    const newSocket = connectSocket(playerName);

    // Set up event listeners
    newSocket.on("connect", () => {
      setIsConnected(true);
      router.push("/lobby");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      router.push("/");
    });

    setSocket(newSocket);
  };

  const disconnectFromServer = () => {
    if (socket) {
      disconnectSocket();
      setSocket(null);
      socket.off("connect");
      socket.off("disconnect");
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
      value={{
        socket,
        isConnected,
        connectToServer,
        disconnectFromServer,
        playerName,
        setPlayerName,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
