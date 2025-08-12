"use client";

import ChatBoard from "@/components/ChatBoard/ChatBoard";

type Props = {};

export default function GamePage({}: Props) {
  return (
    <div>
      <div className="flex">
        <div className="flex-1">Player 1</div>
        <div className="flex-1">Player 2</div>
      </div>

      <div className="flex justify-center items-center h-screen">
        <ChatBoard />
      </div>
    </div>
  );
}
