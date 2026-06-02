import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "green" | "red" | "gray" | "blue";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "gold", className }) => {
  const variants = {
    gold: "bg-[#C6A86A]/20 text-[#C6A86A] border border-[#C6A86A]/30",
    green: "bg-green-500/20 text-green-400 border border-green-500/30",
    red: "bg-red-500/20 text-red-400 border border-red-500/30",
    gray: "bg-white/10 text-white/60 border border-white/10",
    blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
