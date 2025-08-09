"use client";
import { useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export default function Home() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectToServer = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
    const newSocket = io("ws://localhost:5000");
    newSocket.on("connect", () => {
      setMessage("Connected to the server");
    });

    setSocket(newSocket);
  }, [socket]);

  return (
    <div className="flex justify-center w-full flex-col items-center h-screen">
      <h1 className="text-2xl font-bold">Cabo - Online Card Game</h1>
      <p className="text-lg">Welcome to the game!</p>
      {message ? (
        <>
          <p className="text-green-500">{message}</p>
        </>
      ) : (
        <button
          className="p-2 bg-blue-500 text-white rounded cursor-pointer"
          onClick={connectToServer}
        >
          Connect to Server
        </button>
      )}
    </div>
  );
}
