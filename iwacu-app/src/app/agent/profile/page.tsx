"use client";
import React, { useState } from "react";
import { Camera, Save } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PROPERTY_TYPES, CITIES } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

export default function AgentProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: "Kigali",
    bio: "",
    specialization: [] as string[],
  });

  const toggleSpec = (t: string) =>
    setForm((f) => ({
      ...f,
      specialization: f.specialization.includes(t)
        ? f.specialization.filter((s) => s !== t)
        : [...f.specialization, t],
    }));

  return (
    <div>
      <DashboardHeader title="Agent Profile" subtitle="How clients see you" />
      <div className="p-6 max-w-2xl space-y-5">
        {/* Avatar */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-[#C6A86A] flex items-center justify-center text-black font-black text-2xl">
                {user?.name?.charAt(0) || "A"}
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#C6A86A] flex items-center justify-center text-black hover:bg-[#D4BC8A] transition-colors shadow-lg">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{user?.name}</h3>
              <p className="text-white/40 text-sm">Certified Real Estate Agent</p>
              <p className="text-[#C6A86A] text-xs mt-1">✓ Verified Agent</p>
            </div>
          </div>
        </div>

        {/* Personal info */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-semibold">Personal Information</h3>
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

          <div>
            <label className="text-sm font-medium text-white/80 mb-1.5 block">City</label>
            <select
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C6A86A] transition-colors"
            >
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-white/80 mb-1.5 block">Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell clients about your experience..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Specialization */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Specialization</h3>
          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => toggleSpec(t)}
                className={cn(
                  "px-3 py-1.5 rounded-lg border text-sm transition-colors",
                  form.specialization.includes(t)
                    ? "bg-[#C6A86A]/10 border-[#C6A86A] text-[#C6A86A]"
                    : "border-white/10 text-white/50 hover:border-white/30"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="gold"
          className="flex items-center gap-2"
          onClick={() => { updateProfile({ name: form.name }); setSaved(true); setTimeout(() => setSaved(false), 3000); }}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
