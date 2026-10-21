"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CodeXml, ExternalLink } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import SpotlightCard from "../ui/SpotlightCard";
import { EASE, Reveal } from "../motion/Reveal";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  featured: boolean;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "MPC Promo system",
    description:
      "MPC Promo System is a digital promotional campaign management platform that generates unique promo codes and printable promo cards for customers. Users can submit these promo codes to the company for validation, and after successful verification, rewards are provided through mobile reloads or direct bank transfers based on the customer’s preference. The system also includes secure code validation, campaign tracking, user management, and real-time reporting features to ensure an efficient and reliable promotional process.",
    image: "/MPC.png",
    tags: ["React", "MongoDb", "express", "Tailwind"],
    github: "https://github.com/Mishan20/Promo_system_client",
    featured: true,
  },
  {
    id: 2,
    title: "Aqua Engineering & Constructions (Pvt)Ltd Official website",
    description:
      "E-commerce platform connecting local artisans with global buyers, featuring secure payments and inventory management.",
    image: "/aqua.png",
    tags: ["Wordpress", "PHP", "Elementor", "Custom CSS", "JS"],
    live: "https://www.aquaengineering.lk",
    featured: false,
  },
  {
    id: 3,
    title: "BuildTrackPro - Construction Project Management Software (Ongoing)",
    description: "Minimalist productivity app with Pomodoro timer, task prioritization, and cross-device synchronization.",
    image: "/buildtrackpro.png",
    tags: ["Vue", "Vuex", "Firebase", "Tailwind"],
    github: "https://github.com/example/flowstate",
    live: "https://flowstate-app.vercel.app",
    featured: false,
  },
  {
    id: 4,
    title: "CS Engineering and Service Website",
    description: "Beautiful weather application with animated backgrounds, 7-day forecasts, and interactive radar maps.",
    image: "/cs-engineering.png",
    tags: ["React", "OpenWeather API", "Framer Motion", "Chart.js"],
    github: "https://github.com/VerlixTech/VTE00086---CS-Engineering",
    live: "https://weathervane-demo.vercel.app",
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "This is the newest portfolio website of mine, built using Next.js and Tailwind CSS. It features a modern design, smooth animations, and responsive layout to showcase my projects and skills effectively.",
    image: "/portfolio.png",
    tags: ["WebSocket", "Monaco Editor", "Express", "MongoDB"],
    github: "https://github.com/example/codecollab",
    live: "https://dhanushka-personal-portfolio.vercel.app/",
    featured: false,
  },
  {
    id: 6,
    title: "Autism Diaganosis system",
    description:
      "Autism Diagnosis Prediction System is designed to assist in the early identification of autism spectrum disorder (ASD) in children below the age of three. The system analyzes behavioral patterns and developmental indicators to provide a predictive assessment, enabling timely intervention and support.",
    image: "/Autism.webp",
    tags: ["React Native", "Node.js", "MySql", "Java Script", "Pytorch", "Express", "Tensorflow"],
    github: "https://github.com/example/meditrack",
    live: "https://meditrack-demo.vercel.app",
    featured: false,
  },
];

const PARTNERS = [
  { name: "Madhushika Paints and Chemical(Pvt) Ltd", logo: "/MPC-logo.png", url: "https://cybermas.com" },
  { name: "Aquaengineering & Construction (Pvt)Ltd", logo: "/aqua-logo.png", url: "https://verlixtech.com" },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-surface/60 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-iris/40 hover:shadow-[0_30px_60px_-30px_rgba(106,99,175,0.6)]">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/5 to-transparent opacity-90" />
        {project.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-iris px-3 py-1 text-xs font-medium text-white shadow-lg shadow-black/30">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug text-mist transition-colors duration-300 group-hover:text-lilac">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 text-xs text-mist/75">
              {tag}
            </li>
          ))}
        </ul>

        {(project.github || project.live) && (
          <div className="mt-auto pt-6">
          <div className="flex gap-5 border-t border-white/[0.06] pt-5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-mist"
              >
                <CodeXml size={15} />
                <span>Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-mist"
              >
                <ExternalLink size={15} className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                <span>Live demo</span>
              </a>
            )}
          </div>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}

export default function Projects() {
  return (
    <div className="relative bg-plum px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Featured projects"
          intro="Here are some of my recent works. Each project represents unique challenges and creative solutions."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 0.1} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* Partners */}
        <div className="mt-28 border-t border-white/[0.06] pt-16">
          <Reveal>
            <h3 className="text-center text-2xl font-semibold tracking-tight text-mist md:text-3xl">
              Trusted by partner companies
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
              I&apos;ve had the privilege of collaborating with these great organizations.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap items-start justify-center gap-12 md:gap-20">
            {PARTNERS.map((partner, i) => (
              <motion.a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                className="group flex max-w-[12rem] flex-col items-center gap-4 text-center"
              >
                <span className="grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-surface p-5 shadow-lg transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-iris/50 group-hover:shadow-[0_20px_40px_-15px_rgba(106,99,175,0.6)]">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain opacity-80 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100"
                  />
                </span>
                <span className="text-sm font-medium text-muted transition-colors group-hover:text-lilac">{partner.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
