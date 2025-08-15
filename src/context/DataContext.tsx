"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Message } from "../types/Message";
import { useSocket } from "./SocketContext";

interface DataContextType {
  messages: Message[];
  addMessage: (msg: Message) => void;
  setMessages: (msgs: Message[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const { socket } = useSocket();

  // Listen for incoming messages from the server
  useEffect(() => {
    if (!socket) return;
    const handleMessage = (msg: Message) => {
      setMessages((prev) => [
        ...prev,
        { ...msg, timestamp: new Date(msg.timestamp) },
      ]);
    };
    socket.on("chat:message", handleMessage);
    return () => {
      socket.off("chat:message", handleMessage);
    };
  }, [socket]);

  // Send message to server and add locally
  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    if (socket) {
      socket.emit("chat:message", msg);
    }
  };

  return (
    <DataContext.Provider value={{ messages, addMessage, setMessages }}>
      {children}
    </DataContext.Provider>
  );
}
