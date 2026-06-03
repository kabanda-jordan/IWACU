"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Bed, Bath, Maximize, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types";
import { usePropertyStore } from "@/store/usePropertyStore";
import { Badge } from "@/components/ui/Badge";

interface PropertyCardProps {
  property: Property;
  index?: number;
  layout?: "grid" | "list";
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  index = 0,
  layout = "grid",
}) => {
  const { favorites, toggleFavorite } = usePropertyStore();
  const isFav = favorites.includes(property.id);

  if (layout === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ x: 4, borderColor: "rgba(198, 168, 106, 0.3)", transition: { duration: 0.25 } }}
        className="glass-card rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-xl hover:shadow-[#C6A86A]/5 group border border-white/5"
      >
        <div className="relative w-full sm:w-72 h-48 sm:h-auto shrink-0 overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, 288px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all",
              isFav ? "bg-[#C6A86A] text-black" : "bg-black/50 text-white hover:bg-[#C6A86A] hover:text-black backdrop-blur-sm"
            )}
            aria-label="Toggle favourite"
          >
            <motion.span
              animate={isFav ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={cn("w-4 h-4", isFav && "fill-current")} />
            </motion.span>
          </motion.button>
          <Badge
            variant={property.priceType === "rent" ? "blue" : "gold"}
            className="absolute top-3 left-3"
          >
            {property.priceType === "rent" ? "For Rent" : "For Sale"}
          </Badge>
        </div>

        <Link href={`/property/${property.id}`} className="flex flex-col justify-between p-5 flex-1">
          <div>
            <div className="flex items-start justify-between mb-2 gap-3">
              <h3 className="text-white font-semibold text-base leading-tight group-hover:text-[#C6A86A] transition-colors line-clamp-2">
                {property.title}
              </h3>
              <Badge variant="gray" className="shrink-0">{property.type}</Badge>
            </div>
            <div className="flex items-center gap-1 text-white/40 text-xs mb-3">
              <MapPin className="w-3 h-3" />
              <span>{property.district}, {property.city}</span>
            </div>
            <p className="text-white/40 text-sm line-clamp-2">{property.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 text-white/50 text-xs">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{property.bedrooms}</span>
              )}
              {property.bathrooms > 0 && (
                <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{property.bathrooms}</span>
              )}
              <span className="flex items-center gap-1"><Maximize className="w-3 h-3" />{property.area} m²</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{property.views}</span>
            </div>
            <div className="text-[#C6A86A] font-bold text-base">
              {formatPrice(property.price)}
              {property.priceType === "rent" && <span className="text-xs text-white/40">/mo</span>}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, borderColor: "rgba(198, 168, 106, 0.3)", transition: { duration: 0.25 } }}
      className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:shadow-2xl hover:shadow-[#C6A86A]/10 hover:bg-white/[0.02] transition-colors group"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={property.priceType === "rent" ? "blue" : "gold"}>
            {property.priceType === "rent" ? "For Rent" : "For Sale"}
          </Badge>
          {property.isFeatured && <Badge variant="green">Featured</Badge>}
        </div>

        {/* Favourite */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => { e.preventDefault(); toggleFavorite(property.id); }}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg",
            isFav
              ? "bg-[#C6A86A] text-black"
              : "bg-black/50 text-white hover:bg-[#C6A86A]/80 hover:text-black backdrop-blur-sm"
          )}
          aria-label="Toggle favourite"
        >
          <motion.span
            animate={isFav ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={cn("w-4 h-4", isFav && "fill-current")} />
          </motion.span>
        </motion.button>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-bold text-lg drop-shadow-lg">
            {formatPrice(property.price)}
          </span>
          {property.priceType === "rent" && (
            <span className="text-white/60 text-xs ml-1">/mo</span>
          )}
        </div>
      </div>

      {/* Body */}
      <Link href={`/property/${property.id}`} className="block p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-[#C6A86A] transition-colors line-clamp-2">
            {property.title}
          </h3>
          <Badge variant="gray" className="shrink-0 text-[10px]">{property.type}</Badge>
        </div>

        <div className="flex items-center gap-1 text-white/40 text-xs mb-4">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{property.district}, {property.city}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-white/5">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Bed className="w-3.5 h-3.5 text-[#C6A86A]" />
              <span>{property.bedrooms} Bed</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Bath className="w-3.5 h-3.5 text-[#C6A86A]" />
              <span>{property.bathrooms} Bath</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-white/50 text-xs ml-auto">
            <Maximize className="w-3.5 h-3.5 text-[#C6A86A]" />
            <span>{property.area} m²</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
