"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye, MessageSquare, Bell, ArrowRight, TrendingUp } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PropertyCard } from "@/components/property/PropertyCard";
import { usePropertyStore } from "@/store/usePropertyStore";
import { useAuthStore } from "@/store/useAuthStore";
import { MOCK_PROPERTIES } from "@/data/properties";

const statCards = [
  { label: "Saved Properties", value: 6, icon: Heart, color: "text-rose-400", bg: "bg-rose-400/10" },
  { label: "Recent Views", value: 24, icon: Eye, color: "text-blue-400", bg: "bg-blue-400/10" },
  { label: "Messages", value: 3, icon: MessageSquare, color: "text-green-400", bg: "bg-green-400/10" },
  { label: "Notifications", value: 8, icon: Bell, color: "text-[#C6A86A]", bg: "bg-[#C6A86A]/10" },
];

export default function BuyerDashboard() {
  const { user } = useAuthStore();
  const { getFavoriteProperties } = usePropertyStore();
  const favorites = getFavoriteProperties();
  const recentProperties = MOCK_PROPERTIES.slice(0, 3);

  return (
    <div>
      <DashboardHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "User"} 👋`}
        subtitle="Here's what's happening with your properties"
      />

      <div className="p-6 space-y-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-white/40 text-xs">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Favorite properties */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-lg">Saved Properties</h2>
            <Link href="/dashboard/favorites" className="flex items-center gap-1 text-[#C6A86A] text-sm hover:underline">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {favorites.slice(0, 3).map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-10 text-center">
              <Heart className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">You haven&apos;t saved any properties yet.</p>
              <Link href="/properties" className="text-[#C6A86A] text-sm hover:underline mt-2 inline-block">
                Browse Properties
              </Link>
            </div>
          )}
        </section>

        {/* Recently viewed */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-lg">Recently Viewed</h2>
            <Link href="/properties" className="flex items-center gap-1 text-[#C6A86A] text-sm hover:underline">
              Browse more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {recentProperties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </section>

        {/* Market Trends */}
        <section>
          <h2 className="text-white font-semibold text-lg mb-5">Market Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Avg. House Price Kigali", value: "RWF 285M", change: "+4.2%", up: true },
              { label: "Avg. Apartment Rent", value: "RWF 1.4M/mo", change: "+2.1%", up: true },
              { label: "New Listings This Month", value: "47", change: "+12%", up: true },
            ].map(({ label, value, change, up }) => (
              <div key={label} className="glass-card rounded-2xl p-5">
                <div className="text-white/40 text-xs mb-2">{label}</div>
                <div className="text-white font-bold text-xl mb-1">{value}</div>
                <div className={`flex items-center gap-1 text-xs ${up ? "text-green-400" : "text-red-400"}`}>
                  <TrendingUp className="w-3 h-3" />
                  {change} this month
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
