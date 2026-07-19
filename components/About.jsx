"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Hidden for now — restore under the portrait when ready
// const profileFacts = [
//   { label: "Role", value: "Web Developer" },
//   { label: "Based", value: "Davao City, PH" },
//   { label: "Open to", value: "Full-time & contract" },
// ];

export const About = () => {
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
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const handleResumeClick = () => {
    window.open(
      "/files/Jubet_Aceberos_Resume.pdf",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="about" className="section section-about">
      <div className="section-fade" aria-hidden="true" />
      <span className="section-mark" aria-hidden="true">
        About
      </span>

      <div className="section-shell">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
          {/* Intro — first on mobile, top-right on desktop */}
          <motion.div
            className="order-1 flex flex-col lg:order-2 lg:col-span-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label">
              About me
            </motion.p>

            <motion.h2 variants={fadeUp} className="section-title max-w-xl">
              I&apos;m Jubet — a web developer from Davao City
            </motion.h2>
          </motion.div>

          {/* Portrait — under title on mobile, left column on desktop */}
          <motion.div
            className="order-2 flex w-full flex-col gap-8 self-stretch lg:order-1 lg:col-span-5 lg:row-span-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <motion.figure variants={fadeUp} className="about-portrait">
              <div className="about-portrait__stage">
                <span className="about-portrait__plate" aria-hidden="true" />
                <div className="about-portrait__frame">
                  <span
                    className="about-portrait__corner about-portrait__corner--tl"
                    aria-hidden="true"
                  />
                  <span
                    className="about-portrait__corner about-portrait__corner--tr"
                    aria-hidden="true"
                  />
                  <span
                    className="about-portrait__corner about-portrait__corner--bl"
                    aria-hidden="true"
                  />
                  <span
                    className="about-portrait__corner about-portrait__corner--br"
                    aria-hidden="true"
                  />
                  <div className="about-portrait__media">
                    <Image
                      src="/images/backgrounds/Jubet.JPG"
                      alt="Portrait of Jubet Aceberos"
                      fill
                      className="about-portrait__image object-cover object-[center_18%]"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      quality={80}
                      priority
                    />
                    <span className="about-portrait__wash" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </motion.figure>

            {/* Profile facts — hidden for now
            <motion.dl variants={fadeUp} className="about-meta">
              {profileFacts.map((fact) => (
                <div key={fact.label} className="about-meta__item">
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </motion.dl>
            */}
          </motion.div>

          {/* Body — after image on mobile, under title on desktop */}
          <motion.div
            className="order-3 flex flex-col lg:order-3 lg:col-span-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="body-copy mb-5 max-w-xl">
              I build websites and web products that feel clear, reliable, and
              thoughtfully made. From first layout to final interaction, I care
              about structure, usability, and the small details that make an
              interface easy to trust.
            </motion.p>

            <motion.p variants={fadeUp} className="body-copy mb-10 max-w-xl">
              Day to day I work across modern frontends, CMS platforms, and the
              backends that support them. I&apos;m open to full-time and contract
              roles where I can contribute carefully, ship solid work, and keep
              growing as a developer.
            </motion.p>

            <motion.div variants={fadeUp} className="about-actions">
              <button
                type="button"
                className="CustomButton group"
                onClick={handleResumeClick}
              >
                Download resume
                <span
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
