"use client";

import { motion, type Variants } from "framer-motion";
import { EASE } from "../motion/Reveal";

type SectionHeadingProps = {
  title: string;
  intro?: string;
  align?: "left" | "center";
};

const group: Variants = { hidden: {}, visible: {} };

const rise: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

const draw: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, delay: 0.2, ease: EASE } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, delay: 0.15, ease: EASE } },
};

/**
 * Section title that slides up out of a mask, with a drawn underline.
 * The scroll trigger sits on the outer wrapper: the masked title itself
 * starts fully clipped, so it can't be what the browser watches for.
 */
export default function SectionHeading({ title, intro, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={centered ? "mx-auto text-center" : ""}
    >
      <div className="overflow-hidden pb-2">
        <motion.h2
          variants={rise}
          className="text-4xl font-semibold tracking-tight text-mist sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h2>
      </div>

      <motion.span
        aria-hidden
        variants={draw}
        className={`mt-4 block h-px w-24 bg-linear-to-r from-iris via-lilac to-transparent ${
          centered ? "mx-auto origin-center" : "origin-left"
        }`}
      />

      {intro && (
        <motion.p
          variants={fade}
          className={`mt-5 text-base leading-relaxed text-muted md:text-lg ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
