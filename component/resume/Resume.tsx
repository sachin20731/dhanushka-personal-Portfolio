"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import BackgroundElements from "../BackgroundElements";
import SectionHeading from "../ui/SectionHeading";
import MagneticButton from "../ui/MagneticButton";
import { EASE, Reveal } from "../motion/Reveal";

const CV_FILE = "/Dhanushka Pradeep Munasinghe Update CV.pdf";

const PAGES = [
  { src: "/cv1.png", alt: "CV page 1", desktopOnly: false },
  { src: "/cv2.png", alt: "CV page 2", desktopOnly: true },
];

export default function ResumePage() {
  return (
    <div className="relative overflow-hidden bg-ink text-mist">
      <BackgroundElements dim glow={false} />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-iris/10 blur-[120px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-14 px-5 py-24 md:px-12 md:py-32 lg:grid-cols-2 lg:gap-20 lg:px-16">
        {/* Left: stays in view while the CV pages scroll past */}
        <div className="lg:sticky lg:top-24">
          <SectionHeading title="Resume" />

          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted md:text-lg">
              <p>
                I am a motivated and detail-oriented Software Engineer with experience in developing modern web
                applications and backend systems.
              </p>
              <p>
                Skilled in React, Next.js, Spring Boot, MySQL, Docker, and AWS with a strong passion for learning
                modern technologies and building scalable solutions.
              </p>
              <p>I enjoy solving real-world problems and creating efficient, user-friendly digital experiences.</p>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <MagneticButton href={CV_FILE} download>
              <Download size={18} />
              Download CV
            </MagneticButton>
          </Reveal>
        </div>

        {/* Right: CV pages */}
        <div className="flex flex-col gap-8 [perspective:1400px]">
          {PAGES.map((page, i) => (
            <motion.div
              key={page.src}
              initial={{ opacity: 0, y: 70, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -6 }}
              className={`${
                page.desktopOnly ? "hidden md:block" : "block"
              } relative w-full overflow-hidden rounded-2xl border border-iris/25 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-[border-color,box-shadow] duration-500 hover:border-lilac/50 hover:shadow-[0_50px_90px_-30px_rgba(106,99,175,0.55)]`}
            >
              <Image
                src={page.src}
                alt={page.alt}
                width={1200}
                height={1700}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
