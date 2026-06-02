"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Upload, Plus, X, Check } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CITIES, PROPERTY_TYPES, AMENITIES } from "@/constants";
import { cn } from "@/lib/utils";

const STEPS = ["Basic Info", "Details", "Location", "Amenities", "Pricing"];

export default function AddPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "", description: "", type: "Apartment", status: "For Sale",
    city: "Kigali", district: "", address: "",
    bedrooms: "", bathrooms: "", area: "", parking: "", floors: "",
    price: "", priceType: "sale",
    yearBuilt: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleAmenity = (a: string) => setAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => router.push("/agent/properties"), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-white font-bold text-2xl mb-2">Property Submitted!</h2>
          <p className="text-white/40 text-sm">Your listing is under review and will be published shortly.</p>
        </motion.div>
      </div>
    );
  }

  const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/80">{label}</label>
      {children}
    </div>
  );

  const selectClass = "bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A86A] transition-colors";

  return (
    <div>
      <DashboardHeader title="Add New Property" subtitle="List your property on IWACU" />
      <div className="p-6 max-w-3xl">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "flex items-center gap-2 shrink-0 text-sm font-medium transition-colors",
                  i === step ? "text-[#C6A86A]" : i < step ? "text-green-400" : "text-white/30"
                )}
              >
                <span className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                  i === step ? "bg-[#C6A86A] text-black" : i < step ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/30"
                )}>
                  {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </span>
                {s}
              </button>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-white/10 min-w-[20px]" />}
            </React.Fragment>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6">
          {/* Step 0 — Basic Info */}
          {step === 0 && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg">Basic Information</h3>
              <Input label="Property Title" placeholder="e.g. Modern 3-Bedroom Apartment in Kiyovu" value={form.title} onChange={(e) => update("title", e.target.value)} />
              <FormField label="Description">
                <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe your property in detail..." className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors resize-none" />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Property Type">
                  <select value={form.type} onChange={(e) => update("type", e.target.value)} className={selectClass}>
                    {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </FormField>
                <FormField label="Listing Type">
                  <select value={form.priceType} onChange={(e) => update("priceType", e.target.value)} className={selectClass}>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </FormField>
              </div>

              {/* Image upload mock */}
              <FormField label="Property Images">
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#C6A86A]/30 transition-colors cursor-pointer" onClick={() => setImages((imgs) => [...imgs, `https://images.unsplash.com/photo-${Date.now()}?w=400`])}>
                  <Upload className="w-8 h-8 text-white/20 mx-auto mb-2" />
                  <p className="text-white/40 text-sm">Click to upload images</p>
                  <p className="text-white/20 text-xs mt-1">PNG, JPG up to 10MB each</p>
                </div>
                {images.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {images.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden glass-card">
                        <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/30 text-xs">
                          IMG {i + 1}
                        </div>
                        <button onClick={() => setImages((imgs) => imgs.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center text-white/60 hover:text-white">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => setImages((imgs) => [...imgs, `img-${imgs.length + 1}`])} className="w-16 h-16 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center text-white/30 hover:border-[#C6A86A]/30 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </FormField>
            </div>
          )}

          {/* Step 1 — Details */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg">Property Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Bedrooms" type="number" placeholder="0" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} />
                <Input label="Bathrooms" type="number" placeholder="0" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} />
                <Input label="Area (m²)" type="number" placeholder="0" value={form.area} onChange={(e) => update("area", e.target.value)} />
                <Input label="Parking Spaces" type="number" placeholder="0" value={form.parking} onChange={(e) => update("parking", e.target.value)} />
                <Input label="Floors" type="number" placeholder="1" value={form.floors} onChange={(e) => update("floors", e.target.value)} />
                <Input label="Year Built" type="number" placeholder="2020" value={form.yearBuilt} onChange={(e) => update("yearBuilt", e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 2 — Location */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg">Location</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="City">
                  <select value={form.city} onChange={(e) => update("city", e.target.value)} className={selectClass}>
                    {CITIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </FormField>
                <Input label="District" placeholder="e.g. Gasabo" value={form.district} onChange={(e) => update("district", e.target.value)} />
              </div>
              <Input label="Full Address" placeholder="KG 15 Ave, Nyarutarama..." value={form.address} onChange={(e) => update("address", e.target.value)} />
              <div className="bg-white/5 border border-white/10 rounded-xl h-40 flex items-center justify-center text-white/30 text-sm">
                📍 Map integration (coming soon)
              </div>
            </div>
          )}

          {/* Step 3 — Amenities */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg">Amenities & Features</h3>
              <p className="text-white/40 text-sm">Select all amenities available in this property.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES.map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-colors text-left",
                      amenities.includes(a)
                        ? "bg-[#C6A86A]/10 border-[#C6A86A] text-[#C6A86A]"
                        : "bg-white/3 border-white/10 text-white/50 hover:border-white/20"
                    )}
                  >
                    {amenities.includes(a) ? <Check className="w-3.5 h-3.5 shrink-0" /> : <Plus className="w-3.5 h-3.5 shrink-0 opacity-50" />}
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — Pricing */}
          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-white font-semibold text-lg">Pricing</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={form.priceType === "rent" ? "Monthly Rent (RWF)" : "Sale Price (RWF)"}
                  type="number"
                  placeholder="0"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                />
                <FormField label="Listing Type">
                  <select value={form.priceType} onChange={(e) => update("priceType", e.target.value)} className={selectClass}>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </FormField>
              </div>
              {form.price && (
                <div className="glass-card rounded-xl p-4">
                  <p className="text-white/40 text-sm mb-1">Listing Summary</p>
                  <p className="text-white font-semibold">{form.title || "Untitled Property"}</p>
                  <p className="text-[#C6A86A] text-xl font-bold mt-1">
                    RWF {Number(form.price).toLocaleString()}
                    {form.priceType === "rent" && <span className="text-sm text-white/40">/month</span>}
                  </p>
                  <p className="text-white/40 text-xs mt-1">{form.city} · {form.type}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>← Back</Button>
            ) : <div />}
            {step < STEPS.length - 1 ? (
              <Button variant="gold" onClick={() => setStep(step + 1)}>Continue →</Button>
            ) : (
              <Button variant="gold" onClick={handleSubmit}>Submit Listing</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
