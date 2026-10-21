"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Cpu, GraduationCap } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import { EASE, Reveal } from "../motion/Reveal";

const EDUCATION = [
  {
    university: "Wrexham Glyndwr University - UK",
    degree: "BSc (Hons) Computing",
    grade: "Second Upper Class",
    year: "2024-2025",
    title: "Related Coursework",
    courses: ["Web App Development", "Mobile App Development", "Distributed Data", "Data Analytics", "IT Project Management"],
  },
  {
    university: "University Of Moratuwa - NDT",
    degree: "Information Technology",
    grade: "National Diploma In Technology",
    year: "2021-2025",
    title: "Related Coursework",
    courses: ["Web App Development", "Mobile App Development", "Distributed Data", "Data Analytics", "IT Project Management"],
  },
  {
    university: "Vidyarthe College Kandy",
    degree: "GCE Advanced Level Examination",
    grade: "",
    year: "2020",
    title: "Physical Science Stream",
    courses: ["Combined Maths - C", "Physics - C", "Chemistry - C"],
  },
];

const EXPERIENCE = [
  {
    role: "Intern Software and Web Developer",
    company: "Cyber Mas Solutions (Pvt) Ltd",
    position: "Full-Stack Developer",
    tech: ["React JS", "REST APIs", "HTML", "Tailwind CSS", "MySQL", "Spring Boot", "Java", "Microservices", "JWT Auth", "Docker", "J-Meter", "Grafana", "Ubuntu", "Jenkins"],
  },
  {
    role: "Intern Back-End Developer",
    company: "Sri Lanka Ports Authority",
    position: "Back-End Developer",
    tech: ["React JS", "REST APIs", "MySQL", "Spring Boot", "Java", "Microservices", "JWT Auth", "Docker"],
  },
  {
    role: "Associate Software Developer (Contract)",
    company: "Verlixtech (Pvt) Ltd",
    position: "Full-Stack Developer",
    tech: ["React JS", "REST APIs", "MySQL", "Spring Boot", "Java", "Microservices", "JWT Auth", "Docker", "Next JS", "TypeScript", "SEO Optimize", "DNS Manage"],
  },
];

const SKILLS = [
  { label: "Programming", value: "JavaScript, TypeScript, Java" },
  { label: "Frameworks", value: "React, Node, Express, Spring Boot, Next.js" },
  { label: "Frontend", value: "HTML, CSS, SCSS, REST APIs" },
  { label: "Databases", value: "MySQL, MongoDB" },
  { label: "Tools", value: "Docker, Grafana, Postman, JMeter, Figma" },
];

const TOOL_ICONS = [
  { src: "/java.png", alt: "Java" },
  { src: "/next.png", alt: "Next.js" },
  { src: "/aws.png", alt: "AWS" },
  { src: "/grafana.png", alt: "Grafana" },
  { src: "/github.png", alt: "GitHub" },
];

/* ---------- small building blocks ---------- */

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative inline-flex items-center gap-2 rounded-full border border-iris/50 bg-iris/10 px-4 py-1.5 text-sm font-medium text-mist backdrop-blur-sm"
    >
      <span className="text-lilac">{icon}</span>
      {children}
    </motion.div>
  );
}

/** Vertical line that draws itself downward. */
function Connector({ height = 44, delay = 0.2 }: { height?: number; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{ height }}
      className="mx-auto block w-px origin-top bg-linear-to-b from-iris to-iris/40"
    />
  );
}

/** Horizontal rail with three stems that line up with a 3-column grid (desktop only). */
function Branch({ delay = 0.5 }: { delay?: number }) {
  return (
    <div aria-hidden className="relative hidden md:block">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.8, delay, ease: EASE }}
        style={{ left: "calc((100% - 3rem) / 6)", right: "calc((100% - 3rem) / 6)" }}
        className="absolute top-0 block h-px origin-center bg-iris/70"
      />
      <div className="grid grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.45 + i * 0.08, ease: EASE }}
            className="mx-auto block h-8 w-px origin-top bg-iris/70"
          />
        ))}
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-[3px] text-[11px] text-mist/80 transition-colors duration-300 group-hover:border-iris/40">
      {children}
    </span>
  );
}

