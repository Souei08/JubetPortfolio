"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WorkFrame } from "./WorkFrame";

const SLIDE_DURATION = 0.32;

export const WorksSlider = ({ projects, remainingCount = 0 }) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animTimer = useRef(0);

  const slideCount = projects.length + 1; // + view-more card
  const isViewMore = index === projects.length;
  const project = isViewMore ? null : projects[index];
  const duration = reduceMotion ? 0.12 : SLIDE_DURATION;

  const goTo = useCallback(
    (nextIndex, dir) => {
      if (isAnimating) return;
      const normalized = ((nextIndex % slideCount) + slideCount) % slideCount;
      if (normalized === index) return;

      setIsAnimating(true);
      setDirection(dir);
      setIndex(normalized);

      window.clearTimeout(animTimer.current);
      // wait + exit for mode="wait"
      animTimer.current = window.setTimeout(
        () => setIsAnimating(false),
        duration * 2000 + 40
      );
    },
    [duration, index, isAnimating, slideCount]
  );

  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  useEffect(() => {
    return () => window.clearTimeout(animTimer.current);
  }, []);

  const slideVariants = {
    enter: (dir) => ({
      x: reduceMotion ? 0 : dir > 0 ? 56 : -56,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: reduceMotion ? 0 : dir > 0 ? -56 : 56,
      opacity: 0,
    }),
  };

  const canDrag = !reduceMotion && !isAnimating;

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-x-clip px-2 py-3">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={isViewMore ? "view-more" : project.title}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
            }}
            drag={canDrag ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (isAnimating) return;
              if (info.offset.x < -60) goNext();
              else if (info.offset.x > 60) goPrev();
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            {isViewMore ? (
              <Link
                href="/works"
                className="work-frame work-frame--cta group block"
                aria-label="Browse all projects on the works page"
              >
                <span
                  className="work-frame__corner work-frame__corner--tl"
                  aria-hidden="true"
                />
                <span
                  className="work-frame__corner work-frame__corner--tr"
                  aria-hidden="true"
                />
                <span
                  className="work-frame__corner work-frame__corner--bl"
                  aria-hidden="true"
                />
                <span
                  className="work-frame__corner work-frame__corner--br"
                  aria-hidden="true"
                />
                <div className="work-frame__media">
                  <div className="relative flex aspect-[16/10] w-full flex-col items-center justify-center px-6 text-center sm:px-12">
                    <p className="mb-3 font-body text-xs uppercase tracking-section text-muted">
                      End of preview
                    </p>
                    <p className="mb-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                      {remainingCount > 0
                        ? `+${remainingCount}`
                        : "More"}
                    </p>
                    <h3 className="mb-3 font-display text-xl tracking-tight text-ink sm:text-2xl">
                      projects on the works page
                    </h3>
                    <p className="body-copy mx-auto mb-8 max-w-sm text-ink/70">
                      This slider only shows a few highlights. Tap below to open
                      the full list.
                    </p>
                    <span className="CustomButton pointer-events-none">
                      Go to all works
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <article className="flex flex-col">
                <WorkFrame as="div" staticFrame className="mb-8">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={project.imageUrl}
                      alt={`${project.title} project screenshot`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 896px"
                      quality={75}
                      priority={index === 0}
                    />
                  </div>
                </WorkFrame>

                <div className="text-center sm:text-left">
                  <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="font-body text-xs uppercase tracking-section text-muted">
                      {String(index + 1).padStart(2, "0")}
                      <span className="mx-2 text-ink/25">/</span>
                      {String(projects.length).padStart(2, "0")}
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
                        onPointerDown={(event) => event.stopPropagation()}
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
                </div>
              </article>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
        <p className="font-body text-xs uppercase tracking-section text-muted">
          {isViewMore ? (
            "Next · All works"
          ) : (
            <>
              {String(index + 1).padStart(2, "0")}
              <span className="mx-2 text-ink/25">/</span>
              {String(projects.length).padStart(2, "0")}
            </>
          )}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="border border-ink/20 px-4 py-2 font-display text-sm tracking-wide text-ink transition-colors hover:border-ink/45 hover:bg-ink/[0.04]"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goNext}
            className="border border-ink/20 px-4 py-2 font-display text-sm tracking-wide text-ink transition-colors hover:border-ink/45 hover:bg-ink/[0.04]"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="mt-5 flex justify-center gap-2"
        role="tablist"
        aria-label="Project slides"
      >
        {Array.from({ length: slideCount }).map((_, i) => {
          const isLast = i === projects.length;
          const label = isLast
            ? "Go to all works"
            : `Go to ${projects[i].title}`;

          return (
            <button
              key={isLast ? "view-more-dot" : projects[i].title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={label}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`h-1.5 transition-all duration-300 ${
                i === index
                  ? isLast
                    ? "w-8 bg-ink/55"
                    : "w-8 bg-ink"
                  : "w-3 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
