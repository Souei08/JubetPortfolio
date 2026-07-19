"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const HERO_IMAGES = {
  dark: "/images/backgrounds/Clouds.png",
  light: "/images/backgrounds/hero-light.png",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function readTheme() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export const Header = () => {
  const prefersReducedMotion = useReducedMotion();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(readTheme());

    const observer = new MutationObserver(() => {
      setTheme(readTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">
      <motion.div
        className="hero-media"
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { scale: 1.08 }}
        animate={{ scale: prefersReducedMotion ? 1 : 1.05 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={HERO_IMAGES[theme]}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={75}
          className="hero-media__image"
        />
      </motion.div>
      <div className="hero-overlay" aria-hidden="true" />

      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="section-label mb-5">
          Portfolio
        </motion.p>

        <motion.h1 variants={item} className="hero-brand">
          JUBET.
        </motion.h1>

        <motion.p variants={item} className="hero-role">
          Web Developer · Davao City, PH
        </motion.p>

        <motion.p variants={item} className="hero-copy">
          I design and build web experiences that feel clear, reliable, and
          thoughtfully crafted.
        </motion.p>

        <motion.div variants={item} className="hero-actions">
          <ScrollLink
            to="works"
            spy={true}
            smooth={true}
            offset={-72}
            duration={500}
            className="CustomButton group cursor-pointer"
          >
            View works
            <span
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </ScrollLink>
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

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25, duration: 0.7 }}
      >
        <ScrollLink
          to="about"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="hero-scroll__link"
          aria-label="Scroll to about"
        >
          <span className="hero-scroll__label">Scroll</span>
          <span className="hero-scroll__rule" aria-hidden="true">
            <motion.span
              className="hero-scroll__rule-fill"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scaleY: [0.35, 1, 0.35], opacity: [0.4, 0.85, 0.4] }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originY: 0 }}
            />
          </span>
        </ScrollLink>
      </motion.div>
    </section>
  );
};
