"use client";

import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);

  async function sendMessage() {
    if (!message) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: data.reply,
      },
    ]);
  }

  return (
    <div className="mt-8 rounded-xl bg-white p-5 shadow">
      <h2 className="text-2xl font-bold">
        AI Chat
      </h2>

      <div className="mt-4 space-y-3">
        {messages.map((msg, index) => (
          <div key={index}>
            <b>
              {msg.role === "user" ? "あなた" : "zenova"}
            </b>
            :
            {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="質問してください"
          className="flex-1 rounded border p-2"
        />

        <button
          onClick={sendMessage}
          className="rounded bg-purple-500 px-4 py-2 text-white"
        >
          送信
        </button>
      </div>
    </div>
  );
}