"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Mail, Star, ShieldCheck, MapPin, Calendar, Home, CheckCircle, Award } from "lucide-react";
import { MOCK_AGENTS } from "@/data/agents";
import { MOCK_PROPERTIES } from "@/data/properties";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function AgentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const agent = MOCK_AGENTS.find((a) => a.id === id);
  const agentProperties = MOCK_PROPERTIES.filter((p) => p.agentId === id);

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <Navbar />
        <div className="text-center pt-28">
          <h1 className="text-2xl font-bold text-white mb-2">Agent Not Found</h1>
          <p className="text-white/40 mb-6">The agent you're looking for doesn't exist.</p>
          <Link href="/agents">
            <Button variant="gold">Browse All Agents</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C6A86A]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#C6A86A]/20">
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              {agent.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#C6A86A] flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-black" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{agent.name}</h1>
                {agent.isVerified && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#C6A86A] bg-[#C6A86A]/10 border border-[#C6A86A]/20 rounded-full px-3 py-1 w-fit mx-auto md:mx-0">
                    <CheckCircle className="w-3 h-3" />
                    Verified Agent
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 text-white/50 text-sm mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A86A]" />
                  {agent.city}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C6A86A]" />
                  Joined {formatDate(agent.joinedAt)}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#C6A86A] fill-current" />
                  <span className="text-[#C6A86A] font-semibold">{agent.rating}</span>
                  <span className="text-white/30 text-sm">({agent.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-2xl mx-auto md:mx-0">
                {agent.bio}
              </p>

              {/* Specializations */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
                <Award className="w-3.5 h-3.5 text-[#C6A86A]" />
                {agent.specialization.map((spec) => (
                  <span key={spec} className="text-xs text-[#C6A86A] bg-[#C6A86A]/10 border border-[#C6A86A]/20 rounded-lg px-3 py-1">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                <a href={`tel:${agent.phone}`}>
                  <Button variant="gold" size="md">
                    <Phone className="w-4 h-4" />
                    {agent.phone}
                  </Button>
                </a>
                <a href={`mailto:${agent.email}`}>
                  <Button variant="outline" size="md">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {[
            { value: agent.listings, label: "Active Listings" },
            { value: agent.sold, label: "Properties Sold" },
            { value: agent.reviews, label: "Client Reviews" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="glass-card rounded-2xl p-5 sm:p-6 text-center border border-white/5"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#C6A86A] mb-1">{stat.value}</div>
              <div className="text-white/40 text-xs sm:text-sm tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Properties by {agent.name}
          </h2>
          <p className="text-white/40 text-sm">
            {agentProperties.length} property{agentProperties.length !== 1 ? "ies" : "y"} listed
          </p>
        </motion.div>

        {agentProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentProperties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center border border-white/5">
            <Home className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">No properties listed yet.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
