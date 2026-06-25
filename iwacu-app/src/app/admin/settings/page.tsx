"use client";
import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
      checked
        ? "bg-[#C6A86A] shadow-[0_0_10px_rgba(198,168,106,0.3)]"
        : "bg-white/10 hover:bg-white/20"
    }`}
    role="switch"
    aria-checked={checked}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    requireApproval: true,
    autoVerify: false,
    maintenanceMode: false,
    emailAlerts: true,
  });
  const [saved, setSaved] = useState(false);
  const toggle = (k: keyof typeof settings) => setSettings((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div>
      <DashboardHeader title="Platform Settings" subtitle="Configure IWACU platform behaviour" />
      <div className="p-6 max-w-2xl space-y-5">
        <div className="glass-card rounded-2xl p-6 space-y-5">
          <h3 className="text-white font-semibold">Platform Configuration</h3>
          {[
            { key: "requireApproval", label: "Require Property Approval", desc: "New listings need admin approval before going live" },
            { key: "autoVerify", label: "Auto-Verify Agents", desc: "Automatically verify agents on signup (not recommended)" },
            { key: "maintenanceMode", label: "Maintenance Mode", desc: "Temporarily disable the platform for updates" },
            { key: "emailAlerts", label: "Admin Email Alerts", desc: "Receive email on new submissions and flags" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <div className="text-white/80 text-sm">{label}</div>
                <div className="text-white/30 text-xs">{desc}</div>
              </div>
              <Toggle checked={settings[key as keyof typeof settings]} onChange={() => toggle(key as keyof typeof settings)} />
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-semibold">Contact Information</h3>
          <Input label="Support Email" type="email" defaultValue="support@iwacu.rw" />
          <Input label="Support Phone" type="tel" defaultValue="+250 788 123 456" />
          <Input label="Office Address" defaultValue="KG 7 Ave, Kacyiru, Kigali" />
        </div>

        <Button
          variant="gold"
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
        >
          {saved ? "Settings Saved!" : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
