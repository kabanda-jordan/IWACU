"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

const MOCK_CONVERSATIONS = [
  {
    id: "c1",
    name: "Emmanuel Habimana",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80",
    lastMessage: "I'll arrange the viewing for Saturday morning.",
    time: "2m ago",
    unread: 2,
  },
  {
    id: "c2",
    name: "Amina Uwimana",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80",
    lastMessage: "The property is still available. When would you like to visit?",
    time: "1h ago",
    unread: 0,
  },
  {
    id: "c3",
    name: "Christine Mukamana",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    lastMessage: "Thank you for your interest in the Rubavu property!",
    time: "Yesterday",
    unread: 1,
  },
];

const MOCK_MESSAGES: Record<string, { from: "me" | "them"; text: string; time: string }[]> = {
  c1: [
    { from: "them", text: "Hello! Thank you for reaching out about the Nyarutarama villa.", time: "10:00am" },
    { from: "me", text: "Hi Emmanuel, I'm very interested. Is it still available?", time: "10:05am" },
    { from: "them", text: "Yes, absolutely! Would you like to schedule a viewing?", time: "10:08am" },
    { from: "me", text: "That would be great. How about this weekend?", time: "10:12am" },
    { from: "them", text: "I'll arrange the viewing for Saturday morning.", time: "10:15am" },
  ],
  c2: [
    { from: "them", text: "Hello! I see you were interested in the Kiyovu apartment.", time: "9:00am" },
    { from: "me", text: "Yes, I love the city view photos. Is the price negotiable?", time: "9:30am" },
    { from: "them", text: "The property is still available. When would you like to visit?", time: "9:45am" },
  ],
  c3: [
    { from: "them", text: "Thank you for your interest in the Rubavu property!", time: "Yesterday 3pm" },
  ],
};

export default function MessagesPage() {
  const [selected, setSelected] = useState("c1");
  const [newMsg, setNewMsg] = useState("");
  const [conversations] = useState(MOCK_CONVERSATIONS);

  const messages = MOCK_MESSAGES[selected] || [];
  const activeConv = conversations.find((c) => c.id === selected);

  return (
    <div className="h-[calc(100vh-0px)] flex flex-col">
      <DashboardHeader title="Messages" subtitle="Chat with agents" />
      <div className="flex flex-1 min-h-0">
        {/* Conversation list */}
        <div className="w-72 shrink-0 border-r border-white/5 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelected(conv.id)}
              className={cn(
                "w-full flex items-start gap-3 p-4 text-left hover:bg-white/5 transition-colors border-b border-white/5",
                selected === conv.id && "bg-white/5 border-l-2 border-l-[#C6A86A]"
              )}
            >
              <div className="relative w-10 h-10 shrink-0">
                <Image src={conv.avatar} alt={conv.name} fill className="object-cover rounded-full" sizes="40px" />
                {conv.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C6A86A] text-black text-[10px] font-bold flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <span className="text-white text-sm font-medium truncate">{conv.name}</span>
                  <span className="text-white/30 text-[10px] shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="text-white/40 text-xs truncate">{conv.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Chat panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          {activeConv && (
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5">
              <div className="relative w-9 h-9">
                <Image src={activeConv.avatar} alt={activeConv.name} fill className="object-cover rounded-full" sizes="36px" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">{activeConv.name}</div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white/30 text-xs">Online</span>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.from === "me" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-xs lg:max-w-sm rounded-2xl px-4 py-2.5 text-sm",
                    msg.from === "me"
                      ? "bg-[#C6A86A] text-black rounded-br-md"
                      : "bg-white/5 text-white/80 rounded-bl-md"
                  )}
                >
                  <p>{msg.text}</p>
                  <p className={cn("text-[10px] mt-1 text-right", msg.from === "me" ? "text-black/50" : "text-white/30")}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-3">
              <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && newMsg && setNewMsg("")}
                placeholder="Type a message…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors"
              />
              <button
                onClick={() => newMsg && setNewMsg("")}
                className="w-10 h-10 rounded-xl bg-[#C6A86A] flex items-center justify-center text-black hover:bg-[#D4BC8A] transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
