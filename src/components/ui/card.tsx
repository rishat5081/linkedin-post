import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200/60 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50",
        hover &&
          "transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
