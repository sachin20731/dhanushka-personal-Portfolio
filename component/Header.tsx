"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Plane } from "lucide-react";
import TypingHeading from "./TypingHeading";
import MagneticButton from "./ui/MagneticButton";
import { EASE } from "./motion/Reveal";
import { ZuluClock } from "./AtcRadar";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Header() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="z-20 mt-16 flex flex-col items-center text-center lg:mt-0 lg:items-start lg:text-left"
    >
      <motion.div variants={item} className="mb-7 flex flex-wrap justify-center gap-2 lg:justify-start">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-mist/80 backdrop-blur sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for freelance work
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-iris/40 bg-iris/10 px-4 py-1.5 text-xs text-mist/90 backdrop-blur sm:text-sm">
          <Plane size={14} className="animate-float-soft text-lilac" />
          Aviation lover
        </span>
      </motion.div>

      <TypingHeading />

      <motion.p variants={item} className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        I build web applications end to end: React and Next.js interfaces, backed by Spring Boot, Node and MySQL.
      </motion.p>

      <motion.div variants={item} className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
        <MagneticButton href="#contact">Contact me</MagneticButton>
        <MagneticButton href="#projects" variant="ghost">
          View projects
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
}

/** Small animated cue at the bottom of the hero that invites scrolling. */
export function ScrollCue() {
  return (
    <motion.a
      href="#about"
      aria-label="Scroll to About"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: EASE }}
      className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted transition-colors hover:text-mist lg:flex"
    >
      <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/20">
        <motion.span
          animate={{ y: [6, 18, 6], opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-0 h-2 w-1 rounded-full bg-lilac"
        />
      </span>
      <ArrowDown size={14} className="opacity-60" />
    </motion.a>
  );
}

/** Status line for the hero radar, styled like an ATC display readout. */
export function RadarReadout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 1 }}
      className="absolute bottom-8 right-8 z-20 hidden items-center gap-4 rounded-full border border-white/[0.07] bg-ink/60 px-4 py-2 font-mono text-[11px] text-muted backdrop-blur-md lg:flex"
    >
      <span className="inline-flex items-center gap-2 text-mist/85">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Approach radar
      </span>
      <span>RWY 04</span>
      <ZuluClock />
    </motion.div>
  );
}
