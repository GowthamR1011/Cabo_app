"use client";
import React, { useState } from "react";
import { Room } from "@/types/Room";
import Button from "@/components/ui/Button";

import { useSocket } from "@/context/SocketContext";

interface LobbyProps {}

export default function Lobby() {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const { playerName } = useSocket();

  const handleCreateRoom = () => {
    if (!roomName) return;
    const newRoom: Room = {
      id: Math.random().toString(36).slice(2),
      name: roomName,
      players: [playerName],
      maxPlayers: 6,
    };
    setRooms((prev) => [...prev, newRoom]);
    // onJoin(newRoom);
  };

  const handleJoinRoom = (room: Room) => {
    if (!playerName) return;
    if (room.players.length < room.maxPlayers) {
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Lobby</h2>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <Button
        className="w-full mb-4 bg-blue-500 text-white"
        onClick={handleCreateRoom}
      >
        Create Room
      </Button>
      <div>
        <h3 className="font-semibold mb-2">Available Rooms</h3>
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            <span>
              {room.name} ({room.players.length}/{room.maxPlayers})
            </span>
            <Button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => handleJoinRoom(room)}
              disabled={room.players.length >= room.maxPlayers}
            >
              Join
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
