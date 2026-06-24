import { useState, useEffect } from "react";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

const links = [
  { label: "Home",      href: "#home",      color: "#e3deee" }, // lilac-light
  { label: "About",     href: "#about",     color: "#87b8cb" }, // mist blue (matches About headline)
  { label: "The Work", href: "#portfolio", color: "#dbb35e" }, // gold (matches section number)
  // { label: "Studio", href: "#studio", color: "#5b82a0" }, // "In My Studio" section hidden for now — restore alongside <Studio /> in App.tsx
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
        <ul className="flex items-center justify-between w-full list-none m-0 p-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex items-center gap-1.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  fontFamily: PIXEL,
                  fontWeight: 400,
                  fontSize: "1.6rem",
                  letterSpacing: "0.05em",
                  color: link.color,
                  textDecoration: "none",
                  opacity: 0.9,
                  transformOrigin: "center bottom",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.opacity = "1";
                  el.style.transform = "translateY(-3px) scale(1.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.opacity = "0.9";
                  el.style.transform = "translateY(0) scale(1)";
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
