"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Heart, MessageSquare, Bell, User, Settings,
  Home, BarChart2, Plus, ShieldCheck, Users, Building2,
  LogOut, ChevronLeft, Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const buyerLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const agentLinks = [
  { label: "Overview", href: "/agent", icon: LayoutDashboard },
  { label: "My Properties", href: "/agent/properties", icon: Home },
  { label: "Add Property", href: "/agent/add-property", icon: Plus },
  { label: "Analytics", href: "/agent/analytics", icon: BarChart2 },
  { label: "Verification", href: "/agent/verification", icon: ShieldCheck },
  { label: "Profile", href: "/agent/profile", icon: User },
];

const adminLinks = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Properties", href: "/admin/properties", icon: Building2 },
  { label: "Agents", href: "/admin/agents", icon: ShieldCheck },
  { label: "Verification", href: "/admin/verification", icon: ShieldCheck },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface DashboardSidebarProps {
  type: "buyer" | "agent" | "admin";
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ type }) => {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = type === "admin" ? adminLinks : type === "agent" ? agentLinks : buyerLinks;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo / User */}
      <div className={cn("p-5 border-b border-white/5", collapsed && "px-3")}>
        <Link href="/" className="flex items-center gap-3 mb-4">
          <Image src="/Iwacu_logo.png" alt="IWACU" width={32} height={32} className="w-8 h-8 shrink-0" />
          {!collapsed && <span className="font-black text-lg tracking-widest text-white">IWACU</span>}
        </Link>
        {!collapsed && user && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C6A86A]/20 border border-[#C6A86A]/30 flex items-center justify-center text-[#C6A86A] font-bold text-sm shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-semibold truncate">{user.name}</div>
              <div className="text-white/40 text-xs">{user.role}</div>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                collapsed ? "justify-center" : "",
                isActive
                  ? "bg-[#C6A86A]/15 text-[#C6A86A] border border-[#C6A86A]/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className={cn("w-4.5 h-4.5 shrink-0", isActive ? "text-[#C6A86A]" : "")} />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={cn("p-3 border-t border-white/5", collapsed && "px-3")}>
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle (desktop) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center p-3 border-t border-white/5 text-white/30 hover:text-white transition-colors"
      >
        <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-black/80 border border-white/10 rounded-xl flex items-center justify-center text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-[#0E0E0E] border-r border-white/5 z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col shrink-0 bg-[#0E0E0E] border-r border-white/5 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
