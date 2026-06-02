"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Building2, ShieldCheck, TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Badge } from "@/components/ui/Badge";
import { MOCK_PROPERTIES } from "@/data/properties";
import { MOCK_AGENTS } from "@/data/agents";
import { formatPrice, formatDate } from "@/lib/utils";

const registrations = [
  { month: "Jan", buyers: 42, agents: 5 },
  { month: "Feb", buyers: 58, agents: 7 },
  { month: "Mar", buyers: 53, agents: 4 },
  { month: "Apr", buyers: 74, agents: 9 },
  { month: "May", buyers: 66, agents: 6 },
  { month: "Jun", buyers: 91, agents: 11 },
];

const recentActivity = [
  { type: "user", action: "New buyer registered", name: "Marie Uwase", time: "2 min ago" },
  { type: "property", action: "Property submitted for review", name: "Villa in Musanze", time: "15 min ago" },
  { type: "agent", action: "Verification request", name: "Jean-Paul Nkuranga", time: "1 hour ago" },
  { type: "property", action: "Property approved", name: "Apartment in Kiyovu", time: "2 hours ago" },
  { type: "user", action: "User flagged a listing", name: "Suspicious listing #142", time: "3 hours ago" },
];

const tooltipStyle = {
  backgroundColor: "#111",
  border: "1px solid rgba(198,168,106,0.2)",
  borderRadius: "12px",
  color: "#fff",
};

export default function AdminDashboard() {
  const pendingProperties = MOCK_PROPERTIES.filter((p) => !p.isVerified);

  return (
    <div>
      <DashboardHeader title="Admin Dashboard" subtitle="Platform overview" />
      <div className="p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10", delta: "+24 this week" },
            { label: "Total Listings", value: "278", icon: Building2, color: "text-[#C6A86A]", bg: "bg-[#C6A86A]/10", delta: "+7 pending review" },
            { label: "Active Agents", value: "45", icon: ShieldCheck, color: "text-green-400", bg: "bg-green-400/10", delta: "3 new requests" },
            { label: "Monthly Growth", value: "+18%", icon: TrendingUp, color: "text-rose-400", bg: "bg-rose-400/10", delta: "vs last month" },
          ].map(({ label, value, icon: Icon, color, bg, delta }, i) => (
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
              <div className="text-white/30 text-[11px]">{delta}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-5">New Registrations — Last 6 Months</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={registrations}>
              <defs>
                <linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C6A86A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C6A86A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="buyers" stroke="#C6A86A" fill="url(#bGrad)" strokeWidth={2} name="Buyers" />
              <Area type="monotone" dataKey="agents" stroke="#34d399" fill="url(#aGrad)" strokeWidth={2} name="Agents" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending approvals */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Pending Approvals</h3>
              <Badge variant="gold">{pendingProperties.length + 3}</Badge>
            </div>
            <div className="space-y-3">
              {MOCK_PROPERTIES.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium truncate">{p.title}</div>
                    <div className="text-white/30 text-[11px]">{formatPrice(p.price)} · {p.city}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="w-6 h-6 rounded-md bg-green-500/10 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors" title="Approve">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-6 h-6 rounded-md bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors" title="Reject">
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map(({ type, action, name, time }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    type === "user" ? "bg-blue-400/10" : type === "agent" ? "bg-green-400/10" : "bg-[#C6A86A]/10"
                  }`}>
                    {type === "user" ? <Users className="w-3.5 h-3.5 text-blue-400" /> :
                     type === "agent" ? <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> :
                     <Building2 className="w-3.5 h-3.5 text-[#C6A86A]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/70 text-xs">{action}</div>
                    <div className="text-white text-xs font-medium truncate">{name}</div>
                  </div>
                  <div className="text-white/30 text-[10px] shrink-0 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />{time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
