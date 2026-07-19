"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GuidingVerse } from "./GuidingVerse";

const contactItems = [
  {
    label: "Email",
    value: "jubet.sode.5@gmail.com",
    href: "mailto:jubet.sode.5@gmail.com",
    note: "Best for opportunities",
  },
  {
    label: "Phone",
    value: "+63 951 801 3795",
    href: "tel:+639518013795",
    note: "Available weekdays",
  },
  {
    label: "Location",
    value: "Km 8.5 Matina Pangi, Davao City",
    href: null,
    note: "Philippines",
  },
];

export const Contact = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <section id="contact" className="section section-contact">
      <span className="section-mark" aria-hidden="true">
        Contact
      </span>

      <GuidingVerse />

      <div className="section-contact__panel">
        <div className="section-shell">
          <motion.div
            className="grid items-stretch gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <div className="flex flex-col lg:col-span-5">
              <motion.p variants={fadeUp} className="section-label">
                Contact
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="section-title mb-5 max-w-sm"
              >
                Let&apos;s build something worthwhile
              </motion.h2>
              <motion.p variants={fadeUp} className="body-copy mb-10 max-w-md">
                Open to roles, collaborations, and conversations. Email is the
                fastest way to reach me — I usually reply within a day or two.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="mailto:jubet.sode.5@gmail.com"
                className="CustomButton group mt-auto inline-flex self-start"
              >
                Send an email
                <span
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </motion.a>
            </div>

            <motion.div variants={fadeUp} className="flex min-h-0 lg:col-span-7">
              <ul className="flex w-full flex-col border-y border-ink/12">
                {contactItems.map((item, index) => (
                  <li
                    key={item.label}
                    className={`flex flex-1 flex-col justify-center py-7 sm:py-8 ${
                      index < contactItems.length - 1
                        ? "border-b border-ink/12"
                        : ""
                    }`}
                  >
                    <div className="grid gap-3 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-start sm:gap-10">
                      <p className="font-body text-xs uppercase tracking-section text-muted">
                        <span className="mr-2 tabular-nums text-ink/30">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </p>

                      <div className="min-w-0">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="break-words font-display text-lg tracking-tight text-ink transition-colors hover:text-ink/70 sm:text-xl"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="break-words font-display text-lg tracking-tight text-ink sm:text-xl">
                            {item.value}
                          </p>
                        )}
                        <p className="mt-2 font-body text-sm text-muted">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
