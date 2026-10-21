"use client";

import { useRef } from "react";

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement>;

/** A card whose surface and edge light up softly under the cursor. */
export default function SpotlightCard({ className = "", children, onMouseMove, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    onMouseMove?.(e);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </div>
  );
}
