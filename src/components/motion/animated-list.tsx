"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedListItemProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export function AnimatedListItem({
  children,
  index,
  className,
}: AnimatedListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
