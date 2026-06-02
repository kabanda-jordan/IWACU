"use client";
import React, { useState } from "react";
import { Search, ShieldCheck, UserX, MoreHorizontal } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Badge } from "@/components/ui/Badge";

const MOCK_USERS = [
  { id: "u1", name: "Jean Mugisha", email: "jean@example.com", role: "Buyer", status: "Active", joined: "2024-01-15", properties: 0 },
  { id: "u2", name: "Emmanuel Habimana", email: "emmanuel@iwacu.rw", role: "Agent", status: "Active", joined: "2016-03-15", properties: 34 },
  { id: "u3", name: "Amina Uwimana", email: "amina@iwacu.rw", role: "Agent", status: "Active", joined: "2018-07-20", properties: 28 },
  { id: "u4", name: "Grace Umutoniwase", email: "grace@example.com", role: "Buyer", status: "Active", joined: "2024-02-01", properties: 0 },
  { id: "u5", name: "Patrick Nzabonimana", email: "patrick@example.com", role: "Buyer", status: "Suspended", joined: "2023-11-10", properties: 0 },
  { id: "u6", name: "Christine Mukamana", email: "christine@iwacu.rw", role: "Agent", status: "Active", joined: "2020-05-15", properties: 15 },
  { id: "u7", name: "Bernard Hakizimana", email: "bernard@example.com", role: "Buyer", status: "Active", joined: "2024-03-01", properties: 0 },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = MOCK_USERS.filter(
    (u) =>
      (roleFilter === "All" || u.role === roleFilter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <DashboardHeader title="User Management" subtitle={`${MOCK_USERS.length} total users`} />
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Buyer", "Agent", "Admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  roleFilter === r ? "bg-[#C6A86A] text-black" : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">User</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Role</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Status</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium hidden md:table-cell">Joined</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#C6A86A]/20 flex items-center justify-center text-[#C6A86A] font-bold text-xs shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white text-sm">{u.name}</div>
                          <div className="text-white/40 text-xs">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={u.role === "Agent" ? "gold" : u.role === "Admin" ? "blue" : "gray"} className="text-[10px]">
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={u.status === "Active" ? "green" : "red"} className="text-[10px]">
                        {u.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-white/40 text-xs hidden md:table-cell">{u.joined}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-[#C6A86A] hover:bg-[#C6A86A]/10 transition-colors" title="Verify">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Suspend">
                          <UserX className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
