"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-ink px-5 py-8 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Dhanushka Munasinghe</p>
        <motion.a
          href="#home"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition-colors hover:border-lilac/50 hover:text-mist"
        >
          Back to top <ArrowUp size={14} />
        </motion.a>
      </div>
    </footer>
  );
}
