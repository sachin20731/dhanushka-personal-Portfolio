"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

/** One easing curve for the whole site keeps every movement feeling related. */
export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  /** Seconds to wait once the element scrolls into view. */
  delay?: number;
  /** Distance (px) the element rises from. */
  y?: number;
  /** Share of the element that must be visible before it plays. */
  amount?: number;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ delay = 0, y = 28, amount = 0.2, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
