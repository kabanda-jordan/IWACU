"use client";
import React from "react";
import { X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROPERTY_TYPES, CITIES, AMENITIES, BEDROOM_OPTIONS } from "@/constants";
import { usePropertyStore } from "@/store/usePropertyStore";
import { Button } from "@/components/ui/Button";
import type { PropertyType, PropertyStatus } from "@/types";

interface FilterSidebarProps {
  className?: string;
  onClose?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ className, onClose }) => {
  const { filters, setFilters, resetFilters } = usePropertyStore();

  const toggleAmenity = (a: string) => {
    const next = filters.amenities.includes(a)
      ? filters.amenities.filter((x) => x !== a)
      : [...filters.amenities, a];
    setFilters({ amenities: next });
  };

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-b border-white/5 pb-5 mb-5 last:border-0 last:pb-0 last:mb-0">
      <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className={cn("bg-[#0E0E0E] border border-white/5 rounded-2xl p-5", className)}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-semibold">Filters</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[#C6A86A] text-xs hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          {onClose && (
            <button onClick={onClose} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Status */}
      <Section title="Listing Type">
        <div className="flex gap-2">
          {(["For Sale", "For Rent", ""] as (PropertyStatus | "")[]).map((s) => (
            <button
              key={s || "all"}
              onClick={() => setFilters({ status: s as PropertyStatus | "" })}
              className={cn(
                "flex-1 py-2 rounded-lg text-xs font-medium transition-colors",
                filters.status === s
                  ? "bg-[#C6A86A] text-black"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              )}
            >
              {s || "All"}
            </button>
          ))}
        </div>
      </Section>

      {/* Type */}
      <Section title="Property Type">
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setFilters({ type: filters.type === t ? "" : t as PropertyType })}
              className={cn(
                "py-2 rounded-lg text-xs font-medium transition-colors",
                filters.type === t
                  ? "bg-[#C6A86A] text-black"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      {/* City */}
      <Section title="City">
        <select
          value={filters.city}
          onChange={(e) => setFilters({ city: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A86A] transition-colors"
        >
          <option value="">All Cities</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Section>

      {/* Bedrooms */}
      <Section title="Bedrooms (Min)">
        <div className="flex gap-2">
          {[0, ...BEDROOM_OPTIONS].map((b) => (
            <button
              key={b}
              onClick={() => setFilters({ minBedrooms: b })}
              className={cn(
                "flex-1 py-2 rounded-lg text-xs font-medium transition-colors",
                filters.minBedrooms === b
                  ? "bg-[#C6A86A] text-black"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              )}
            >
              {b === 0 ? "Any" : b + "+"}
            </button>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range (RWF)">
        <div className="space-y-3">
          <div>
            <label className="text-white/40 text-xs mb-1 block">Min Price</label>
            <input
              type="number"
              value={filters.minPrice || ""}
              onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
              placeholder="0"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A86A] transition-colors"
            />
          </div>
          <div>
            <label className="text-white/40 text-xs mb-1 block">Max Price</label>
            <input
              type="number"
              value={filters.maxPrice || ""}
              onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
              placeholder="Any"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A86A] transition-colors"
            />
          </div>
        </div>
      </Section>

      {/* Amenities */}
      <Section title="Amenities">
        <div className="space-y-2">
          {AMENITIES.map((a) => (
            <label key={a} className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => toggleAmenity(a)}
                className={cn(
                  "w-4 h-4 rounded border transition-colors flex items-center justify-center",
                  filters.amenities.includes(a)
                    ? "bg-[#C6A86A] border-[#C6A86A]"
                    : "border-white/20 group-hover:border-[#C6A86A]"
                )}
              >
                {filters.amenities.includes(a) && (
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-black" fill="currentColor">
                    <path d="M10.293 1.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L4 7.586l6.293-6.293z" />
                  </svg>
                )}
              </div>
              <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors">{a}</span>
            </label>
          ))}
        </div>
      </Section>

      <Button variant="gold" size="sm" className="w-full mt-2" onClick={onClose}>
        Apply Filters
      </Button>
    </div>
  );
};
