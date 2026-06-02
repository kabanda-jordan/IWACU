"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search, ShieldCheck, UserX, Star } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Badge } from "@/components/ui/Badge";
import { MOCK_AGENTS } from "@/data/agents";

export default function AdminAgentsPage() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_AGENTS.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <DashboardHeader title="Agent Management" subtitle={`${MOCK_AGENTS.length} agents`} />
      <div className="p-6">
        <div className="relative max-w-xs mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((agent) => (
            <div key={agent.id} className="glass-card rounded-2xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-14 h-14 shrink-0">
                  <Image src={agent.avatar} alt={agent.name} fill className="object-cover rounded-full" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-white font-semibold text-sm">{agent.name}</h3>
                    {agent.isVerified && <Badge variant="green" className="text-[10px]">Verified</Badge>}
                  </div>
                  <div className="text-white/40 text-xs">{agent.city}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-[#C6A86A] fill-current" />
                    <span className="text-[#C6A86A] text-xs font-semibold">{agent.rating}</span>
                    <span className="text-white/30 text-xs">({agent.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-white/5 rounded-lg p-2">
                  <div className="text-white font-bold text-sm">{agent.listings}</div>
                  <div className="text-white/30 text-[10px]">Listings</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <div className="text-white font-bold text-sm">{agent.sold}</div>
                  <div className="text-white/30 text-[10px]">Sold</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <div className="text-white font-bold text-sm">{agent.reviews}</div>
                  <div className="text-white/30 text-[10px]">Reviews</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#C6A86A]/10 text-[#C6A86A] text-xs font-medium hover:bg-[#C6A86A]/20 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {agent.isVerified ? "Revoke" : "Verify"}
                </button>
                <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors">
                  <UserX className="w-3.5 h-3.5" />
                  Suspend
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
