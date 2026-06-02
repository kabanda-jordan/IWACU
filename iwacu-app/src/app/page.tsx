"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home, Building2, Castle, Landmark, Store, Briefcase,
  ShieldCheck, UserCheck, Lock, MapPin, ChevronRight, Star, ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/shared/SearchBar";
import { PropertyCard } from "@/components/property/PropertyCard";
import { AgentCard } from "@/components/shared/AgentCard";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { FEATURED_PROPERTIES } from "@/data/properties";
import { MOCK_AGENTS } from "@/data/agents";
import { MOCK_REVIEWS } from "@/data/reviews";
import { PLATFORM_STATS, PROPERTY_CATEGORIES, WHY_IWACU } from "@/constants";

const categoryIcons: Record<string, React.ElementType> = {
  Home, Building2, Castle, Landmark, Store, Briefcase,
};

const whyIcons: Record<string, React.ElementType> = {
  ShieldCheck, UserCheck, Lock, MapPin,
};

const testimonials = MOCK_REVIEWS.slice(0, 3);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Luxury Rwanda Property"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0B0B0B]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#C6A86A] animate-pulse" />
            <span className="text-[#C6A86A] text-xs font-medium tracking-widest uppercase">
              Rwanda&apos;s Premier Real Estate Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight max-w-4xl"
          >
            Find Your{" "}
            <span className="text-gold-gradient">Dream Property</span>
            {" "}in Rwanda
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/60 text-lg max-w-xl leading-relaxed"
          >
            Discover premium homes, apartments, land and commercial properties
            across Rwanda — verified listings, trusted agents.
          </motion.p>

          <SearchBar />

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/40"
          >
            <span>Popular:</span>
            {["Kigali Villas", "Apartments for Rent", "Land in Musanze", "Commercial Kigali"].map((t) => (
              <Link
                key={t}
                href={`/properties?q=${encodeURIComponent(t)}`}
                className="hover:text-[#C6A86A] transition-colors underline-offset-2 hover:underline"
              >
                {t}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATISTICS ───────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PLATFORM_STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#C6A86A] text-xs tracking-widest uppercase font-semibold mb-2 block">
                Handpicked for You
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Featured Properties
              </h2>
            </motion.div>
            <Link href="/properties">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PROPERTIES.slice(0, 6).map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>

          <div className="flex justify-center mt-10 sm:hidden">
            <Link href="/properties">
              <Button variant="outline">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#C6A86A] text-xs tracking-widest uppercase font-semibold mb-2 block">
              Browse by Type
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Property Categories</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PROPERTY_CATEGORIES.map((cat, i) => {
              const Icon = categoryIcons[cat.icon] || Home;
              return (
                <motion.div
                  key={cat.type}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    href={`/properties?type=${cat.type}`}
                    className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 text-center hover:border-[#C6A86A]/30 hover:-translate-y-1 transition-all duration-300 group block"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C6A86A]/10 flex items-center justify-center group-hover:bg-[#C6A86A]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#C6A86A]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{cat.type}</div>
                      <div className="text-white/40 text-xs">{cat.count} listings</div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY IWACU ────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#C6A86A] text-xs tracking-widest uppercase font-semibold mb-2 block">
              Our Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Why Choose IWACU</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_IWACU.map((item, i) => {
              const Icon = whyIcons[item.icon] || ShieldCheck;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 hover:border-[#C6A86A]/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C6A86A]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#C6A86A]" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AGENTS ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#C6A86A] text-xs tracking-widest uppercase font-semibold mb-2 block">
                Expert Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Meet Our Agents</h2>
            </motion.div>
            <Link href="/agents">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                All Agents <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_AGENTS.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#C6A86A] text-xs tracking-widest uppercase font-semibold mb-2 block">
              Client Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">What Our Clients Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#C6A86A] fill-current" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={review.userAvatar} alt={review.userName} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{review.userName}</div>
                    <div className="text-white/30 text-xs">Verified Client</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C6A86A]/5 via-transparent to-[#C6A86A]/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-px bg-[#C6A86A] mx-auto mb-8" />
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Find Your{" "}
              <span className="text-gold-gradient">Perfect Property?</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of Rwandans who found their dream property through IWACU.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/properties">
                <Button variant="gold" size="lg">Browse Properties</Button>
              </Link>
              <Link href="/agents">
                <Button variant="outline" size="lg">Contact an Agent</Button>
              </Link>
            </div>
            <div className="w-16 h-px bg-[#C6A86A] mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
