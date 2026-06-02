"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, FileText, Clock } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Badge } from "@/components/ui/Badge";
import { MOCK_AGENTS } from "@/data/agents";

export default function AdminVerificationPage() {
  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  const pending = MOCK_AGENTS.filter((a) => !approved.includes(a.id) && !rejected.includes(a.id));
  const done = MOCK_AGENTS.filter((a) => approved.includes(a.id) || rejected.includes(a.id));

  return (
    <div>
      <DashboardHeader title="Verification Requests" subtitle={`${pending.length} pending`} />
      <div className="p-6 space-y-8">
        {/* Pending */}
        <section>
          <h2 className="text-white font-semibold mb-4">Pending Requests</h2>
          {pending.length === 0 ? (
            <div className="glass-card rounded-2xl p-10 text-center text-white/30 text-sm">
              No pending verification requests.
            </div>
          ) : (
            <div className="space-y-4">
              {pending.map((agent) => (
                <div key={agent.id} className="glass-card rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative w-14 h-14 shrink-0">
                      <Image src={agent.avatar} alt={agent.name} fill className="object-cover rounded-full" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="text-white font-semibold">{agent.name}</h3>
                          <p className="text-white/40 text-xs">{agent.email} · {agent.city}</p>
                        </div>
                        <Badge variant="gray" className="flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3" /> Pending
                        </Badge>
                      </div>
                      <p className="text-white/50 text-sm mt-2 line-clamp-2">{agent.bio}</p>

                      {/* Mock documents */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {["National ID", "Real Estate License"].map((doc) => (
                          <div key={doc} className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-1.5 text-white/50 text-xs">
                            <FileText className="w-3 h-3 text-[#C6A86A]" />
                            {doc} <span className="text-green-400">✓</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setApproved((a) => [...a, agent.id])}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500/10 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => setRejected((r) => [...r, agent.id])}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Processed */}
        {done.length > 0 && (
          <section>
            <h2 className="text-white font-semibold mb-4">Processed</h2>
            <div className="space-y-3">
              {done.map((agent) => (
                <div key={agent.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                  <div className="relative w-10 h-10">
                    <Image src={agent.avatar} alt={agent.name} fill className="object-cover rounded-full" sizes="40px" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{agent.name}</div>
                    <div className="text-white/40 text-xs">{agent.email}</div>
                  </div>
                  <Badge variant={approved.includes(agent.id) ? "green" : "red"}>
                    {approved.includes(agent.id) ? "Approved" : "Rejected"}
                  </Badge>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
