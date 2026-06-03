"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, Star, ShieldCheck, ArrowRight } from "lucide-react";
import type { Agent } from "@/types";
import { Button } from "@/components/ui/Button";

interface AgentCardProps {
  agent: Agent;
  index?: number;
}

const containerVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const AgentCard: React.FC<AgentCardProps> = ({ agent, index = 0 }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -6, borderColor: "rgba(198, 168, 106, 0.3)", transition: { duration: 0.25 } }}
      className="glass-card rounded-2xl p-6 text-center border border-white/5 hover:shadow-2xl hover:shadow-[#C6A86A]/10 hover:bg-white/[0.02] transition-colors group"
    >
      {/* Avatar */}
      <div className="relative w-20 h-20 mx-auto mb-4">
        <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-[#C6A86A]/20 group-hover:ring-[#C6A86A]/60 transition-all duration-500">
          <Image
            src={agent.avatar}
            alt={agent.name}
            width={80}
            height={80}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        {agent.isVerified && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, delay: index * 0.08 + 0.2 }}
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#C6A86A] flex items-center justify-center shadow-lg"
          >
            <ShieldCheck className="w-3 h-3 text-black" />
          </motion.div>
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
        {[
          { value: agent.listings, label: "Listings" },
          { value: agent.sold, label: "Sold" },
          { value: agent.reviews, label: "Reviews" },
        ].map((stat, i) => (
          <React.Fragment key={stat.label}>
            {i > 0 && <div className="w-px bg-white/5" />}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.3 + i * 0.05 }}
              className="text-center"
            >
              <div className="text-white font-bold text-sm">{stat.value}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          </React.Fragment>
        ))}
      </div>

      {/* Contact */}
      <div className="space-y-2 mb-4">
        <motion.a
          whileHover={{ x: 3 }}
          href={`tel:${agent.phone}`}
          className="flex items-center justify-center gap-2 text-white/50 text-xs hover:text-white transition-colors"
        >
          <Phone className="w-3 h-3 text-[#C6A86A]" />
          {agent.phone}
        </motion.a>
        <motion.a
          whileHover={{ x: 3 }}
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center gap-2 text-white/50 text-xs hover:text-white transition-colors"
        >
          <Mail className="w-3 h-3 text-[#C6A86A]" />
          {agent.email}
        </motion.a>
      </div>

      <Link href={`/agents/${agent.id}`}>
        <Button variant="outline" size="sm" className="w-full group/btn">
          <span>View Profile</span>
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
        </Button>
      </Link>
    </motion.div>
  );
};
