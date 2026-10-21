"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, Link2 } from "lucide-react";
import BackgroundElements from "../BackgroundElements";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import { EASE, Reveal } from "../motion/Reveal";

const CERTIFICATES = [
  {
    id: 1,
    title: "Cloud Computing for Absolute Beginners",
    issuer: "CoDeKu DevOps Academy",
    date: "2025",
    description: "Mastered React, Node.js, databases, and REST APIs.",
    credentialUrl: "#",
  },
  {
    id: 2,
    title: "Learning React Native",
    issuer: "LinkedIn Learning",
    date: "2023",
    description: "",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/990d873c707d5928d120cc6285bca7c2c14cc6103c303150316227a615b9d9ee",
  },
  {
    id: 3,
    title: "AWS Cloud computing  Foundation",
    issuer: "University Of Moratuwa",
    date: "2025",
    description: "Cloud concepts, security, pricing, and architecture.",
    credentialUrl: "#",
  },
  {
    id: 4,
    title: "Introduction to Front-End Development",
    issuer: "Meta / Coursera",
    date: "2025",
    description: "Learned HTML, CSS, JavaScript, and React to build interactive web interfaces.",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/SCANL2CTZ2B3",
  },
];

const BADGES = [
  { name: "AWS Academy Graduate - Cloud Foundations Trained", icon: "/aws-academy-graduate-cloud-foundations.png" },
  { name: "AWS Cloud Quest - Cloud Practitioner", icon: "/aws-cloud-quest-cloud-practitioner-training-badge.png" },
  { name: "AWS Academy  - Cloud Computing 101 Trained", icon: "/aws-educate-introduction-to-cloud-101.png" },
];

/** Add your Credly profile link here to show the "View all badges" button. */
const CREDLY_URL = "";

export default function Certificates() {
  return (
    <div className="relative overflow-hidden bg-ink px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <BackgroundElements
        dim
        glow={false}
        letter="C"
        tags={["<html>", "<body>", "<section>", "</div>", "<h2>", "</p>", "</section>", "</body>", "</html>"]}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          title="Certificates"
          intro="Professional certifications and courses that validate my skills and knowledge."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATES.map((cert, i) => {
            const hasLink = cert.credentialUrl && cert.credentialUrl !== "#";
            return (
              <Reveal key={cert.id} delay={(i % 4) * 0.08} className="h-full">
                <SpotlightCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-iris/40">
                  <div className="flex items-center justify-between border-b border-white/[0.06] bg-linear-to-r from-iris/20 to-transparent px-5 py-4">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-iris/20 text-lilac transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                      <Award size={18} />
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                      <Calendar size={12} />
                      {cert.date}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold leading-snug text-mist transition-colors duration-300 group-hover:text-lilac">
                      {cert.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">{cert.issuer}</p>
                    {cert.description && <p className="mt-4 text-sm leading-relaxed text-mist/75">{cert.description}</p>}

                    {hasLink && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-lilac transition-colors hover:text-mist"
                      >
                        View credential
                        <ExternalLink size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        {/* Badges */}
        <div className="mt-28 border-t border-white/[0.06] pt-16">
          <Reveal>
            <h3 className="text-2xl font-semibold tracking-tight text-mist md:text-3xl">Badges and achievements</h3>
            <p className="mt-3 max-w-2xl text-muted">
              Earned badges and skill recognitions from various platforms and projects.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BADGES.map((badge, i) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              >
                <SpotlightCard className="group flex h-full flex-col items-center gap-5 rounded-2xl border border-white/[0.07] bg-surface/50 p-8 text-center transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-iris/40">
                  <div className="relative h-32 w-32">
                    <div className="absolute inset-4 rounded-full bg-iris/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                    <Image
                      src={badge.icon}
                      alt={badge.name}
                      width={128}
                      height={128}
                      className="relative h-32 w-32 object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-[4deg]"
                    />
                  </div>
                  <span className="text-sm font-medium leading-relaxed text-mist/85 transition-colors group-hover:text-mist">
                    {badge.name}
                  </span>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {CREDLY_URL && (
            <Reveal className="mt-12 flex justify-center">
              <a
                href={CREDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-iris/40 px-5 py-2.5 text-sm text-lilac transition-all duration-300 hover:bg-iris hover:text-white"
              >
                <Link2 size={14} />
                View all badges on Credly
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
