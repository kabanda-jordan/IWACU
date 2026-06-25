"use client";
import React from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-[#0B0B0B] flex overflow-hidden">
      <DashboardSidebar type="admin" />
      <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
}
