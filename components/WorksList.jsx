"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { WorkFrame } from "./WorkFrame";

export const WorksList = ({ projects, startIndex = 0 }) => {
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
    <div className="mx-auto flex max-w-3xl flex-col gap-24 md:gap-32">
      {projects.map((project, index) => {
        const displayIndex = startIndex + index;

        return (
          <motion.article
            key={project.title}
            className="flex flex-col"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-8">
              <WorkFrame as="div" staticFrame>
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} project screenshot`}
                  className="h-auto w-full object-contain object-top"
                  sizes="(max-width: 768px) 100vw, 768px"
                  quality={75}
                  priority={displayIndex < 2}
                />
              </WorkFrame>
            </motion.div>

            <motion.div variants={fadeUp} className="text-center sm:text-left">
              <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <p className="font-body text-xs uppercase tracking-section text-muted">
                  {String(displayIndex + 1).padStart(2, "0")}
                  {project.stacks?.length
                    ? `  ·  ${project.stacks.join("  ·  ")}`
                    : ""}
                </p>
                {project.links && (
                  <Link
                    href={project.links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-muted transition-colors hover:text-ink"
                  >
                    Visit ↗
                  </Link>
                )}
              </div>

              <h3 className="mb-4 font-display text-2xl tracking-tight text-ink sm:text-3xl">
                {project.title}
              </h3>

              <p className="body-copy mx-auto max-w-2xl sm:mx-0">
                {project.description}
              </p>
            </motion.div>
          </motion.article>
        );
      })}
    </div>
  );
};
