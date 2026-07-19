"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { to: "about", href: "/#about", label: "About", offset: -88 },
  { to: "skills", href: "/#skills", label: "Skills", offset: -88 },
  { to: "works", href: "/#works", label: "Works", offset: -72 },
  { to: "contact", href: "/#contact", label: "Contact", offset: -48 },
];

export const Navigation = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const rafId = useRef(0);
  const isMenuOpenRef = useRef(isMenuOpen);
  const isScrolledRef = useRef(isScrolled);
  const isHiddenRef = useRef(isHidden);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    const updateScrollState = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      const nextScrolled = currentY > 16;
      let nextHidden = isHiddenRef.current;

      if (isMenuOpenRef.current) {
        nextHidden = false;
      } else if (currentY < 48) {
        nextHidden = false;
      } else if (delta > 6) {
        nextHidden = true;
      } else if (delta < -6) {
        nextHidden = false;
      }

      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      if (nextHidden !== isHiddenRef.current) {
        isHiddenRef.current = nextHidden;
        setIsHidden(nextHidden);
      }

      lastScrollY.current = currentY;
      rafId.current = 0;
    };

    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = window.requestAnimationFrame(updateScrollState);
    };

    lastScrollY.current = window.scrollY;
    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) window.cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen && isHiddenRef.current) {
      isHiddenRef.current = false;
      setIsHidden(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isSolid = isScrolled || isMenuOpen || !isHome;

  const renderLink = (link, mobile = false) => {
    const className = mobile
      ? "site-nav__link site-nav__link--mobile"
      : "site-nav__link";

    if (isHome) {
      return (
        <ScrollLink
          to={link.to}
          spy={true}
          smooth={true}
          offset={link.offset}
          duration={500}
          className={className}
          activeClass="is-active"
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </ScrollLink>
      );
    }

    return (
      <Link
        href={link.href}
        className={className}
        onClick={() => setIsMenuOpen(false)}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header
      className={[
        "site-nav",
        isSolid ? "is-solid" : "",
        isMenuOpen ? "is-menu-open" : "",
        isHidden && !isMenuOpen ? "is-hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="site-nav__bar">
        <Link
          href="/"
          aria-label="Jubet Aceberos home"
          className="site-nav__brand"
        >
          JUBET.
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.to}>{renderLink(link)}</li>
              ))}
            </ul>
          </nav>

          <span className="site-nav__divider" aria-hidden="true" />
          <ThemeToggle />
        </div>

        <div className="site-nav__actions lg:hidden">
          {!isMenuOpen && <ThemeToggle />}
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="site-nav__menu-btn"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={`site-nav__burger ${isMenuOpen ? "is-open" : ""}`}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="site-nav__mobile" aria-label="Mobile">
          <div className="site-nav__mobile-body">
            <p className="site-nav__mobile-label">Menu</p>
            <ul className="site-nav__mobile-list">
              {navLinks.map((link, index) => (
                <li key={link.to} className="site-nav__mobile-item">
                  <span className="site-nav__mobile-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {renderLink(link, true)}
                </li>
              ))}
            </ul>
          </div>

          <div className="site-nav__mobile-footer">
            <ThemeToggle />
            <p className="site-nav__mobile-theme-label">
              Appearance
            </p>
          </div>
        </nav>
      )}
    </header>
  );
};
