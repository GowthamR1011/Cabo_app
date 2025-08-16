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
import { Room } from "@/types/Room";

interface DataContextType {
  messages: Message[];
  addMessage: (msg: Message) => void;
  setMessages: (msgs: Message[]) => void;
  rooms: Room[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
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

  useEffect(() => {
    if (!socket) return;
    const handleRoomAvailable = (roomList: Room[]) => {
      setRooms(roomList);
    };
    socket.on("rooms:available", handleRoomAvailable);
    return () => {
      socket.off("room:available", handleRoomAvailable);
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
    <DataContext.Provider value={{ messages, addMessage, setMessages, rooms }}>
      {children}
    </DataContext.Provider>
  );
}
