"use client";
import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PropertyCard } from "@/components/property/PropertyCard";
import { usePropertyStore } from "@/store/usePropertyStore";
import { Button } from "@/components/ui/Button";

export default function FavoritesPage() {
  const { getFavoriteProperties } = usePropertyStore();
  const favorites = getFavoriteProperties();

  return (
    <div>
      <DashboardHeader title="Saved Properties" subtitle={`${favorites.length} properties saved`} />
      <div className="p-6">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {favorites.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-5">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white/20" />
            </div>
            <div className="text-center">
              <h3 className="text-white font-semibold text-lg mb-1">No saved properties</h3>
              <p className="text-white/40 text-sm max-w-xs">
                Start browsing and click the heart icon to save properties you love.
              </p>
            </div>
            <Link href="/properties">
              <Button variant="gold">Browse Properties</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
