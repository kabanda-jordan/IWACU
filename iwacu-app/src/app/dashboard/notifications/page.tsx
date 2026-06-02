"use client";
import React, { useState } from "react";
import { Bell, CheckCheck, Heart, MessageSquare, ShieldCheck, Home } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { cn } from "@/lib/utils";

const MOCK_NOTIFICATIONS = [
  { id: "n1", icon: Heart, type: "saved", title: "Price Drop Alert", message: "Luxury Villa in Nyarutarama dropped to RWF 430M (was 450M)", time: "2 min ago", isRead: false, color: "text-rose-400 bg-rose-400/10" },
  { id: "n2", icon: MessageSquare, type: "message", title: "New Message", message: "Emmanuel Habimana replied to your inquiry about the villa.", time: "1 hour ago", isRead: false, color: "text-blue-400 bg-blue-400/10" },
  { id: "n3", icon: Home, type: "listing", title: "New Listing Match", message: "A new 4-bed apartment was listed in Kiyovu matching your search.", time: "3 hours ago", isRead: true, color: "text-[#C6A86A] bg-[#C6A86A]/10" },
  { id: "n4", icon: ShieldCheck, type: "verify", title: "Account Verified", message: "Your IWACU account has been successfully verified.", time: "Yesterday", isRead: true, color: "text-green-400 bg-green-400/10" },
  { id: "n5", icon: Bell, type: "info", title: "Welcome to IWACU", message: "Thank you for joining Rwanda's premier real estate platform.", time: "2 days ago", isRead: true, color: "text-white/40 bg-white/5" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => setNotifications((n) => n.map((item) => ({ ...item, isRead: true })));
  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <div>
      <DashboardHeader title="Notifications" subtitle={`${unread} unread`} />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          {unread > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-[#C6A86A] text-sm hover:underline">
              <CheckCheck className="w-4 h-4" /> Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-3 max-w-2xl">
          {notifications.map(({ id, icon: Icon, title, message, time, isRead, color }) => (
            <div
              key={id}
              onClick={() => setNotifications((n) => n.map((item) => item.id === id ? { ...item, isRead: true } : item))}
              className={cn(
                "flex items-start gap-4 p-4 rounded-2xl border transition-colors cursor-pointer",
                isRead ? "glass-card border-transparent" : "bg-white/5 border-[#C6A86A]/20"
              )}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", color.split(" ")[1])}>
                <Icon className={cn("w-5 h-5", color.split(" ")[0])} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className={cn("font-medium text-sm", isRead ? "text-white/70" : "text-white")}>{title}</h4>
                  <span className="text-white/30 text-xs shrink-0">{time}</span>
                </div>
                <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{message}</p>
              </div>
              {!isRead && (
                <div className="w-2 h-2 rounded-full bg-[#C6A86A] shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
