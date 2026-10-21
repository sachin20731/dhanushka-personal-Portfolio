"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "./motion/Reveal";

const ROLES = ["Software Engineer", "Web Developer", "Freelancer", "Aviation Lover"];

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const line: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};

/** Hero headline: each line rises out of a mask, then the role keeps rolling. */
export default function TypingHeading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.h1
      variants={group}
      aria-label={`Hi, I'm Dhanushka, ${ROLES.join(", ")}`}
      className="font-semibold tracking-tight text-mist"
    >
      <span aria-hidden className="block overflow-hidden pb-1">
        <motion.span variants={line} className="block text-2xl font-normal text-muted sm:text-3xl md:text-4xl">
          Hi, I&apos;m
        </motion.span>
      </span>

      <span aria-hidden className="block overflow-hidden pb-3">
        <motion.span
          variants={line}
          className="text-gradient block text-[3.4rem] leading-[0.95] sm:text-7xl md:text-8xl xl:text-[7.5rem]"
        >
          Dhanushka
        </motion.span>
      </span>

      <span aria-hidden className="block overflow-hidden">
        <motion.span variants={line} className="block text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-[2.75rem]">
          <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={ROLES[index]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="block whitespace-nowrap"
              >
                {ROLES[index]}
                <span className="text-lilac">.</span>
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.span>
      </span>
    </motion.h1>
  );
}
