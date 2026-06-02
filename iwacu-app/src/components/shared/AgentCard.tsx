"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, Star, ShieldCheck } from "lucide-react";
import type { Agent } from "@/types";
import { Button } from "@/components/ui/Button";

interface AgentCardProps {
  agent: Agent;
  index?: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 text-center hover:border-[#C6A86A]/30 transition-all duration-300 hover:-translate-y-1 group"
    >
      {/* Avatar */}
      <div className="relative w-20 h-20 mx-auto mb-4">
        <Image
          src={agent.avatar}
          alt={agent.name}
          fill
          className="object-cover rounded-full"
          sizes="80px"
        />
        {agent.isVerified && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#C6A86A] flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 text-black" />
          </div>
        )}
      </div>

      <h3 className="text-white font-semibold mb-1 group-hover:text-[#C6A86A] transition-colors">
        {agent.name}
      </h3>
      <p className="text-white/40 text-xs mb-1">{agent.city}</p>
      <div className="flex items-center justify-center gap-1 mb-4">
        <Star className="w-3.5 h-3.5 text-[#C6A86A] fill-current" />
        <span className="text-[#C6A86A] text-sm font-semibold">{agent.rating}</span>
        <span className="text-white/30 text-xs">({agent.reviews} reviews)</span>
      </div>

      {/* Stats */}
      <div className="flex justify-around mb-5 py-3 border-y border-white/5">
        <div className="text-center">
          <div className="text-white font-bold text-sm">{agent.listings}</div>
          <div className="text-white/40 text-[10px] uppercase tracking-wider">Listings</div>
        </div>
        <div className="w-px bg-white/5" />
        <div className="text-center">
          <div className="text-white font-bold text-sm">{agent.sold}</div>
          <div className="text-white/40 text-[10px] uppercase tracking-wider">Sold</div>
        </div>
        <div className="w-px bg-white/5" />
        <div className="text-center">
          <div className="text-white font-bold text-sm">{agent.reviews}</div>
          <div className="text-white/40 text-[10px] uppercase tracking-wider">Reviews</div>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-2 mb-4">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center justify-center gap-2 text-white/50 text-xs hover:text-white transition-colors"
        >
          <Phone className="w-3 h-3 text-[#C6A86A]" />
          {agent.phone}
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center gap-2 text-white/50 text-xs hover:text-white transition-colors"
        >
          <Mail className="w-3 h-3 text-[#C6A86A]" />
          {agent.email}
        </a>
      </div>

      <Link href={`/agents/${agent.id}`}>
        <Button variant="outline" size="sm" className="w-full">View Profile</Button>
      </Link>
    </motion.div>
  );
};
