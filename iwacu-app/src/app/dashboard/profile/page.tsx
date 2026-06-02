"use client";
import React, { useState } from "react";
import { User, Mail, Phone, Camera, Save } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: "",
  });

  const handleSave = () => {
    updateProfile({ name: form.name, phone: form.phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <DashboardHeader title="Profile" subtitle="Manage your personal information" />
      <div className="p-6 max-w-2xl">
        {/* Avatar */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-[#C6A86A] flex items-center justify-center text-black font-black text-2xl">
                {user?.name?.charAt(0) || "U"}
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#C6A86A] flex items-center justify-center text-black hover:bg-[#D4BC8A] transition-colors shadow-lg">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{user?.name}</h3>
              <p className="text-white/40 text-sm">{user?.role} · {user?.isVerified ? "✓ Verified" : "Unverified"}</p>
              <p className="text-white/30 text-xs mt-1">Member since {user?.createdAt?.slice(0, 4)}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-6 space-y-5">
          <h3 className="text-white font-semibold mb-2">Personal Information</h3>

          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            icon={<User className="w-4 h-4" />}
          />
          <Input
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            icon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Phone Number"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            icon={<Phone className="w-4 h-4" />}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/80">Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Tell us a little about yourself…"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="gold"
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Security */}
        <div className="glass-card rounded-2xl p-6 mt-6">
          <h3 className="text-white font-semibold mb-4">Security</h3>
          <div className="space-y-3">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" />
            <Button variant="outline" size="sm">Update Password</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
