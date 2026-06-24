import { motion } from "motion/react";
import portraitUrl from "../../assets/ned-portrait-compressed.jpg";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

// Subtle, accessible hover/focus tooltip — dark panel, muted ink, small.
// Drop inside a `group relative` (or `group` + positioned) clickable element.
// `className` sets placement (e.g. "bottom-full left-1/2 -translate-x-1/2 mb-2").
function HoverTip({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute z-[60] whitespace-nowrap rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 ${className}`}
      style={{
        fontFamily: SANS,
        fontWeight: 400,
        fontSize: "0.72rem",
        letterSpacing: "0.04em",
        padding: "0.3rem 0.55rem",
        background: "rgba(10,6,18,0.96)",
        color: "var(--muted-foreground)",
        border: "1px solid var(--border)",
        boxShadow: "0 6px 18px rgba(10,6,18,0.5)",
      }}
    >
      {label}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 md:py-32 overflow-hidden"
      aria-label="Hero"
    >
      {/* Signature glow orb */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div style={{
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(219,179,94,0.10) 0%, rgba(177,161,209,0.07) 40%, transparent 72%)",
          filter: "blur(2px)",
        }} />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Headline — Upheaval pixel, large, white */}
        <p
          style={{
            fontFamily: PIXEL,
            fontWeight: 400,
            fontSize: "clamp(1rem, 3.8vw, 3.15rem)",
            lineHeight: 1.4,
            whiteSpace: "nowrap",
            color: "#ffffff",
          }}
        >
          Games that care, for stories that matter.
        </p>

        {/* Eyebrow — Calibri Light, letter-spacing */}
        <span
          className="mt-6"
          style={{
            fontFamily: SANS,
            fontWeight: 300,
            fontSize: "1.44rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--secondary)",
          }}
        >
          Founder, AlphaRise Labs · Game Designer · MedTech Innovator
        </span>

      </motion.div>

      {/* Photo + memo band — wide hero feature: large portrait + roomy memo */}
      <motion.div
        className="relative z-10 w-full max-w-[84rem] mt-12 md:mt-16"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-10 md:gap-16 items-center">

          {/* Left — portrait */}
          <div className="relative">
            <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[1.6rem]"
              style={{
                background: "radial-gradient(ellipse at center, rgba(177,161,209,0.18) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
            <img
              src={portraitUrl}
              alt="Ned Shoaei"
              loading="lazy"
              className="relative w-full rounded-2xl"
              style={{
                display: "block",
                objectFit: "cover",
                border: "1px solid rgba(177,161,209,0.28)",
                boxShadow: "0 0 0 1px rgba(177,161,209,0.06), 0 18px 50px rgba(10,6,18,0.55)",
              }}
            />
            {/* See the work — circular eye-icon button overlaying the photo */}
            <a
              href="https://youtu.be/-O7QepmzQ5k?si=gEFGXmzJuoZD666q&t=43"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="See the work"
              title="Watch the demo"
              className="group absolute top-5 right-5 z-10 inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                width: "4.25rem",
                height: "4.25rem",
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(10,6,18,0.55)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
              {/* Tooltip below the icon (it sits near the photo's top edge) */}
              <HoverTip label="Watch the demo" className="top-full right-0 mt-2" />
            </a>
            </div>
            {/* Photo credit */}
            <p className="mt-3" style={{
              fontFamily: SANS,
              fontWeight: 300,
              fontSize: "0.72rem",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
            }}>
              Photo: Mike Schalk
            </p>
          </div>

          {/* Right — name + memo */}
          <div className="text-left">
            {/* Name — Upheaval pixel, light purple */}
            <h1 className="md:pl-8 mb-5" style={{
              fontFamily: PIXEL,
              fontWeight: 400,
              fontSize: "clamp(1.5rem, 3.6vw, 2.4rem)",
              letterSpacing: "0.02em",
              lineHeight: 1.3,
              color: "var(--accent)",
            }}>
              Meet Ned Shoaei
            </h1>
            {/* Memo — elegant pull-quote */}
            <blockquote className="relative md:pl-8" style={{ margin: 0 }}>
            <span
              aria-hidden="true"
              className="hidden md:block absolute left-0 top-1 bottom-1 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(177,161,209,0.45), transparent)" }}
            />
            <p style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
              color: "var(--foreground)",
              textWrap: "balance",
            }}>
              I'm a game designer. In my MFA thesis I explore how narrative and system design
              could build{" "}
              <span style={{ color: "var(--accent)" }}>therapeutic simulations for healthcare.</span>{" "}
              That led me to EEG sensors and a closed-loop, gamified feedback system rooted in{" "}
              <span style={{ color: "var(--primary)" }}>neuroplasticity and flow.</span>
            </p>
          </blockquote>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
