import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Review } from "@/types";
import { formatDate } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src={review.userAvatar}
            alt={review.userName}
            fill
            className="object-cover rounded-full"
            sizes="40px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-white font-medium text-sm">{review.userName}</h4>
            <span className="text-white/30 text-xs">{formatDate(review.createdAt)}</span>
          </div>
          <div className="flex items-center gap-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < review.rating ? "text-[#C6A86A] fill-current" : "text-white/20"}`}
              />
            ))}
          </div>
          <p className="text-white/50 text-sm leading-relaxed">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};
