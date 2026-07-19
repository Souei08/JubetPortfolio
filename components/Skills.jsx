"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SkillCategories, SkillsContent } from "@/utils/SkillsContent";
import { SectionSeparator } from "./SectionSeparator";

const categoryCopy = {
  Frontend: {
    title: "Frontend",
    note: "Building interfaces and interactive UI",
  },
  "Backend & CMS": {
    title: "Backend & CMS",
    note: "APIs, servers, and content platforms",
  },
  "Data & Tools": {
    title: "Data & Tools",
    note: "Databases, hosting services, and workflow",
  },
};

export const Skills = () => {
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
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <section id="skills" className="section section-skills">
      <SectionSeparator />

      <div className="section-shell">
        <motion.div
          className="section-intro"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="section-label">
            Skills
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title mb-4">
            What I work with
          </motion.h2>
          <motion.p variants={fadeUp} className="body-copy max-w-xl">
            A clear look at the tools I use to design, build, and ship web
            products — from interface to backend.
          </motion.p>
        </motion.div>

        <div className="skills-board">
          {SkillCategories.map((category, categoryIndex) => {
            const skills = SkillsContent.filter(
              (skill) => skill.category === category
            );
            const copy = categoryCopy[category];

            return (
              <motion.div
                key={category}
                className="skills-group"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger}
              >
                <motion.header variants={fadeUp} className="skills-group__header">
                  <div className="skills-group__title-row">
                    <span className="skills-group__index">
                      {String(categoryIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="skills-group__title">{copy.title}</h3>
                    <span className="skills-group__count">
                      {String(skills.length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="skills-group__note">{copy.note}</p>
                </motion.header>

                <motion.ul variants={fadeUp} className="skills-tags">
                  {skills.map((skill) => (
                    <li key={skill.name} className="skills-tag">
                      <Image
                        className="skill-icon h-3.5 w-3.5 shrink-0 opacity-70"
                        src={skill.imageUrl}
                        alt=""
                        width={14}
                        height={14}
                      />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </motion.ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
