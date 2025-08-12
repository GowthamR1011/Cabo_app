import { Message } from "@/types/Message";
import React from "react";

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
  return (
    <div>
      <strong>{message.senderName}</strong>: <p>{message.content} </p>
      <em>{message.timestamp.toLocaleTimeString()}</em>
    </div>
  );
}
