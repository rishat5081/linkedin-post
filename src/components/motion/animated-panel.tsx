"use client";

import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedPanelProps {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}

export function AnimatedPanel({
  children,
  isOpen,
  className,
}: AnimatedPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
