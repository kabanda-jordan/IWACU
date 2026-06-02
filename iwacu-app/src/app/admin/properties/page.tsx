"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search, CheckCircle2, XCircle, Eye } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Badge } from "@/components/ui/Badge";
import { MOCK_PROPERTIES } from "@/data/properties";
import { formatPrice } from "@/lib/utils";

export default function AdminPropertiesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);

  const filtered = MOCK_PROPERTIES.filter(
    (p) =>
      !rejectedIds.includes(p.id) &&
      (statusFilter === "All" ||
        (statusFilter === "Pending" && !approvedIds.includes(p.id)) ||
        (statusFilter === "Approved" && approvedIds.includes(p.id))) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <DashboardHeader title="Property Management" subtitle={`${MOCK_PROPERTIES.length} total listings`} />
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Pending", "Approved"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === s ? "bg-[#C6A86A] text-black" : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Property</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium hidden sm:table-cell">Type</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Price</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Approval</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const isApproved = approvedIds.includes(p.id);
                  return (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                            <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="48px" />
                          </div>
                          <div>
                            <div className="text-white text-xs font-medium truncate max-w-[160px]">{p.title}</div>
                            <div className="text-white/40 text-[11px]">{p.city}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-white/60 text-xs hidden sm:table-cell">{p.type}</td>
                      <td className="px-5 py-3.5 text-[#C6A86A] font-semibold text-xs">{formatPrice(p.price)}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant={isApproved ? "green" : "gray"} className="text-[10px]">
                          {isApproved ? "Approved" : "Pending"}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <Link href={`/property/${p.id}`}>
                            <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-[#C6A86A] hover:bg-[#C6A86A]/10 transition-colors" title="View">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                          {!isApproved && (
                            <button
                              onClick={() => setApprovedIds((a) => [...a, p.id])}
                              className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-green-400 hover:bg-green-400/10 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => setRejectedIds((r) => [...r, p.id])}
                            className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
