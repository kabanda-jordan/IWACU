"use client";
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const viewsData = [
  { month: "Jan", views: 340, leads: 12 },
  { month: "Feb", views: 520, leads: 18 },
  { month: "Mar", views: 410, leads: 15 },
  { month: "Apr", views: 680, leads: 24 },
  { month: "May", views: 590, leads: 21 },
  { month: "Jun", views: 840, leads: 30 },
  { month: "Jul", views: 720, leads: 27 },
];

const typeData = [
  { name: "Apartments", value: 12, color: "#C6A86A" },
  { name: "Houses", value: 8, color: "#D4BC8A" },
  { name: "Villas", value: 5, color: "#A88A50" },
  { name: "Land", value: 4, color: "#7A6438" },
  { name: "Commercial", value: 5, color: "#504228" },
];

const topListings = [
  { name: "Luxury Villa in Nyarutarama", views: 1240, leads: 48 },
  { name: "Hillside Villa in Musanze", views: 1105, leads: 42 },
  { name: "Modern Apartment in Kiyovu", views: 890, leads: 35 },
  { name: "Executive Home in Kimihurura", views: 756, leads: 28 },
  { name: "Lake Kivu Lakefront House", views: 622, leads: 22 },
];

const tooltipStyle = {
  backgroundColor: "#111",
  border: "1px solid rgba(198,168,106,0.2)",
  borderRadius: "12px",
  color: "#fff",
};

export default function AnalyticsPage() {
  return (
    <div>
      <DashboardHeader title="Analytics" subtitle="Performance overview of your listings" />
      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Views", value: "4,100", delta: "+14%" },
            { label: "Total Leads", value: "147", delta: "+22%" },
            { label: "Conversion Rate", value: "3.6%", delta: "+0.4%" },
            { label: "Avg. Days Listed", value: "18", delta: "-3 days" },
          ].map(({ label, value, delta }) => (
            <div key={label} className="glass-card rounded-2xl p-5">
              <div className="text-white/40 text-xs mb-2">{label}</div>
              <div className="text-white font-bold text-2xl mb-1">{value}</div>
              <div className="text-green-400 text-xs">{delta} vs last period</div>
            </div>
          ))}
        </div>

        {/* Views & Leads chart */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-5">Views & Leads — Last 7 Months</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C6A86A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C6A86A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }} />
              <Area type="monotone" dataKey="views" stroke="#C6A86A" fill="url(#vGrad)" strokeWidth={2} name="Views" />
              <Area type="monotone" dataKey="leads" stroke="#60a5fa" fill="url(#lGrad)" strokeWidth={2} name="Leads" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property type distribution */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-5">Listings by Type</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={typeData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }} formatter={(v) => v} />
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top listings */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-5">Top Performing Listings</h3>
            <div className="space-y-3">
              {topListings.map(({ name, views, leads }, i) => (
                <div key={name} className="flex items-center gap-4">
                  <span className="text-white/30 text-xs w-4 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/80 text-xs truncate mb-1">{name}</div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C6A86A] rounded-full"
                        style={{ width: `${(views / 1240) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-white/60 text-xs">{views} views</div>
                    <div className="text-[#C6A86A] text-xs">{leads} leads</div>
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
