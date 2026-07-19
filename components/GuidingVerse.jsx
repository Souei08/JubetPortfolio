"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const BANNER_IMAGES = {
  dark: "/images/backgrounds/verse-banner-dark.png",
  // Light-only: same atmosphere + coloring as the hero
  light: "/images/backgrounds/hero-light-atmosphere.png",
};

function readTheme() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export const GuidingVerse = () => {
  const reduceMotion = useReducedMotion();
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

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.2 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
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
    <div className="contact-banner">
      <div className="contact-banner__media" aria-hidden="true">
        <Image
          src={BANNER_IMAGES[theme]}
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="contact-banner__image"
        />
      </div>
      <div className="contact-banner__overlay" aria-hidden="true" />

      <motion.div
        className="contact-banner__inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
      >
        <motion.blockquote variants={fadeUp} className="contact-banner__quote">

          <p className="contact-banner__text">
            “I can do all things through him who strengthens me”
          </p>

          <footer className="contact-banner__cite">
            <span className="contact-banner__cite-line" aria-hidden="true" />
            Philippians 4:13
          </footer>
        </motion.blockquote>
      </motion.div>
    </div>
  );
};
