"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type BackgroundElementsProps = {
  /** Code tags scattered in the background. */
  tags?: string[];
  /** Large faint letter in the background. */
  letter?: string;
  /** Layers drift with the cursor. */
  interactive?: boolean;
  /** Show the soft colour glows. */
  glow?: boolean;
  /** Fade the code tags and icons further so they never compete with content. */
  dim?: boolean;
  /** Show the floating code tags and tech icons. */
  decor?: boolean;
};

const DEFAULT_TAGS = ["<html>", "<body>", "<h1>", "</button>", "</button>", "<p>", "</p>", "</body>", "</html>"];

const TAG_POSITIONS = [
  "top-10 left-10 animate-float",
  "top-20 left-16 animate-float-delayed",
  "top-48 left-20 animate-float",
  "top-[35%] right-1/3 animate-float-slow",
  "top-[50%] right-1/4 animate-float",
  "top-[70%] left-24 animate-float",
  "bottom-40 left-24 animate-float-delayed",
  "bottom-16 left-16 animate-float",
  "bottom-8 left-10 animate-float-slow",
];

const ICONS = [
  { src: "/docker.png", alt: "", pos: "top-32 left-1/3 animate-float" },
  { src: "/java.png", alt: "", pos: "bottom-40 right-1/2 animate-float-delayed" },
  { src: "/aws.png", alt: "", pos: "bottom-20 right-[40%] animate-float" },
  { src: "/github.png", alt: "", pos: "top-48 left-[45%] animate-float-slow" },
];

export default function BackgroundElements({
  tags = DEFAULT_TAGS,
  letter = "N",
  interactive = false,
  glow = true,
  dim = false,
  decor = true,
}: BackgroundElementsProps) {
  const layerOpacity = dim ? "opacity-40" : "opacity-50 md:opacity-100";
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const nearX = useTransform(sx, (v) => v * -28);
  const nearY = useTransform(sy, (v) => v * -28);
  const farX = useTransform(sx, (v) => v * -12);
  const farY = useTransform(sy, (v) => v * -12);

  useEffect(() => {
    if (!interactive) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive, mx, my]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
      {glow && (
        <>
          <div className="animate-drift absolute -left-[10%] -top-[20%] h-[55vmax] w-[55vmax] rounded-full bg-iris/[0.13] blur-[120px]" />
          <div className="animate-drift-reverse absolute -bottom-[25%] -right-[10%] h-[50vmax] w-[50vmax] rounded-full bg-[#3d3570]/30 blur-[120px]" />
        </>
      )}
      <div className="bg-grid absolute inset-0" />

      {decor && (
      <>
      <motion.div
        style={{ x: farX, y: farY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.6 }}
        className={`absolute inset-0 font-mono text-sm italic text-[#57528C]/80 ${layerOpacity}`}
      >
        {tags.slice(0, TAG_POSITIONS.length).map((tag, i) => (
          <span key={i} className={`absolute ${TAG_POSITIONS[i]}`}>
            {tag}
          </span>
        ))}
        <span className="animate-float-delayed absolute right-[30%] top-[60%] text-6xl font-black not-italic opacity-25">
          {letter}
        </span>
      </motion.div>

      <motion.div
        style={{ x: nearX, y: nearY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.9 }}
        className={`absolute inset-0 ${layerOpacity}`}
      >
        {ICONS.map((icon) => (
          <div key={icon.src} className={`absolute opacity-25 ${icon.pos}`}>
            <Image src={icon.src} alt={icon.alt} width={44} height={44} />
          </div>
        ))}
      </motion.div>
      </>
      )}
    </div>
  );
}
