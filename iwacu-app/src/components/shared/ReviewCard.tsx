"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { Review } from "@/types";
import { formatDate } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, borderColor: "rgba(198, 168, 106, 0.3)", transition: { duration: 0.25 } }}
      className="group glass-card rounded-2xl p-5 border border-white/5 hover:shadow-xl hover:shadow-[#C6A86A]/5 hover:bg-white/[0.03] transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#C6A86A]/20 group-hover:ring-[#C6A86A]/50 transition-all duration-300">
            <Image
              src={review.userAvatar}
              alt={review.userName}
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#C6A86A] rounded-full flex items-center justify-center">
            <Quote className="w-2 h-2 text-black" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-white font-semibold text-sm">{review.userName}</h4>
            <span className="text-white/30 text-[11px]">{formatDate(review.createdAt)}</span>
          </div>
          <div className="flex items-center gap-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 + i * 0.06, type: "spring", stiffness: 500 }}
              >
                <Star
                  className={`w-3 h-3 ${i < review.rating ? "text-[#C6A86A] fill-current" : "text-white/20"}`}
                />
              </motion.span>
            ))}
          </div>
          <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
            {review.comment}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
