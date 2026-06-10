import { motion } from "motion/react";
import portraitUrl from "../../assets/ned-portrait-compressed.jpg";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

export function Hero() {
  return (
    <section
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

      {/* Top rule */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(219,179,94,0.35))" }} />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Eyebrow — Calibri Light, letter-spacing 10% */}
        <span
          className="mb-10"
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

        {/* Name — Georgia Bold, italic on surname */}
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: "clamp(3rem, 9vw, 7rem)",
            lineHeight: 1.05,
            color: "var(--foreground)",
            letterSpacing: "-0.02em",
          }}
        >
          Ned{" "}
          <em
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Shoaei
          </em>
        </h1>

        {/* Tagline — Calibri Regular */}
        <p
          className="mt-8"
          style={{
            fontFamily: PIXEL,
            fontWeight: 400,
            fontSize: "clamp(0.85rem, 3.3vw, 2.25rem)",
            lineHeight: 1.5,
            whiteSpace: "nowrap",
            color: "var(--muted-foreground)",
          }}
        >
          Games that care, for stories that matter.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://youtu.be/-O7QepmzQ5k?si=gEFGXmzJuoZD666q&t=43"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            See the work
          </a>
          <a
            href="https://youtu.be/-O7QepmzQ5k?si=P-aiZV1Tpw1LMmO8&t=42"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              color: "var(--accent)",
              border: "1px solid rgba(177,161,209,0.28)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(177,161,209,0.6)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(177,161,209,0.28)")}
          >
            My story
          </a>
        </div>
      </motion.div>

      {/* Photo + memo band — fills the space below the intro */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mt-20 md:mt-28"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-10 md:gap-16 items-center">

          {/* Left — portrait */}
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
            {/* Photo credit */}
            <p className="mt-3" style={{
              fontFamily: SANS,
              fontWeight: 300,
              fontSize: "0.72rem",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}>
              Photo: Mike Schalk
            </p>
          </div>

          {/* Right — memo, styled as an elegant pull-quote */}
          <blockquote className="relative md:pl-8 text-left" style={{ margin: 0 }}>
            <span
              aria-hidden="true"
              className="hidden md:block absolute left-0 top-1 bottom-1 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(177,161,209,0.45), transparent)" }}
            />
            <p style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.45,
              letterSpacing: "-0.01em",
              color: "var(--foreground)",
            }}>
              I'm a game designer. In my MFA thesis I explore how narrative and system design
              could build{" "}
              <span style={{ color: "var(--accent)" }}>therapeutic simulations for healthcare.</span>{" "}
              That led me to EEG sensors and a closed-loop, gamified feedback system rooted in{" "}
              <span style={{ color: "var(--primary)" }}>neuroplasticity and flow.</span>
            </p>
          </blockquote>
        </div>
      </motion.div>
    </section>
  );
}
