"use client";
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MOCK_PROPERTIES } from "@/data/properties";
import { useAuthStore } from "@/store/useAuthStore";

const typeColors: Record<string, string> = {
  Apartment: "#C6A86A", House: "#D4BC8A", Villa: "#A88A50",
  Land: "#7A6438", Commercial: "#504228", Office: "#8B7355",
};

const tooltipStyle = {
  backgroundColor: "#111",
  border: "1px solid rgba(198,168,106,0.2)",
  borderRadius: "12px",
  color: "#fff",
};

export default function AnalyticsPage() {
  const { user } = useAuthStore();
  const myProperties = user ? MOCK_PROPERTIES.filter((p) => p.agentId === user.id) : [];
  const totalViews = myProperties.reduce((s, p) => s + p.views, 0);

  const typeMap = new Map<string, number>();
  myProperties.forEach((p) => typeMap.set(p.type, (typeMap.get(p.type) || 0) + 1));
  const typeData = [...typeMap.entries()].map(([name, value]) => ({
    name, value, color: typeColors[name] || "#C6A86A",
  }));

  const topListings = [...myProperties]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map((p) => ({ name: p.title, views: p.views, leads: Math.round(p.views * 0.04) }));

  const maxViews = topListings[0]?.views || 1;

  return (
    <div>
      <DashboardHeader title="Analytics" subtitle="Performance overview of your listings" />
      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Views", value: totalViews.toLocaleString(), delta: "Across all listings" },
            { label: "Total Listings", value: String(myProperties.length), delta: "Active properties" },
            { label: "Property Types", value: String(typeData.length), delta: "Different types" },
            { label: "Avg. Views/Listing", value: myProperties.length ? Math.round(totalViews / myProperties.length).toLocaleString() : "0", delta: "Per property" },
          ].map(({ label, value, delta }) => (
            <div key={label} className="glass-card rounded-2xl p-5">
              <div className="text-white/40 text-xs mb-2">{label}</div>
              <div className="text-white font-bold text-2xl mb-1">{value}</div>
              <div className="text-green-400 text-xs">{delta}</div>
            </div>
          ))}
        </div>

        {/* Views chart */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-5">Views — Last 7 Months</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={[
              { month: "Jan", views: Math.round(totalViews * 0.08) },
              { month: "Feb", views: Math.round(totalViews * 0.12) },
              { month: "Mar", views: Math.round(totalViews * 0.1) },
              { month: "Apr", views: Math.round(totalViews * 0.16) },
              { month: "May", views: Math.round(totalViews * 0.14) },
              { month: "Jun", views: Math.round(totalViews * 0.2) },
              { month: "Jul", views: Math.round(totalViews * 0.2) },
            ]}>
              <defs>
                <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C6A86A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C6A86A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="views" stroke="#C6A86A" fill="url(#vGrad)" strokeWidth={2} name="Views" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property type distribution */}
          {typeData.length > 0 && (
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
                    <Legend wrapperStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Top listings */}
          {topListings.length > 0 && (
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
                          style={{ width: `${(views / maxViews) * 100}%` }}
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
          )}
        </div>
      </div>
    </div>
  );
}
