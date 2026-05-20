// "use client";

// import Image from "next/image";
// import { ExternalLink, Award, Calendar, Link2 } from "lucide-react";

// export default function Certificates() {
//   // Certificate data – replace with your actual certificates
//   const certificates = [
//     {
//       id: 1,
//       title: "Full-Stack Web Development",
//       issuer: "Meta / Coursera",
//       date: "2024",
//       description: "Mastered React, Node.js, databases, and REST APIs.",
//       credentialUrl: "#",
//       image: "/cert-placeholder.png", // optional, can be removed
//     },
//     {
//       id: 2,
//       title: "Spring Boot & Microservices",
//       issuer: "Udemy",
//       date: "2025",
//       description: "Built scalable microservices with Spring Cloud, Docker, and Kubernetes.",
//       credentialUrl: "#",
//     },
//     {
//       id: 3,
//       title: "AWS Certified Cloud Practitioner",
//       issuer: "Amazon Web Services",
//       date: "2025",
//       description: "Cloud concepts, security, pricing, and architecture.",
//       credentialUrl: "#",
//     },
//     {
//       id: 4,
//       title: "JavaScript Algorithms & Data Structures",
//       issuer: "freeCodeCamp",
//       date: "2023",
//       description: "300+ hours of coding challenges and algorithm design.",
//       credentialUrl: "#",
//     },
//   ];

//   // Badges / Batches – skills, achievements, or micro‑credentials
//   const badges = [
//     { name: "AWS Cloud Quest - Cloud Practitioner", icon: "/aws-cloud-quest-cloud-practitioner-training-badge.png", color: "#61DAFB" },
//     { name: "Spring Boot", icon: "/spring-boot-icon.png", color: "#6DB33F" },
    
    
//   ];

//   return (
//     <section
//       id="certificates"
//       className="relative z-10 w-full min-h-screen py-24 px-8 sm:px-16 lg:px-24 bg-[#1f1e24] overflow-hidden"
//     >
//       {/* 🔥 FLOATING CODE TAGS + TECH ICONS (same as resume page) */}
//       <div className="pointer-events-none absolute inset-0 text-[#57528C] text-sm opacity-90 italic font-mono select-none">
//         <span className="absolute top-10 left-10 animate-float">&lt;html&gt;</span>
//         <span className="absolute top-20 left-16 animate-float-delayed">&lt;body&gt;</span>
//         <span className="absolute top-48 left-20 animate-float">&lt;section&gt;</span>
//         <span className="absolute top-[35%] right-1/3 animate-float-slow">&lt;/div&gt;</span>
//         <span className="absolute top-[50%] right-1/4 animate-float">&lt;h2&gt;</span>
//         <span className="absolute top-[60%] right-[30%] text-6xl animate-float-delayed font-black opacity-30">C</span>
//         <span className="absolute top-[70%] left-24 animate-float">&lt;/p&gt;</span>
//         <span className="absolute bottom-40 left-24 animate-float-delayed">&lt;/section&gt;</span>
//         <span className="absolute bottom-16 left-16 animate-float">&lt;/body&gt;</span>
//         <span className="absolute bottom-8 left-10 animate-float-slow">&lt;/html&gt;</span>

//         {/* Tech Icons floating */}
//         <div className="absolute top-32 left-1/3 animate-float opacity-30">
//           <Image src="/docker.png" alt="Docker" width={48} height={48} />
//         </div>
//         <div className="absolute bottom-40 right-1/2 animate-float-delayed opacity-30">
//           <Image src="/java.png" alt="Java" width={48} height={48} />
//         </div>
//         <div className="absolute bottom-20 right-[40%] animate-float opacity-30">
//           <Image src="/aws.png" alt="AWS" width={48} height={48} />
//         </div>
//         <div className="absolute top-48 left-[45%] animate-float-slow opacity-30">
//           <Image src="/github.png" alt="Github" width={48} height={48} />
//         </div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto">
//         {/* Header */}
//         <h2 className="text-4xl md:text-5xl font-bold text-zinc-600 mb-4 tracking-tight">
//           My <span className="text-[#6A63AF]">Certificates</span>
//         </h2>
//         <p className="text-zinc-400 mb-12 max-w-2xl">
//           Professional certifications and courses that validate my skills and knowledge.
//         </p>

