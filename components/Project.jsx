"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WorksPreview } from "@/utils/WorksPreview";
import { WorksGrid } from "./WorksGrid";

export const Projects = () => {
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
    <section id="works" className="section section-works">
      <span className="section-mark" aria-hidden="true">
        Work
      </span>

      <div className="section-shell">
        <motion.div
          className="section-intro"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="section-label">
            Work
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title mb-4">
            Selected projects
          </motion.h2>
          <motion.p variants={fadeUp} className="body-copy max-w-xl">
            A few recent products and sites — open any card for the live
            project, or browse the full archive.
          </motion.p>
        </motion.div>

        <WorksGrid projects={WorksPreview} />
      </div>
    </section>
  );
};