/* ---------- section ---------- */

export default function AboutMe() {
  return (
    <div id="about-me" className="relative overflow-hidden bg-plum px-5 py-24 text-mist md:px-12 md:py-32 lg:px-16">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[32rem] w-[32rem] rounded-full bg-iris/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Intro + technical */}
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading title="About me" />
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted md:text-lg">
                <p>
                  I am a motivated and detail-oriented individual with 1 year of experience in the technology
                  industry, working on real-world software solutions and continuously improving my technical skills.
                </p>
                <p>
                  I have hands-on experience in developing web-based applications using technologies such as React,
                  Spring Boot, and MySQL.
                </p>
                <p>I am passionate about learning new technologies, solving problems, and creating efficient systems.</p>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col items-center lg:col-span-7 lg:pt-4">
            <Pill icon={<Cpu size={16} />}>Technical</Pill>
            <Connector height={36} />

            <Reveal delay={0.25} y={36} className="w-full">
              <div className="comet-border w-full rounded-3xl bg-surface/60 p-7 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-9">
                <dl className="divide-y divide-white/[0.06]">
                  {SKILLS.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.35 + i * 0.07, ease: EASE }}
                      className="grid gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4"
                    >
                      <dt className="text-sm font-semibold text-mist">{s.label}</dt>
                      <dd className="text-sm text-muted">{s.value}</dd>
                    </motion.div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  {TOOL_ICONS.map((icon, i) => (
                    <motion.span
                      key={icon.alt}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 + i * 0.06, ease: EASE }}
                      whileHover={{ y: -4, scale: 1.08 }}
                      title={icon.alt}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.04]"
                    >
                      <Image src={icon.src} alt={icon.alt} width={26} height={26} className="h-6 w-6 object-contain" />
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Experience tree */}
        <div className="mt-28 flex flex-col items-center">
          <Pill icon={<Briefcase size={16} />}>Experience</Pill>
          <Connector />
          <div className="w-full">
            <Branch />
            <div className="mt-4 grid gap-6 md:mt-0 md:grid-cols-3">
              {EXPERIENCE.map((exp, i) => (
                <Reveal key={exp.company} delay={0.15 + i * 0.1} className="h-full">
                  <SpotlightCard className="group h-full rounded-2xl border border-white/[0.07] bg-surface/50 p-6 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-iris/40">
                    <h3 className="text-base font-semibold leading-snug text-lilac">{exp.role}</h3>
                    <p className="mt-2 text-sm text-mist/90">{exp.company}</p>
                    <p className="mt-0.5 text-sm text-muted">{exp.position}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Education tree */}
        <div className="mt-28 flex flex-col items-center">
          <Pill icon={<GraduationCap size={16} />}>Education</Pill>
          <Connector />
          <div className="w-full">
            <Branch />
            <div className="mt-4 grid gap-6 md:mt-0 md:grid-cols-3">
              {EDUCATION.map((item, i) => (
                <Reveal key={item.university} delay={0.15 + i * 0.1} className="h-full">
                  <SpotlightCard className="group h-full rounded-2xl border border-white/[0.07] bg-surface/50 p-6 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-iris/40">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold leading-snug text-lilac">{item.university}</h3>
                      <span className="shrink-0 rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-muted">
                        {item.year}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-mist/90">{item.degree}</p>
                    {item.grade && <p className="mt-0.5 text-sm text-muted">{item.grade}</p>}
                    <p className="mt-5 text-sm font-medium text-mist/80">{item.title}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.courses.map((course) => (
                        <Tag key={course}>{course}</Tag>
                      ))}
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
