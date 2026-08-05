"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("Ready to chat.");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Ask a code question or request a repo summary." },
  ]);

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!input.trim()) {
      setStatus("Type a question first.");
      return;
    }

    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setStatus("Saving chat query…");

    const response = await fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "Repo Chat Message", description: `User asked: ${text}` }),
    });

    if (!response.ok) {
      setStatus("Unable to save chat record.");
      return;
    }

    setStatus("Generating response…");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `I reviewed your request: "${text}". This is a prototype answer that shows how repo chat would store and retrieve user activity.`,
        },
      ]);
      setStatus("Response generated.");
    }, 450);
  }

  return (
    <div className="tool-page tool-chat-page">
      <div className="tool-header">
        <h1>Repository AI Chat</h1>
        <p>Ask questions about your codebase and save each interaction in the backend.</p>
      </div>
      <div className="chat-shell">
        <div className="chat-thread">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              <span className="message-role">{message.role === "user" ? "You" : "AI"}</span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about your repository..."
          />
          <button className="button primary" type="submit">
            Send
          </button>
        </form>
      </div>
      <div className="tool-note">
        <p>{status}</p>
      </div>
    </div>
  );
}
