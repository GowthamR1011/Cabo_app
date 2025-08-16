"use client";
import React, { useState } from "react";
import { Room } from "@/types/Room";
import Button from "@/components/ui/Button";

import { useSocket } from "@/context/SocketContext";
import { useData } from "@/context/DataContext";

interface LobbyProps {}

export default function Lobby() {
  const { rooms } = useData();
  const { playerName } = useSocket();

  const handleJoinRoom = (room: Room) => {
    if (!playerName) return;
    if (room.players.length < 6) {
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Lobby</h2>

      <div>
        <h3 className="font-semibold mb-2">Available Rooms</h3>
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            <span>
              {room.name} ({room.players.length}/6)
            </span>
            <Button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => handleJoinRoom(room)}
              disabled={room.players.length >= 6}
            >
              Join
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
