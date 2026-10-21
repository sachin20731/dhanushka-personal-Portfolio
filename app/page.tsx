import Header, { RadarReadout, ScrollCue } from "../component/Header";
import HeroImage from "../component/HeroImage";
import BackgroundElements from "../component/BackgroundElements";
import AboutMe from "../component/about-me/AboutMe";
import Resume from "../component/resume/Resume";
import Projects from "../component/projects/Projects";
import Certificates from "../component/certificates/Certificates";
import Contact from "../component/contact/Contact";
import Footer from "../component/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-ink antialiased">
      {/* ================= HOME ================= */}
      <section id="home" className="relative z-10 flex min-h-[100svh] w-full items-center overflow-hidden">
        <BackgroundElements interactive decor={false} />

        <div className="relative z-20 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:px-12 lg:px-16 lg:py-20">
          <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-12">
            <div className="relative z-20 w-full lg:w-[56%]">
              <Header />
            </div>
            <div className="relative z-10 flex w-full justify-center lg:w-[44%] lg:justify-end">
              <HeroImage />
            </div>
          </div>
        </div>

        <ScrollCue />
        <RadarReadout />
      </section>

      {/* ================= SECTIONS ================= */}
      <div className="relative z-10">
        <section id="about" className="w-full scroll-mt-0">
          <AboutMe />
        </section>

        <section id="resume" className="w-full scroll-mt-0">
          <Resume />
        </section>

        <section id="projects" className="w-full scroll-mt-0">
          <Projects />
        </section>

        <section id="certificates" className="w-full scroll-mt-0">
          <Certificates />
        </section>

        <section id="contact" className="w-full scroll-mt-0">
          <Contact />
        </section>
      </div>

      <Footer />
    </main>
  );
}
