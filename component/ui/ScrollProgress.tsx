"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin bar along the top edge that fills as the page is read. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-linear-to-r from-iris via-lilac to-iris"
    />
  );
}