//         {/* Certificates Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
//           {certificates.map((cert, index) => (
//             <div
//               key={cert.id}
//               className="group bg-[#151515] rounded-xl border border-white/5 hover:border-[#6A63AF]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#6A63AF]/10 overflow-hidden"
//             >
//               {/* Optional image / icon */}
//               <div className="bg-gradient-to-r from-[#6A63AF]/20 to-transparent p-4 border-b border-white/5">
//                 <div className="flex items-center gap-3">
//                   <Award className="text-[#6A63AF] w-6 h-6" />
//                   <span className="text-xs font-mono text-zinc-500">{cert.date}</span>
//                 </div>
//               </div>

//               <div className="p-5">
//                 <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#6A63AF] transition-colors">
//                   {cert.title}
//                 </h3>
//                 <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
//                   <Calendar className="w-3 h-3" />
//                   <span>{cert.date}</span>
//                   <span className="mx-1">•</span>
//                   <span>{cert.issuer}</span>
//                 </div>
//                 <p className="text-sm text-zinc-300 mb-4">{cert.description}</p>
//                 <a
//                   href={cert.credentialUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 text-sm text-[#6A63AF] hover:text-white transition-colors group/link"
//                 >
//                   <span>View Credential</span>
//                   <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* BADGES / BATCHES SECTION */}
//         <div className="mt-16 pt-8 border-t border-white/10">
//           <div className="flex items-center gap-3 mb-8">
//             <div className="w-1 h-8 bg-[#6A63AF] rounded-full" />
//             <h3 className="text-2xl md:text-3xl font-semibold text-white">
//               Badges & <span className="text-[#6A63AF]">Achievements</span>
//             </h3>
//           </div>
//           <p className="text-zinc-400 mb-8 max-w-2xl">
//             Earned badges and skill recognitions from various platforms and projects.
//           </p>

//           <div className="flex flex-wrap justify-center gap-5">
//             {badges.map((badge, idx) => (
//               <div
//                 key={idx}
//                 className="group relative flex flex-col items-center gap-2  transition-all duration-300 hover:-translate-y-1 min-w-[100px]"
//               >
//                 {badge.icon ? (
//                   <div className="w-12 h-12 relative">
//                     <Image
//                       src={badge.icon}
//                       alt={badge.name}
//                       width={108}
//                       height={108}
//                       className="object-contain   transition"
//                     />
//                   </div>
//                 ) : (
//                   <div
//                     className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
//                     style={{ backgroundColor: badge.color }}
//                   >
//                     {badge.name[0]}
//                   </div>
//                 )}
//                 <span className="text-xs text-zinc-400 group-hover:text-white transition font-medium">
//                   {badge.name}
//                 </span>
//                 {/* Optional tooltip on hover */}
//                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#6A63AF] text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
//                   {badge.name}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Extra: call to action to view all badges (like Credly or LinkedIn) */}
//           <div className="flex justify-center mt-10">
//             <a
//               href="#"
//               className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#6A63AF]/40 text-sm text-[#6A63AF] hover:bg-[#6A63AF] hover:text-white transition-all duration-300"
//             >
//               <Link2 size={14} />
//               <span>View all badges on Credly</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import { ExternalLink, Award, Calendar, Link2 } from "lucide-react";

