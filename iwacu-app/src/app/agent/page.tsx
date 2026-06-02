"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Eye, Users, MessageSquare, TrendingUp, ArrowRight, Plus } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { MOCK_PROPERTIES } from "@/data/properties";
import { useAuthStore } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/utils";

const viewsData = [
  { month: "Jan", views: 340 },
  { month: "Feb", views: 520 },
  { month: "Mar", views: 410 },
  { month: "Apr", views: 680 },
  { month: "May", views: 590 },
  { month: "Jun", views: 840 },
];

const leadsData = [
  { month: "Jan", leads: 12 },
  { month: "Feb", leads: 18 },
  { month: "Mar", leads: 15 },
  { month: "Apr", leads: 24 },
  { month: "May", leads: 21 },
  { month: "Jun", leads: 30 },
];

const statCards = [
  { label: "Total Listings", value: "34", icon: Home, color: "text-[#C6A86A]", bg: "bg-[#C6A86A]/10", change: "+3 this month" },
  { label: "Total Views", value: "3,380", icon: Eye, color: "text-blue-400", bg: "bg-blue-400/10", change: "+22% vs last month" },
  { label: "Active Leads", value: "120", icon: Users, color: "text-green-400", bg: "bg-green-400/10", change: "+8 this week" },
  { label: "Messages", value: "18", icon: MessageSquare, color: "text-rose-400", bg: "bg-rose-400/10", change: "5 unread" },
];

const customTooltipStyle = {
  backgroundColor: "#111",
  border: "1px solid rgba(198,168,106,0.2)",
  borderRadius: "12px",
  color: "#fff",
};

export default function AgentDashboard() {
  const { user } = useAuthStore();
  const myProperties = MOCK_PROPERTIES.filter((p) => p.agentId === "agent-001").slice(0, 5);

  return (
    <div>
      <DashboardHeader
        title={`Agent Dashboard`}
        subtitle={`Welcome back, ${user?.name?.split(" ")[0] || "Agent"}`}
      />
      <div className="p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, color, bg, change }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-white/40 text-xs mb-1">{label}</div>
              <div className="flex items-center gap-1 text-green-400 text-[11px]">
                <TrendingUp className="w-3 h-3" /> {change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-5">Monthly Views</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C6A86A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C6A86A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Area type="monotone" dataKey="views" stroke="#C6A86A" fill="url(#viewsGrad)" strokeWidth={2} dot={{ fill: "#C6A86A", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-5">Monthly Leads</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="leads" fill="#C6A86A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent listings */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-lg">Recent Listings</h2>
            <div className="flex gap-3">
              <Link href="/agent/add-property">
                <Button variant="gold" size="sm" className="flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add Property
                </Button>
              </Link>
              <Link href="/agent/properties">
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Property</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium hidden sm:table-cell">Type</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Price</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium hidden md:table-cell">Views</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {myProperties.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-white text-sm font-medium truncate max-w-[200px]">{p.title}</div>
                      <div className="text-white/40 text-xs">{p.city}</div>
                    </td>
                    <td className="px-5 py-4 text-white/60 hidden sm:table-cell">{p.type}</td>
                    <td className="px-5 py-4 text-[#C6A86A] font-semibold">{formatPrice(p.price)}</td>
                    <td className="px-5 py-4 text-white/60 hidden md:table-cell">{p.views}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        p.status === "For Sale" ? "bg-[#C6A86A]/10 text-[#C6A86A]" : "bg-blue-400/10 text-blue-400"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
