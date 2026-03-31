import { cn } from "@/lib/utils";
import { STATUS_COLORS } from "@/lib/constants";
import type { PostStatus } from "@/types";

interface BadgeProps {
  status: PostStatus;
  className?: string;
}

export function Badge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_COLORS[status],
        className
      )}
    >
      {status}
    </span>
  );
}
