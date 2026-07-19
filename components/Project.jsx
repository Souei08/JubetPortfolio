"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TOTAL_WORKS_COUNT, WorksPreview } from "@/utils/WorksPreview";
import { WorksSlider } from "./WorksSlider";

export const Projects = () => {
  const reduceMotion = useReducedMotion();
  const remainingCount = Math.max(TOTAL_WORKS_COUNT - WorksPreview.length, 0);

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
          className="section-intro mx-auto max-w-2xl text-center"
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
          <motion.p variants={fadeUp} className="body-copy mx-auto max-w-lg">
            A few recent projects. Swipe through, then open the full archive.
          </motion.p>
        </motion.div>

        <WorksSlider
          projects={WorksPreview}
          remainingCount={remainingCount}
        />

        <div className="mt-12 flex justify-center md:mt-14">
          <Link href="/works" className="CustomButton CustomButton--ghost group">
            View more work
            <span
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
