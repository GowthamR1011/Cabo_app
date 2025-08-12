"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { connectSocket, disconnectSocket } from "../utils/socket";

import { SocketContextType } from "../types/SocketContextType";
import { useRouter } from "next/navigation";
import { Message } from "@/types/Message";

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  messages: [],
  connectToServer: () => {},
  disconnectFromServer: () => {},
  sendMessage: (message: string) => {},
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const router = useRouter();
  const sendMessage = (message: string) => {
    if (socket) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          content: message,
          senderName: "You",
          timestamp: new Date(),
        },
      ]);
      socket.emit("message", message);
    }
  };

  const connectToServer = () => {
    const newSocket = connectSocket();

    // Set up event listeners
    newSocket.on("connect", () => {
      setIsConnected(true);
      router.push("/game");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      router.push("/");
    });

    newSocket.on("message", (message: string) => {
      addMessage({
        id: Date.now().toString(),
        content: message,
        senderName: "Server",
        timestamp: new Date(),
      });
    });

    setSocket(newSocket);
  };

  const disconnectFromServer = () => {
    if (socket) {
      disconnectSocket();
      setSocket(null);
      setMessages([]);
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
        messages,
        connectToServer,
        disconnectFromServer,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
