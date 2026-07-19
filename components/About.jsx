"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

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
        <div className="grid items-stretch gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          {/* Portrait + facts */}
          <motion.div
            className="flex h-full w-full flex-col gap-8 lg:col-span-5"
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

          {/* Copy */}
          <motion.div
            className="flex flex-col justify-center lg:col-span-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="section-label">
              About
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="section-title mb-6 max-w-xl"
            >
              Building reliable web products with clarity and care
            </motion.h2>

            <motion.p variants={fadeUp} className="body-copy mb-5 max-w-xl">
              I&apos;m a web developer focused on turning ideas into polished,
              usable experiences — clean structure, thoughtful interactions,
              and interfaces that feel easy from the first click.
            </motion.p>

            <motion.p variants={fadeUp} className="body-copy mb-10 max-w-xl">
              I work across modern frontends, CMS platforms, and supporting
              backends. Open to roles where I can contribute carefully, ship
              quality work, and keep learning.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="about-actions flex flex-col gap-3 sm:flex-row sm:items-center"
            >
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
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                offset={-40}
                duration={500}
                className="CustomButton CustomButton--ghost group cursor-pointer"
              >
                Get in touch
                <span
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </ScrollLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
