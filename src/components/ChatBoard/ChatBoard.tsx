"use client";
import { useState } from "react";
import ChatMessage from "@/components/ChatBoard/ChatMessage";
import Button from "@/components/ui/Button";

import { useSocket } from "@/context/SocketContext";

export default function ChatBoard() {
  const { messages, sendMessage } = useSocket();
  const [message, setMessage] = useState("");

  const submitMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <div>
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        ) : (
          <p>No messages to display</p>
        )}
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="border p-2 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={submitMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
