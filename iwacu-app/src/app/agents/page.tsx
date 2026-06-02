"use client";
import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AgentCard } from "@/components/shared/AgentCard";
import { MOCK_AGENTS } from "@/data/agents";

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navbar />
      <section className="pt-28 pb-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#C6A86A] text-xs tracking-widest uppercase font-semibold mb-2 block">Our Team</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Meet Our Agents</h1>
            <p className="text-white/40 text-sm max-w-xl">
              Expert real estate professionals across Rwanda, ready to help you find your perfect property.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_AGENTS.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
