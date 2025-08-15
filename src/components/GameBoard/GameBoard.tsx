"use client";
import React, { useState } from "react";
import { Room } from "@/types/Room";

const MAX_PLAYERS = 6;
const CARDS_PER_PLAYER = 4;

function generateDeck() {
  // Simple deck: 1-52
  return Array.from({ length: 52 }, (_, i) => i + 1);
}

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function GameBoard({ room }: { room: Room }) {
  const [players, setPlayers] = useState<string[]>(room.players);
  const [cards, setCards] = useState<number[][]>(() => {
    const deck = shuffle(generateDeck());
    return players.map((_, i) =>
      deck.slice(i * CARDS_PER_PLAYER, (i + 1) * CARDS_PER_PLAYER)
    );
  });

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Room: {room.name}</h2>
      <div className="grid grid-cols-3 gap-6">
        {players.map((player, idx) => (
          <div key={player} className="bg-gray-100 rounded-lg p-4 shadow">
            <h3 className="font-semibold mb-2">
              Player {idx + 1}: {player}
            </h3>
            <div className="flex gap-2">
              {cards[idx]?.map((card, cidx) => (
                <div
                  key={cidx}
                  className="w-10 h-16 bg-white border rounded flex items-center justify-center text-lg font-bold"
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
