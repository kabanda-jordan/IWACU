"use client";
import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-[#C6A86A]" : "bg-white/10"}`}
    role="switch"
    aria-checked={checked}
  >
    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
  </button>
);

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifs: true,
    smsNotifs: false,
    priceAlerts: true,
    newListings: true,
    newsletter: false,
    profilePublic: true,
    showPhone: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const Section: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({
    title, description, children,
  }) => (
    <div className="glass-card rounded-2xl p-6 mb-4">
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      {description && <p className="text-white/40 text-sm mb-4">{description}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  );

  const SettingRow: React.FC<{ label: string; description?: string; settingKey: keyof typeof settings }> = ({
    label, description, settingKey,
  }) => (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-white/80 text-sm">{label}</div>
        {description && <div className="text-white/30 text-xs">{description}</div>}
      </div>
      <Toggle checked={settings[settingKey]} onChange={() => toggle(settingKey)} />
    </div>
  );

  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Manage your preferences" />
      <div className="p-6 max-w-2xl">
        <Section title="Notifications" description="Choose what updates you receive">
          <SettingRow label="Email Notifications" description="Receive updates via email" settingKey="emailNotifs" />
          <SettingRow label="SMS Notifications" description="Receive updates via SMS" settingKey="smsNotifs" />
          <SettingRow label="Price Alerts" description="Get notified when saved property prices change" settingKey="priceAlerts" />
          <SettingRow label="New Listings" description="Be notified of new matching properties" settingKey="newListings" />
          <SettingRow label="Newsletter" description="Weekly Rwanda property market digest" settingKey="newsletter" />
        </Section>

        <Section title="Privacy" description="Control your profile visibility">
          <SettingRow label="Public Profile" description="Allow agents to see your profile" settingKey="profilePublic" />
          <SettingRow label="Show Phone Number" description="Display your phone to agents" settingKey="showPhone" />
        </Section>

        <Section title="Danger Zone">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              Deactivate Account
            </Button>
            <Button variant="danger" size="sm">
              Delete Account
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
