"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
};

/** A link-button that leans gently toward the cursor and springs back. */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  download,
  target,
  rel,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm sm:text-base font-medium transition-[background-color,border-color,box-shadow] duration-300";
  const styles =
    variant === "primary"
      ? "bg-iris text-white shadow-[0_12px_40px_-12px_rgba(106,99,175,0.9)] hover:bg-[#7871c4] hover:shadow-[0_16px_50px_-12px_rgba(164,155,234,0.8)]"
      : "border border-white/15 text-mist hover:border-lilac/60 hover:bg-white/[0.04]";

  return (
    <motion.a
      href={href}
      download={download}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles} ${className}`}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
