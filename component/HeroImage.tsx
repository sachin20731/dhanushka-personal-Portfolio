"use client";

import Image from "next/image";
import { Briefcase } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { EASE } from "./motion/Reveal";
import AtcRadar from "./AtcRadar";

const STACK = [
  { src: "/java.png", alt: "Java" },
  { src: "/next.png", alt: "Next.js" },
  { src: "/aws.png", alt: "AWS" },
  { src: "/docker.png", alt: "Docker" },
];

export default function HeroImage() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Cursor-driven 3D tilt with a soft glare
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 16 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 16 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(30);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 45%)`;

  // Photo drifts a little slower than the page while scrolling away
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 12);
    rx.set(-(py - 0.5) * 12);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={wrapRef}
      style={{ y: parallaxY }}
      className="relative mx-auto w-full max-w-[20rem] [perspective:1200px] sm:max-w-sm md:max-w-md lg:mx-0 lg:max-w-[30rem]"
    >
      {/* Approach radar scope, centred on the photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.8, ease: EASE }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 w-[230%] -translate-x-1/2 -translate-y-1/2 lg:w-[195%]"
      >
        <div className="opacity-50 [mask-image:radial-gradient(circle,#000_60%,transparent_72%)] lg:opacity-95">
          <AtcRadar background className="w-full" />
        </div>
      </motion.div>

      {/* Glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.5, ease: EASE }}
        className="absolute -inset-8 -z-10"
      >
        <div className="animate-glow h-full w-full rounded-[3rem] bg-iris/35 blur-3xl" />
      </motion.div>

      {/* Photo card */}
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY }}
        initial={{ clipPath: "inset(100% 0% 0% 0% round 2rem)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
        transition={{ duration: 1.4, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-2xl shadow-black/50"
      >
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: 0.35, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src="/dhanushka.jpeg"
            alt="Portrait of Dhanushka"
            fill
            preload
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 448px, 90vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </motion.div>

      {/* Experience chip */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
        className="absolute -left-3 bottom-10 sm:-left-10"
      >
        <div className="animate-float-soft flex items-center gap-3 rounded-2xl border border-white/10 bg-surface/80 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur-md">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-iris/20 text-lilac">
            <Briefcase size={18} />
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-mist">1+ year</p>
            <p className="text-xs text-muted">industry experience</p>
          </div>
        </div>
      </motion.div>

      {/* Stack chip */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.7, duration: 0.9, ease: EASE }}
        className="absolute -right-3 top-10 sm:-right-8"
      >
        <div
          className="animate-float-soft flex items-center gap-2 rounded-2xl border border-white/10 bg-surface/80 px-3 py-2.5 shadow-xl shadow-black/40 backdrop-blur-md"
          style={{ animationDelay: "1.5s" }}
        >
          {STACK.map((s) => (
            <span key={s.alt} className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.06]" title={s.alt}>
              <Image src={s.src} alt={s.alt} width={20} height={20} className="h-5 w-5 object-contain" />
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
