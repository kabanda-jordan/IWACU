"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, MapPin, Phone, Mail, Globe, MessageCircle, Camera, Briefcase, Play } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/agents" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Properties: [
    { label: "For Sale", href: "/properties?status=For+Sale" },
    { label: "For Rent", href: "/properties?status=For+Rent" },
    { label: "New Listings", href: "/properties?sort=newest" },
    { label: "Featured", href: "/properties?featured=true" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socials = [
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: MessageCircle, label: "Twitter / X", href: "#" },
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
  { icon: Play, label: "YouTube", href: "#" },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/Iwacu_logo.png" alt="IWACU" width={36} height={36} className="w-9 h-9" />
              <span className="text-2xl font-black tracking-widest text-white">IWACU</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Rwanda&apos;s premium real estate platform. Connecting people with their perfect properties across the country.
            </p>
            {/* Contact */}
            <div className="space-y-3 text-sm text-white/50">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C6A86A] shrink-0" />
                <span>KG 7 Ave, Kacyiru, Kigali, Rwanda</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C6A86A] shrink-0" />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C6A86A] shrink-0" />
                <span>hello@iwacu.rw</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 text-sm hover:text-[#C6A86A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-y border-white/5 py-10 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold text-lg mb-1">Stay Updated</h4>
              <p className="text-white/40 text-sm">Get the latest property listings and market news.</p>
            </div>
            {subscribed ? (
              <div className="text-[#C6A86A] font-medium text-sm">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 md:w-72 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C6A86A] transition-colors"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#C6A86A] text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-[#D4BC8A] transition-colors text-sm"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} IWACU Real Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#C6A86A]/20 hover:text-[#C6A86A] transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
