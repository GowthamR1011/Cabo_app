"use client";
import { useState } from "react";
import { useData } from "@/context/DataContext";
import Button from "@/components/ui/Button";

export default function ChatBoard() {
  const { messages, addMessage } = useData();
  const [message, setMessage] = useState("");

  const submitMessage = () => {
    if (!message.trim()) return;
    addMessage({
      id: Date.now().toString(),
      senderName: "You",
      content: message,
      timestamp: new Date(),
    });
    setMessage("");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded shadow p-4">
      <div className="h-64 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={msg.id} className="mb-2">
              <span className="font-semibold text-blue-700">
                {msg.senderName}
              </span>
              <span className="mx-2 text-gray-500 text-xs">
                {msg.timestamp.toLocaleTimeString()}
              </span>
              <div className="ml-2 text-gray-800">{msg.content}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages to display</p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="border p-2 flex-1 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitMessage();
          }}
        />
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={submitMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