export default function Certificates() {
  // Certificate data
  const certificates = [
    {
      id: 1,
      title: "Cloud Computing for Absolute Beginners",
      issuer: "CoDeKu DevOps Academy",
      date: "2025",
      description: "Mastered React, Node.js, databases, and REST APIs.",
      credentialUrl: "#",
      image: "/cert-placeholder.png",
    },
    {
      id: 2,
      title: "Learning React Native",
      issuer: "LinkedIn Learning",
      date: "2023",
      description:
        "",
      credentialUrl: "https://www.linkedin.com/learning/certificates/990d873c707d5928d120cc6285bca7c2c14cc6103c303150316227a615b9d9ee",
    },
    {
      id: 3,
      title: "AWS Cloud computing  Foundation",
      issuer: "University Of Moratuwa",
      date: "2025",
      description:
        "Cloud concepts, security, pricing, and architecture.",
      credentialUrl: "#",
    },
    {
      id: 4,
      title: "Introduction to Front-End Development",
      issuer: "Meta / Coursera",
      date: "2025",
      description:
        "Learned HTML, CSS, JavaScript, and React to build interactive web interfaces.",
      credentialUrl: "https://www.coursera.org/account/accomplishments/verify/SCANL2CTZ2B3",
    },
  ];

  // Badges / Achievements
  const badges = [
   
    {
      name: "AWS Academy Graduate - Cloud Foundations Trained",
      icon: "/aws-academy-graduate-cloud-foundations.png",
      color: "#6DB33F",
    },
     {
      name: "AWS Cloud Quest - Cloud Practitioner",
      icon: "/aws-cloud-quest-cloud-practitioner-training-badge.png",
      color: "#FF9900",
    },
    {
      name: "AWS Academy  - Cloud Computing 101 Trained",
      icon: "/aws-educate-introduction-to-cloud-101.png",
      color: "#2496ED",
    },
   
  ];

  return (
    <section
      id="certificates"
      className="relative z-10 w-full min-h-screen py-24 px-8 sm:px-16 lg:px-24 bg-[#1f1e24] overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="pointer-events-none absolute inset-0 text-[#57528C] text-sm opacity-90 italic font-mono select-none">
        <span className="absolute top-10 left-10 animate-float">
          &lt;html&gt;
        </span>
        <span className="absolute top-20 left-16 animate-float-delayed">
          &lt;body&gt;
        </span>
        <span className="absolute top-48 left-20 animate-float">
          &lt;section&gt;
        </span>
        <span className="absolute top-[35%] right-1/3 animate-float-slow">
          &lt;/div&gt;
        </span>
        <span className="absolute top-[50%] right-1/4 animate-float">
          &lt;h2&gt;
        </span>
        <span className="absolute top-[60%] right-[30%] text-6xl animate-float-delayed font-black opacity-30">
          C
        </span>
        <span className="absolute top-[70%] left-24 animate-float">
          &lt;/p&gt;
        </span>
        <span className="absolute bottom-40 left-24 animate-float-delayed">
          &lt;/section&gt;
        </span>
        <span className="absolute bottom-16 left-16 animate-float">
          &lt;/body&gt;
        </span>
        <span className="absolute bottom-8 left-10 animate-float-slow">
          &lt;/html&gt;
        </span>

        {/* Floating Tech Icons */}
        <div className="absolute top-32 left-1/3 animate-float opacity-30">
          <Image src="/docker.png" alt="Docker" width={48} height={48} />
        </div>

        <div className="absolute bottom-40 right-1/2 animate-float-delayed opacity-30">
          <Image src="/java.png" alt="Java" width={48} height={48} />
        </div>

        <div className="absolute bottom-20 right-[40%] animate-float opacity-30">
          <Image src="/aws.png" alt="AWS" width={48} height={48} />
        </div>

        <div className="absolute top-48 left-[45%] animate-float-slow opacity-30">
          <Image src="/github.png" alt="Github" width={48} height={48} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-600 mb-4 tracking-tight">
          My <span className="text-[#6A63AF]">Certificates</span>
        </h2>

        <p className="text-zinc-400 mb-12 max-w-2xl">
          Professional certifications and courses that validate my skills and
          knowledge.
        </p>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group bg-[#151515] rounded-xl border border-white/5 hover:border-[#6A63AF]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#6A63AF]/10 overflow-hidden"
            >
              {/* Top */}
              <div className="bg-gradient-to-r from-[#6A63AF]/20 to-transparent p-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <Award className="text-[#6A63AF] w-6 h-6" />
                  <span className="text-xs font-mono text-zinc-500">
                    {cert.date}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#6A63AF] transition-colors">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{cert.date}</span>
                  <span className="mx-1">•</span>
                  <span>{cert.issuer}</span>
                </div>

                <p className="text-sm text-zinc-300 mb-4">
                  {cert.description}
                </p>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#6A63AF] hover:text-white transition-colors group/link"
                >
                  <span>View Credential</span>

                  <ExternalLink
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* BADGES SECTION */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-[#6A63AF] rounded-full" />

            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Badges & <span className="text-[#6A63AF]">Achievements</span>
            </h3>
          </div>

          <p className="text-zinc-400 mb-10 max-w-2xl">
            Earned badges and skill recognitions from various platforms and
            projects.
          </p>

          {/* BADGES GRID */}
          <div className="flex flex-wrap justify-center gap-8">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center gap-4 bg-[#151515] border border-white/10 rounded-2xl p-6 hover:border-[#6A63AF]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#6A63AF]/10 min-w-[190px]"
              >
                {/* Badge Icon */}
                {badge.icon ? (
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <Image
                      src={badge.icon}
                      alt={badge.name}
                      width={128}
                      height={128}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl"
                    style={{ backgroundColor: badge.color }}
                  >
                    {badge.name[0]}
                  </div>
                )}

                {/* Badge Name */}
                <span className="text-sm text-zinc-300 group-hover:text-white transition font-semibold text-center leading-relaxed">
                  {badge.name}
                </span>

                
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-12">
            <a
              href=""
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#6A63AF]/40 text-sm text-[#6A63AF] hover:bg-[#6A63AF] hover:text-white transition-all duration-300"
            >
              <Link2 size={14} />
              <span>View all badges on Credly</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}