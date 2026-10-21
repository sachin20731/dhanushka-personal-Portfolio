"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { SOCIAL_ITEMS } from "../Sidebar";
import { EASE, Reveal } from "../motion/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "peer w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pb-2.5 pt-6 text-mist placeholder-transparent outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:border-lilac/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(106,99,175,0.18)]";

const labelClass =
  "pointer-events-none absolute left-4 top-2 text-xs text-muted transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-lilac";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current || status === "sending") return;

    setStatus("sending");
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, "YOUR_PUBLIC_KEY").then(
      () => {
        setStatus("sent");
        form.current?.reset();
        setTimeout(() => setStatus("idle"), 5000);
      },
      (error) => {
        console.log(error?.text ?? error);
        setStatus("error");
      }
    );
  };

  return (
    <div className="relative overflow-hidden bg-plum px-5 py-24 md:px-12 md:py-32 lg:px-16">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-iris/15 blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            title="Contact me"
            intro="Have a project in mind or a role to fill? Send a message and I'll get back to you."
          />

          <Reveal delay={0.25} className="mt-10 flex gap-3">
            {SOCIAL_ITEMS.filter((s) => s.href.startsWith("http")).map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-mist/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-lilac/50 hover:text-mist"
              >
                <Icon />
                {label}
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.15} y={40} className="lg:col-span-7">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="rounded-3xl border border-white/[0.07] bg-surface/60 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative">
                <input id="name" name="user_name" type="text" placeholder="Name" required className={inputClass} />
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
              </div>
              <div className="relative">
                <input id="email" name="user_email" type="email" placeholder="Email" required className={inputClass} />
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
              </div>
              <div className="relative sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  required
                  className={`${inputClass} resize-none`}
                />
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-iris py-4 font-semibold text-white shadow-[0_12px_40px_-12px_rgba(106,99,175,0.9)] transition-colors hover:bg-[#7871c4] disabled:cursor-wait disabled:opacity-80"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status === "sending" ? "sending" : "idle"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="relative inline-flex items-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <div aria-live="polite" className="min-h-0">
              <AnimatePresence>
                {(status === "sent" || status === "error") && (
                  <motion.p
                    key={status}
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`flex items-center gap-2 overflow-hidden text-sm ${
                      status === "sent" ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {status === "sent" ? (
                      <>
                        <CircleCheck size={16} /> Message sent. I&apos;ll reply soon.
                      </>
                    ) : (
                      <>
                        <CircleAlert size={16} /> The message didn&apos;t send. Check your connection and try again.
                      </>
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
