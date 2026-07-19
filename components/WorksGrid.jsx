"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export const WorksGrid = ({ projects }) => {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.2 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
  };

  return (
    <motion.ul
      className="works-grid"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger}
    >
      {projects.map((project, index) => (
        <motion.li key={project.title} variants={fadeUp}>
          {project.links ? (
            <a
              href={project.links}
              target="_blank"
              rel="noopener noreferrer"
              className="works-card group"
            >
              <CardMedia project={project} index={index} />
              <CardMeta project={project} index={index} showArrow />
            </a>
          ) : (
            <article className="works-card">
              <CardMedia project={project} index={index} />
              <CardMeta project={project} index={index} />
            </article>
          )}
        </motion.li>
      ))}

      <motion.li variants={fadeUp}>
        <Link href="/works" className="works-card works-card--more group">
          <div className="works-card__more-inner">
            <div className="works-card__more-head">
              <p className="works-card__more-title">View all projects</p>
              <span className="works-card__arrow" aria-hidden="true">
                →
              </span>
            </div>
            <p className="works-card__more-desc">
              Browse the full collection of products and sites beyond this
              selection.
            </p>
          </div>
        </Link>
      </motion.li>
    </motion.ul>
  );
};

function CardMedia({ project, index }) {
  return (
    <div className="works-card__media">
      <Image
        src={project.imageUrl}
        alt={`${project.title} project screenshot`}
        fill
        className="works-card__image"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={75}
        priority={index < 3}
      />
      <span className="works-card__wash" aria-hidden="true" />
    </div>
  );
}

function CardMeta({ project, index, showArrow = false }) {
  return (
    <div className="works-card__meta">
      <span className="works-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="works-card__copy">
        <h3 className="works-card__title">{project.title}</h3>
        {project.description && (
          <p className="works-card__desc">{project.description}</p>
        )}
      </div>
      {showArrow && (
        <span className="works-card__arrow" aria-hidden="true">
          ↗
        </span>
      )}
    </div>
  );
}
