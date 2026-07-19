"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SkillCategories, SkillsContent } from "@/utils/SkillsContent";

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

function skillIconSrc(imageUrl) {
  if (typeof imageUrl === "string") return imageUrl;
  return imageUrl?.src || "";
}

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
      <span className="section-mark" aria-hidden="true">
        Skills
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
          {SkillCategories.map((category) => {
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
                    <h3 className="skills-group__title">{copy.title}</h3>
                    <span className="skills-group__rule" aria-hidden="true" />
                  </div>
                  <p className="skills-group__note">{copy.note}</p>
                </motion.header>

                <motion.ul variants={fadeUp} className="skills-tags">
                  {skills.map((skill) => {
                    const iconSrc = skillIconSrc(skill.imageUrl);

                    return (
                      <li key={skill.name} className="skills-tag">
                        <span
                          className="skill-icon"
                          aria-hidden="true"
                          style={{
                            "--skill-brand": skill.brandColor,
                            "--skill-brand-on-dark":
                              skill.brandColorOnDark || skill.brandColor,
                            WebkitMaskImage: `url("${iconSrc}")`,
                            maskImage: `url("${iconSrc}")`,
                          }}
                        />
                        <span>{skill.name}</span>
                      </li>
                    );
                  })}
                </motion.ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
