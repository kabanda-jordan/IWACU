"use client";
import React from "react";
import { Bell, Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
  const { user } = useAuthStore();

  return (
    <header className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#0B0B0B]">
      <div>
        <h1 className="text-white font-bold text-xl">{title}</h1>
        {subtitle && <p className="text-white/40 text-sm mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-32"
            aria-label="Search"
          />
        </div>

        <button
          className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C6A86A]" />
        </button>

        {user && (
          <div className="w-9 h-9 rounded-xl bg-[#C6A86A] flex items-center justify-center text-black font-bold text-sm">
            {user.name.charAt(0)}
          </div>
        )}
      </div>
    </header>
  );
};
