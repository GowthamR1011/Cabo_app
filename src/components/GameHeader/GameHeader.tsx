"use client";
import React from "react";
import Button from "@/components/ui/Button";
import { useSocket } from "@/context/SocketContext";

type Props = {};

export default function GameHeader({}: Props) {
  const { disconnectFromServer } = useSocket();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Cabo Online</h1>
      <Button
        className="bg-blue-500 px-4 py-2 rounded flex-end"
        onClick={() => disconnectFromServer()}
      >
        Leave Game
      </Button>
    </div>
  );
}
