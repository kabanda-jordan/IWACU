"use client";
import React, { useEffect, useState } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Bed, Bath, Maximize, Car, Calendar, Eye,
  Heart, Share2, Phone, Mail, ShieldCheck, Star,
  ChevronLeft, ChevronRight, X, CheckCircle2, ArrowLeft,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ReviewCard } from "@/components/shared/ReviewCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_PROPERTIES } from "@/data/properties";
import { MOCK_AGENTS } from "@/data/agents";
import { MOCK_REVIEWS } from "@/data/reviews";
import { usePropertyStore } from "@/store/usePropertyStore";
import { formatPrice, formatDate } from "@/lib/utils";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { favorites, toggleFavorite, addRecentlyViewed } = usePropertyStore();

  const property = MOCK_PROPERTIES.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("Morning (9am – 12pm)");
  const [visitPhone, setVisitPhone] = useState("");
  const [visitConfirmed, setVisitConfirmed] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id, addRecentlyViewed]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Property Not Found</h2>
          <Link href="/properties">
            <Button variant="gold">Browse Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const agent = MOCK_AGENTS.find((a) => a.id === property.agentId) || MOCK_AGENTS[0];
  const reviews = MOCK_REVIEWS.filter((r) => r.propertyId === property.id);
  const similar = MOCK_PROPERTIES.filter(
    (p) => p.id !== property.id && p.type === property.type
  ).slice(0, 3);
  const isFav = favorites.includes(property.id);

  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      <Navbar />

      <div className="pt-20">
        {/* Back */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Properties
          </Link>
        </div>

        {/* ── GALLERY ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 rounded-2xl overflow-hidden">
            {/* Main image */}
            <div
              className="lg:col-span-2 relative h-72 sm:h-96 lg:h-[500px] cursor-pointer group"
              onClick={() => { setActiveImage(0); setLightboxOpen(true); }}
            >
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="glass-card text-white/80 text-xs px-3 py-1.5 rounded-full">
                  View all {property.images.length} photos
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="hidden lg:grid grid-rows-2 gap-3">
              {property.images.slice(1, 3).map((img, i) => (
                <div
                  key={i}
                  className="relative cursor-pointer group overflow-hidden rounded-xl"
                  onClick={() => { setActiveImage(i + 1); setLightboxOpen(true); }}
                >
                  <Image
                    src={img}
                    alt={`${property.title} ${i + 2}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="33vw"
                  />
                  {i === 1 && property.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        +{property.images.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTENT ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left — Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant={property.priceType === "rent" ? "blue" : "gold"}>
                        {property.priceType === "rent" ? "For Rent" : "For Sale"}
                      </Badge>
                      <Badge variant="gray">{property.type}</Badge>
                      {property.isVerified && (
                        <Badge variant="green">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </Badge>
                      )}
                      {property.isFeatured && (
                        <Badge variant="green">Featured</Badge>
                      )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <MapPin className="w-4 h-4 text-[#C6A86A] shrink-0" />
                      <span>{property.address}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-[#C6A86A]">
                      {formatPrice(property.price)}
                    </div>
                    {property.priceType === "rent" && (
                      <div className="text-white/40 text-sm">/month</div>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      isFav
                        ? "bg-[#C6A86A]/10 border-[#C6A86A] text-[#C6A86A]"
                        : "border-white/10 text-white/50 hover:border-[#C6A86A] hover:text-[#C6A86A]"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                    {isFav ? "Saved" : "Save"}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/50 hover:border-white/30 hover:text-white text-sm transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs ml-auto">
                    <Eye className="w-3.5 h-3.5" />
                    {property.views} views
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Bed, label: "Bedrooms", value: property.bedrooms || "N/A" },
                  { icon: Bath, label: "Bathrooms", value: property.bathrooms || "N/A" },
                  { icon: Maximize, label: "Area", value: `${property.area} m²` },
                  { icon: Car, label: "Parking", value: property.parking || "N/A" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass-card rounded-xl p-4 text-center">
                    <Icon className="w-5 h-5 text-[#C6A86A] mx-auto mb-2" />
                    <div className="text-white font-semibold text-sm">{String(value)}</div>
                    <div className="text-white/40 text-xs">{label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-white font-semibold text-lg mb-4">About This Property</h2>
                <p className="text-white/60 leading-relaxed">{property.description}</p>
                {(property.yearBuilt || property.floors) && (
                  <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/5">
                    {property.yearBuilt && (
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <Calendar className="w-4 h-4 text-[#C6A86A]" />
                        Built in {property.yearBuilt}
                      </div>
                    )}
                    {property.floors && (
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <span className="text-[#C6A86A] text-base font-bold">{property.floors}</span>
                        Floor{property.floors > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-white font-semibold text-lg mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-white/60 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#C6A86A] shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {property.features.length > 0 && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-white font-semibold text-lg mb-4">Special Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((f) => (
                      <span key={f} className="bg-[#C6A86A]/10 text-[#C6A86A] border border-[#C6A86A]/20 rounded-lg px-3 py-1.5 text-xs font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div>
                <h2 className="text-white font-semibold text-lg mb-4">
                  Reviews {reviews.length > 0 && <span className="text-white/30">({reviews.length})</span>}
                </h2>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
                  </div>
                ) : (
                  <div className="glass-card rounded-2xl p-8 text-center text-white/30 text-sm">
                    No reviews yet for this property.
                  </div>
                )}
              </div>
            </div>

            {/* Right — Agent card + sticky info */}
            <div className="space-y-5">
              {/* Agent */}
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <h3 className="text-white font-semibold mb-4">Listed by</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-14 h-14 shrink-0">
                    <Image
                      src={agent.avatar}
                      alt={agent.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="56px"
                    />
                    {agent.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#C6A86A] flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3 text-black" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{agent.name}</div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 text-[#C6A86A] fill-current" />
                      <span className="text-[#C6A86A] font-semibold">{agent.rating}</span>
                      <span className="text-white/30">({agent.reviews})</span>
                    </div>
                    <div className="text-white/40 text-xs">{agent.listings} listings</div>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-3 w-full glass-card rounded-xl px-4 py-2.5 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#C6A86A]" />
                    {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 w-full glass-card rounded-xl px-4 py-2.5 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#C6A86A]" />
                    {agent.email}
                  </a>
                </div>

                {messageSent ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center text-green-400 text-sm">
                    ✓ Message sent! Agent will contact you soon.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <textarea
                      rows={3}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder={`Hi, I'm interested in "${property.title}"...`}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 resize-none focus:outline-none focus:border-[#C6A86A] transition-colors"
                    />
                    <Button
                      variant="gold"
                      className="w-full"
                      disabled={!messageText.trim()}
                      onClick={() => { if (messageText.trim()) setMessageSent(true); }}
                    >
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setContactOpen(true)}
                    >
                      Schedule a Visit
                    </Button>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-white/5 text-center text-white/30 text-xs">
                  Listed on {formatDate(property.createdAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="text-white font-bold text-2xl mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveImage((p) => Math.max(0, p - 1))}
            disabled={activeImage === 0}
            className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-4xl h-[70vh]">
            <Image
              src={property.images[activeImage]}
              alt={`Image ${activeImage + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={() => setActiveImage((p) => Math.min(property.images.length - 1, p + 1))}
            disabled={activeImage === property.images.length - 1}
            className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === activeImage ? "bg-[#C6A86A]" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Visit Modal */}
      {contactOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            {visitConfirmed ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold text-lg mb-1">Visit Scheduled!</h3>
                <p className="text-white/50 text-sm mb-4">
                  {visitDate} — {visitTime}. We'll contact you at {visitPhone}.
                </p>
                <Button variant="gold" onClick={() => { setContactOpen(false); setVisitConfirmed(false); setVisitDate(""); setVisitPhone(""); }}>
                  Done
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white font-semibold text-lg">Schedule a Visit</h3>
                  <button onClick={() => setContactOpen(false)} className="text-white/40 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">Preferred Date</label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C6A86A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">Preferred Time</label>
                    <select
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#C6A86A] transition-colors"
                    >
                      <option>Morning (9am – 12pm)</option>
                      <option>Afternoon (12pm – 5pm)</option>
                      <option>Evening (5pm – 7pm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">Your Phone</label>
                    <input
                      type="tel"
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      placeholder="+250 ..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors"
                    />
                  </div>
                  <Button
                    variant="gold"
                    className="w-full mt-2"
                    disabled={!visitDate || !visitPhone}
                    onClick={() => { if (visitDate && visitPhone) setVisitConfirmed(true); }}
                  >
                    Confirm Visit
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
