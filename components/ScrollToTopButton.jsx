"use client";

import { useEffect, useRef, useState } from "react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const rafId = useRef(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const updateVisibility = () => {
      const nextVisible = window.scrollY > 280;
      if (nextVisible !== visibleRef.current) {
        visibleRef.current = nextVisible;
        setVisible(nextVisible);
      }
      rafId.current = 0;
    };

    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`scroll-top-btn fixed bottom-6 right-6 z-40 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
