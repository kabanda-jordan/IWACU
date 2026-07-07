"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/property/PropertyCard";
import { FilterSidebar } from "@/components/shared/FilterSidebar";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { PropertyCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { Button } from "@/components/ui/Button";
import { usePropertyStore } from "@/store/usePropertyStore";
import { SORT_OPTIONS } from "@/constants";
import type { PropertyType, PropertyStatus } from "@/types";

const PER_PAGE = 9;

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { filters, setFilters, setSearchQuery, sortBy, setSortBy, viewMode, setViewMode, getFilteredProperties } = usePropertyStore();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Sync URL params to filters
  useEffect(() => {
    const status = searchParams.get("status") as PropertyStatus | null;
    const type = searchParams.get("type") as PropertyType | null;
    const city = searchParams.get("city");
    const q = searchParams.get("q");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (q) setSearchQuery(q);
    setFilters({
      ...(status && { status }),
      ...(type && { type }),
      ...(city && { city }),
      ...(minPrice && { minPrice: Number(minPrice) }),
      ...(maxPrice && { maxPrice: Number(maxPrice) }),
    });
    setTimeout(() => setLoading(false), 600);
  }, [searchParams, setFilters, setSearchQuery]);

  const allFiltered = getFilteredProperties();
  const totalPages = Math.ceil(allFiltered.length / PER_PAGE);
  const displayed = allFiltered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-10 px-4 sm:px-6 bg-gradient-to-b from-[#0D0D0D] to-[#0B0B0B]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#C6A86A] text-xs tracking-widest uppercase font-semibold mb-2 block">
              All Listings
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Properties in Rwanda</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden flex items-center gap-2 glass-card rounded-xl px-3 py-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C6A86A]" />
              Filters
            </button>
            <span className="text-white/40 text-sm">
              {allFiltered.length} properties found
            </span>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6A86A] transition-colors"
              aria-label="Sort properties"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <div className="flex border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#C6A86A] text-black" : "text-white/40 hover:text-white"}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-[#C6A86A] text-black" : "text-white/40 hover:text-white"}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar desktop */}
          <div className="hidden lg:block w-72 shrink-0">
            <FilterSidebar />
          </div>

          {/* Property grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
              </div>
            ) : displayed.length === 0 ? (
              <EmptyState
                title="No properties found"
                description="Try adjusting your filters or search query."
                action={
                  <Button variant="outline" size="sm" onClick={() => usePropertyStore.getState().resetFilters()}>
                    Clear Filters
                  </Button>
                }
              />
            ) : (
              <>
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                  {displayed.map((p, i) => (
                    <PropertyCard key={p.id} property={p} index={i} layout={viewMode} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showMobileFilter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilter(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-80 z-50 overflow-y-auto bg-[#0E0E0E] lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <h2 className="text-white font-semibold">Filters</h2>
                <button onClick={() => setShowMobileFilter(false)}>
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar onClose={() => setShowMobileFilter(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center text-white">Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
