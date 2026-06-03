"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix = "",
  prefix = "",
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setCount(0);
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, borderColor: "rgba(198, 168, 106, 0.3)", transition: { duration: 0.25 } }}
      className="glass-card rounded-2xl p-8 text-center border border-white/5 hover:shadow-xl hover:shadow-[#C6A86A]/5 hover:bg-white/[0.02] transition-colors"
    >
      <motion.div
        key={count}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold text-gold-gradient mb-2"
      >
        {prefix}{count.toLocaleString()}{suffix}
      </motion.div>
      <div className="text-white/60 text-sm tracking-widest uppercase">{label}</div>
    </motion.div>
  );
};
