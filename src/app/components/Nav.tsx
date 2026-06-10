import { useState, useEffect } from "react";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

const links = [
  { label: "Home",      href: "#home",      color: "#e3deee" }, // lilac-light
  { label: "About",     href: "#about",     color: "#87b8cb" }, // mist blue (matches About headline)
  { label: "The Work", href: "#portfolio", color: "#dbb35e" }, // gold (matches section number)
  { label: "Studio",    href: "#studio",    color: "#5b82a0" }, // deep blue
  { label: "Contact",   href: "#contact",   color: "#b1a1d1" }, // lilac (matches Contact headline)
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background:    scrolled ? "rgba(10,6,18,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom:  scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav
        className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        {/* Logo wordmark — Upheaval TT pixel font */}
        <a
          href="#"
          aria-label="NS — Ned Shoaei home"
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: PIXEL,
              fontSize: "1.15rem",
              color: "var(--primary)",
              letterSpacing: "0.04em",
            }}
          >
            NS
          </span>
        </a>

        <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 list-none m-0 p-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex items-center gap-1.5 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  fontFamily: PIXEL,
                  fontWeight: 400,
                  fontSize: "1.1rem",
                  letterSpacing: "0.05em",
                  color: link.color,
                  textDecoration: "none",
                  opacity: 0.9,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              >
                {/* tiny flair — glowing dot in the section's color */}
                <span
                  aria-hidden="true"
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "9999px",
                    background: link.color,
                    boxShadow: `0 0 6px ${link.color}`,
                    flexShrink: 0,
                  }}
                />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
