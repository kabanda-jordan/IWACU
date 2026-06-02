"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { CITIES, PROPERTY_TYPES } from "@/constants";
import { cn } from "@/lib/utils";

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const [mode, setMode] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (mode === "rent") params.set("status", "For Rent");
    else params.set("status", "For Sale");
    if (location) params.set("city", location);
    if (type) params.set("type", type);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="w-full max-w-4xl"
    >
      {/* Toggle */}
      <div className="flex mb-4">
        {(["buy", "rent"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "px-6 py-2 text-sm font-semibold capitalize rounded-t-xl transition-all",
              mode === m
                ? "bg-white text-black"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            )}
          >
            {m === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>

      {/* Search form */}
      <div className="bg-white rounded-2xl p-3 flex flex-col sm:flex-row gap-2 shadow-2xl">
        {/* Location */}
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-9 pr-8 py-3 text-sm text-gray-800 bg-transparent outline-none appearance-none cursor-pointer"
            aria-label="Select location"
          >
            <option value="">Any Location</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="w-px bg-gray-200 hidden sm:block" />

        {/* Type */}
        <div className="flex-1 relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full pl-9 pr-8 py-3 text-sm text-gray-800 bg-transparent outline-none appearance-none cursor-pointer"
            aria-label="Select property type"
          >
            <option value="">Any Type</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="w-px bg-gray-200 hidden sm:block" />

        {/* Price */}
        <div className="flex-1 flex gap-2 items-center px-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
            className="w-full py-3 text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
          />
          <span className="text-gray-300">–</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="w-full py-3 text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-[#C6A86A] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#D4BC8A] transition-colors text-sm shrink-0"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
    </motion.div>
  );
};
