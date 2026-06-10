import { useState, useEffect } from "react";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

const links = [
  { label: "About",     href: "#about"     },
  { label: "The Work", href: "#portfolio" },
  { label: "Studio",    href: "#studio"    },
  { label: "Contact",   href: "#contact"   },
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

        <ul className="flex items-center gap-8 list-none m-0 p-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  fontFamily: SANS,
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                  color: "var(--muted-foreground)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)")
                }
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
