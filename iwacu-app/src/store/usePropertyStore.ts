"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Property, FilterState } from "@/types";
import { MOCK_PROPERTIES } from "@/data/properties";

interface PropertyStore {
  properties: Property[];
  favorites: string[];
  recentlyViewed: string[];
  filters: FilterState;
  searchQuery: string;
  sortBy: string;
  viewMode: "grid" | "list";

  // Actions
  toggleFavorite: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setSearchQuery: (q: string) => void;
  setSortBy: (sort: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  getFilteredProperties: () => Property[];
  getFavoriteProperties: () => Property[];
}

const defaultFilters: FilterState = {
  type: "",
  status: "",
  city: "",
  district: "",
  minPrice: 0,
  maxPrice: 0,
  minBedrooms: 0,
  minBathrooms: 0,
  minArea: 0,
  maxArea: 0,
  amenities: [],
};

export const usePropertyStore = create<PropertyStore>()(
  persist(
    (set, get) => ({
      properties: MOCK_PROPERTIES,
      favorites: [],
      recentlyViewed: [],
      filters: defaultFilters,
      searchQuery: "",
      sortBy: "newest",
      viewMode: "grid",

      toggleFavorite: (id) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(id)
            ? favorites.filter((f) => f !== id)
            : [...favorites, id],
        });
      },

      addRecentlyViewed: (id) => {
        const { recentlyViewed } = get();
        const updated = [id, ...recentlyViewed.filter((r) => r !== id)].slice(0, 10);
        set({ recentlyViewed: updated });
      },

      setFilters: (filters) => {
        set((s) => ({ filters: { ...s.filters, ...filters } }));
      },

      resetFilters: () => {
        set({ filters: defaultFilters, searchQuery: "" });
      },

      setSearchQuery: (q) => set({ searchQuery: q }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setViewMode: (mode) => set({ viewMode: mode }),

      getFilteredProperties: () => {
        const { properties, filters, searchQuery, sortBy } = get();
        let result = [...properties];

        // Search
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          result = result.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.city.toLowerCase().includes(q) ||
              p.district.toLowerCase().includes(q) ||
              p.address.toLowerCase().includes(q)
          );
        }

        // Filters
        if (filters.type) result = result.filter((p) => p.type === filters.type);
        if (filters.status) result = result.filter((p) => p.status === filters.status);
        if (filters.city) result = result.filter((p) => p.city === filters.city);
        if (filters.district) result = result.filter((p) => p.district === filters.district);
        if (filters.minPrice) result = result.filter((p) => p.price >= filters.minPrice);
        if (filters.maxPrice) result = result.filter((p) => p.price <= filters.maxPrice);
        if (filters.minBedrooms) result = result.filter((p) => p.bedrooms >= filters.minBedrooms);
        if (filters.minBathrooms) result = result.filter((p) => p.bathrooms >= filters.minBathrooms);
        if (filters.minArea) result = result.filter((p) => p.area >= filters.minArea);
        if (filters.maxArea) result = result.filter((p) => p.area <= filters.maxArea);
        if (filters.amenities.length > 0) {
          result = result.filter((p) =>
            filters.amenities.every((a) => p.amenities.includes(a))
          );
        }

        // Sort
        switch (sortBy) {
          case "price_asc":
            result.sort((a, b) => a.price - b.price);
            break;
          case "price_desc":
            result.sort((a, b) => b.price - a.price);
            break;
          case "most_viewed":
            result.sort((a, b) => b.views - a.views);
            break;
          case "oldest":
            result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          default: // newest
            result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return result;
      },

      getFavoriteProperties: () => {
        const { properties, favorites } = get();
        return properties.filter((p) => favorites.includes(p.id));
      },
    }),
    {
      name: "iwacu-property-store",
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);
