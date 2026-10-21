"use client";

import { House, User, FileText, Award, Monitor, Menu, X, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: House },
  { id: "about", label: "About", Icon: User },
  { id: "resume", label: "Resume", Icon: FileText },
  { id: "projects", label: "Projects", Icon: Monitor },
  { id: "certificates", label: "Certificates", Icon: Award },
  { id: "contact", label: "Contact", Icon: Mail },
] as const;

export const SOCIAL_ITEMS = [
  { label: "GitHub", href: "https://github.com/sachin20731", Icon: GithubIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhanushka-munasinghe-887311259", Icon: LinkedinIcon },
];

const SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Highlight whichever section is crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close the mobile drawer with Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.8 : 1 }}
        transition={{ duration: 0.3 }}
        className="fixed left-5 top-5 z-[60] rounded-xl border border-white/10 bg-ink/80 p-3 text-mist shadow-lg shadow-black/40 backdrop-blur-md md:hidden"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu size={22} />
      </motion.button>

      {/* Mobile backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-[100dvh] w-64 flex-col justify-between border-r border-white/[0.06] bg-[#111014]/95 py-6 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-20 md:translate-x-0 md:py-8 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex w-full flex-col">
          <div className="mb-6 flex items-center justify-between px-6 md:mb-8 md:justify-center md:px-0">
            <a
              href="#home"
              onClick={() => setIsOpen(false)}
              className="text-xl font-semibold tracking-tight text-mist"
              aria-label="Back to top"
            >
              D<span className="text-lilac">.</span>
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-muted transition-colors hover:text-mist md:hidden"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex w-full flex-col gap-1" aria-label="Sections">
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  aria-label={label}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex h-14 w-full items-center gap-4 px-6 transition-colors duration-300 md:justify-center md:px-0 ${
                    isActive ? "text-mist" : "text-muted/70 hover:text-mist"
                  }`}
                >
                  {isActive && (
                    <>
                      <motion.span
                        layoutId="nav-active-bg"
                        transition={SPRING}
                        className="absolute inset-x-3 inset-y-1.5 rounded-xl bg-iris/15 ring-1 ring-iris/35"
                      />
                      <motion.span
                        layoutId="nav-active-bar"
                        transition={SPRING}
                        className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-lilac shadow-[0_0_12px_rgba(164,155,234,0.8)]"
                      />
                    </>
                  )}
                  <Icon size={22} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative z-10 text-sm font-medium md:hidden">{label}</span>

                  {/* Desktop tooltip */}
                  <span className="pointer-events-none absolute left-full ml-3 hidden -translate-x-1 whitespace-nowrap rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-mist opacity-0 shadow-lg ring-1 ring-white/10 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
                    {label}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 px-5 md:flex-col md:gap-3 md:px-0">
          {SOCIAL_ITEMS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-lg p-2.5 text-iris transition-all duration-300 hover:-translate-y-0.5 hover:bg-iris/10 hover:text-lilac"
            >
              <Icon />
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
