"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const HERO_IMAGES = {
  dark: "/images/backgrounds/Clouds.png",
  // Light-only: atmospheric cloudscape with visible midtones on white canvas
  light: "/images/backgrounds/hero-light-atmosphere.png",
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
  const [isScrollHintReady, setIsScrollHintReady] = useState(false);
  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const isScrollHiddenRef = useRef(false);
  const rafId = useRef(0);

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

  useEffect(() => {
    const readyTimer = window.setTimeout(() => {
      setIsScrollHintReady(true);
    }, 1100);

    const hideScrollHint = () => {
      if (isScrollHiddenRef.current) return;
      if (window.scrollY <= 24) return;
      isScrollHiddenRef.current = true;
      setIsScrollHidden(true);
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };

    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = 0;
        hideScrollHint();
      });
    };

    hideScrollHint();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
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
            className="CustomButton cursor-pointer"
          >
            View works
          </ScrollLink>
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-40}
            duration={500}
            className="CustomButton CustomButton--text cursor-pointer"
          >
            Get in touch
          </ScrollLink>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
        animate={{
          opacity: !isScrollHintReady || isScrollHidden ? 0 : 1,
          y:
            !isScrollHintReady || isScrollHidden
              ? prefersReducedMotion
                ? 0
                : 6
              : 0,
          pointerEvents:
            !isScrollHintReady || isScrollHidden ? "none" : "auto",
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
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
          <span className="hero-scroll__mouse" aria-hidden="true">
            <motion.span
              className="hero-scroll__wheel"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, 8, 0], opacity: [0.9, 0.25, 0.9] }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
          <span className="hero-scroll__label">Scroll</span>
        </ScrollLink>
      </motion.div>
    </section>
  );
};
