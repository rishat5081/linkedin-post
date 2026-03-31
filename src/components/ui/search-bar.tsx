"use client";

import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
}

export function SearchBar({ onSearch, className, ...props }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        className={cn(
          "w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-800",
          className
        )}
        {...props}
      />
    </div>
  );
}
