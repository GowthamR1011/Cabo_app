import React from "react";
import { Message } from "../types/Message";

type Props = { messages?: Message[] };

export default function ChatBoard({ messages }: Props) {
  return (
    <div>
      {messages ? (
        messages.map((message) => (
          <div key={message.id}>
            <strong>{message.senderName}</strong>: {message.content}{" "}
            <em>{message.timestamp.toLocaleTimeString()}</em>
          </div>
        ))
      ) : (
        <p>No messages to display</p>
      )}
    </div>
  );
}
