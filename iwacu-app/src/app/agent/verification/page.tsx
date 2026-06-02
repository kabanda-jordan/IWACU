"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ShieldCheck, Clock, CheckCircle2, FileText, X } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/Button";

const docs = [
  { id: "id", label: "National ID / Passport", description: "Clear photo of both sides" },
  { id: "license", label: "Real Estate License", description: "Issued by RURA or relevant authority" },
  { id: "certificate", label: "Professional Certificate", description: "Any relevant property qualification" },
];

export default function AgentVerificationPage() {
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleUpload = (id: string) => setUploaded((u) => ({ ...u, [id]: true }));
  const handleRemove = (id: string) => setUploaded((u) => { const n = { ...u }; delete n[id]; return n; });

  return (
    <div>
      <DashboardHeader title="Verification" subtitle="Get verified to build trust with clients" />
      <div className="p-6 max-w-2xl">
        {/* Status */}
        <div className="glass-card rounded-2xl p-5 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Verification Status: <span className="text-yellow-400">Pending</span></h3>
            <p className="text-white/40 text-sm">Submit required documents to get your verified badge.</p>
          </div>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-10 text-center"
          >
            <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">Documents Submitted</h3>
            <p className="text-white/40 text-sm">Our team will review your documents within 2–3 business days.</p>
          </motion.div>
        ) : (
          <>
            {/* Benefits */}
            <div className="glass-card rounded-2xl p-5 mb-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C6A86A]" /> Benefits of Verification
              </h3>
              <ul className="space-y-2 text-sm text-white/60">
                {[
                  "Gold verified badge on your profile",
                  "Higher ranking in search results",
                  "Access to premium listing features",
                  "Increased trust from potential buyers",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A86A] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Document upload */}
            <div className="glass-card rounded-2xl p-5 mb-6">
              <h3 className="text-white font-semibold mb-4">Required Documents</h3>
              <div className="space-y-4">
                {docs.map(({ id, label, description }) => (
                  <div key={id} className="flex items-start gap-4 p-4 bg-white/3 rounded-xl border border-white/5">
                    <FileText className="w-5 h-5 text-[#C6A86A] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{label}</div>
                      <div className="text-white/40 text-xs">{description}</div>
                    </div>
                    {uploaded[id] ? (
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                        </span>
                        <button onClick={() => handleRemove(id)} className="text-white/30 hover:text-white/60">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleUpload(id)}
                        className="flex items-center gap-1.5 text-[#C6A86A] text-xs border border-[#C6A86A]/30 rounded-lg px-3 py-1.5 hover:bg-[#C6A86A]/10 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" /> Upload
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="gold"
              className="w-full"
              disabled={Object.keys(uploaded).length < docs.length}
              onClick={() => setSubmitted(true)}
            >
              Submit for Review
            </Button>
            {Object.keys(uploaded).length < docs.length && (
              <p className="text-white/30 text-xs text-center mt-2">
                Upload all {docs.length} required documents to submit.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
