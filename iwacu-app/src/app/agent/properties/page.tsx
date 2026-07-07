"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MOCK_PROPERTIES } from "@/data/properties";
import { useAuthStore } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/utils";

export default function AgentPropertiesPage() {
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const properties = MOCK_PROPERTIES.filter(
    (p) =>
      p.agentId === user?.id &&
      !deletedIds.includes(p.id) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <DashboardHeader title="My Properties" subtitle={`${properties.length} listings`} />
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors"
            />
          </div>
          <Link href="/agent/add-property">
            <Button variant="gold" size="sm" className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Add Property
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Property</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Type</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Price</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Status</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Views</th>
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-wider font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                          <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="48px" />
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium truncate max-w-[180px]">{p.title}</div>
                          <div className="text-white/40 text-xs">{p.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-white/60 text-xs">{p.type}</td>
                    <td className="px-5 py-3.5 text-[#C6A86A] font-semibold text-xs">{formatPrice(p.price)}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={p.priceType === "rent" ? "blue" : "gold"} className="text-[10px]">
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-white/50 text-xs">{p.views}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link href={`/property/${p.id}`}>
                          <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-[#C6A86A] hover:bg-[#C6A86A]/10 transition-colors" title="View">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <Link href={`/agent/edit-property/${p.id}`}>
                          <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-blue-400 hover:bg-blue-400/10 transition-colors" title="Edit">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeletedIds((d) => [...d, p.id])}
                          className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {properties.length === 0 && (
            <div className="py-12 text-center text-white/30 text-sm">No properties found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
