"use client";
import { useSocket } from "../context/SocketContext";
import Button from "../components/ui/Button";

export default function Home() {
  const { connectToServer } = useSocket();

  return (
    <div className="flex justify-center w-full flex-col items-center h-screen">
      <h1 className="text-2xl font-bold">Cabo - Online Card Game</h1>
      <p className="text-lg">Let's Play!</p>

      <Button
        onClick={() => connectToServer()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Play
      </Button>
    </div>
  );
}
