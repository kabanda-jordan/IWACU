import React from "react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  description = "Try adjusting your search or filter criteria.",
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
      <SearchX className="w-8 h-8 text-[#C6A86A]" />
    </div>
    <div>
      <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
      <p className="text-white/40 text-sm max-w-xs">{description}</p>
    </div>
    {action}
  </div>
);
