"use client";
import { useSocket } from "../context/SocketContext";
import Button from "../components/ui/Button";

export default function Home() {
  const { isConnected, connectToServer, disconnectFromServer } = useSocket();

  return (
    <div className="flex justify-center w-full flex-col items-center h-screen">
      <h1 className="text-2xl font-bold">Cabo - Online Card Game</h1>
      <p className="text-lg">Welcome to the game!</p>
      {isConnected ? (
        <>
          <p className="text-green-500">Connected to the server</p>
          <Button
            onClick={() => disconnectFromServer()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Disconnect
          </Button>
        </>
      ) : (
        <>
          <p className="text-red-500">Not Connected to the server...</p>
          <Button
            onClick={() => connectToServer()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Connect
          </Button>
        </>
      )}
    </div>
  );
}
