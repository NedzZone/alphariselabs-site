import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Placeholder one-liners — swap in final copy when ready.
// `grad` + `motif` drive the placeholder thumbnail (palette-only, optic-safe).
// To use real art later, replace <Thumb .../> in the card with an <img>.
const projects = [
  {
    tag:   "Narrative Game",
    title: "Lion and Sun",
    body:  "A narrative game rooted in Persian myth and memory, exploring identity through interactive story.",
    accent: "var(--primary)",
    grad:  "linear-gradient(135deg, #dbb35e 0%, #582c6f 100%)",
    motif: "sun",
  },
  {
    tag:   "Immersive XR",
    title: "XR Women",
    body:  "An immersive XR experience that spotlights women's stories through presence and embodiment.",
    accent: "var(--secondary)",
    grad:  "linear-gradient(135deg, #87b8cb 0%, #210d40 100%)",
    motif: "rings",
  },
  {
    tag:   "Accessible Tool",
    title: "SCADAsk",
    body:  "A campus tool exploring accessible information design and how people ask for help.",
    accent: "var(--accent)",
    grad:  "linear-gradient(135deg, #b1a1d1 0%, #5b82a0 100%)",
    motif: "bars",
  },
];

// Placeholder thumbnail — easy to swap for real art: replace the <Thumb/> call
// in the card with <img src={...} className="mb-5 w-full rounded-xl" />.
function Thumb({ grad, motif }: { grad: string; motif: string }) {
  return (
    <div
      aria-hidden="true"
      className="mb-5 w-full rounded-xl overflow-hidden relative"
      style={{ aspectRatio: "16 / 10", background: grad }}
    >
      {/* soft light */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 28% 22%, rgba(227,222,238,0.22) 0%, transparent 58%)",
      }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 100" fill="none"
        preserveAspectRatio="xMidYMid slice">
        {motif === "sun" && (
          <>
            <circle cx="116" cy="34" r="18" fill="rgba(227,222,238,0.30)" />
            <circle cx="116" cy="34" r="29" stroke="rgba(227,222,238,0.30)" strokeWidth="1.5" />
          </>
        )}
        {motif === "rings" && (
          <>
            <circle cx="80" cy="50" r="15" stroke="rgba(204,227,238,0.50)" strokeWidth="1.5" />
            <circle cx="80" cy="50" r="27" stroke="rgba(204,227,238,0.32)" strokeWidth="1.5" />
            <circle cx="80" cy="50" r="39" stroke="rgba(204,227,238,0.18)" strokeWidth="1.5" />
          </>
        )}
        {motif === "bars" && (
          <>
            <rect x="44" y="22" width="6" height="56" rx="3" fill="rgba(227,222,238,0.30)" />
            <rect x="66" y="36" width="6" height="42" rx="3" fill="rgba(227,222,238,0.24)" />
            <rect x="88" y="14" width="6" height="64" rx="3" fill="rgba(227,222,238,0.36)" />
            <rect x="110" y="46" width="6" height="32" rx="3" fill="rgba(227,222,238,0.20)" />
          </>
        )}
      </svg>
    </div>
  );
}

export function Studio() {
  return (
    <section id="studio" className="relative min-h-screen px-6 pt-24 pb-32 md:pb-40" aria-label="In My Studio">
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(177,161,209,0.18), transparent)" }} />

      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <FadeIn>
          <div className="flex items-center gap-5 mb-16">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span style={{
              fontFamily: PIXEL,
              fontWeight: 300,
              fontSize: "2.4rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--blue-deep)",
            }}>
              In My Studio
            </span>
          </div>
        </FadeIn>

        {/* Intro */}
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)",
            lineHeight: 1.12,
            color: "var(--foreground)",
            letterSpacing: "-0.02em",
            maxWidth: "20ch",
          }}>
            Other things I'm{" "}
            <em style={{ fontStyle: "italic", color: "var(--blue-deep)" }}>making.</em>
          </h2>
          <p className="mt-7 max-w-2xl" style={{
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: "1.15rem",
            lineHeight: 1.8,
            color: "var(--muted-foreground)",
          }}>
            Beyond AlphaRise, the studio is where I keep experimenting — with narrative,
            immersive media, and tools that make hard things a little more human.
          </p>
        </FadeIn>

        {/* Project cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={0.15 + i * 0.1}>
              <div
                className="h-full p-7 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(177,161,209,0.05)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "rgba(177,161,209,0.30)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
                }
              >
                {/* Placeholder thumbnail — swap for real art later */}
                <Thumb grad={p.grad} motif={p.motif} />

                {/* Tag */}
                <span className="inline-block mb-4 px-2.5 py-0.5 rounded-full" style={{
                  fontFamily: SANS,
                  fontWeight: 300,
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  background: "transparent",
                  border: `1px solid ${p.accent}`,
                  color: p.accent,
                }}>
                  {p.tag}
                </span>

                {/* Title — Georgia Bold */}
                <h3 style={{
                  fontFamily: SERIF,
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  lineHeight: 1.2,
                  color: "var(--foreground)",
                  letterSpacing: "-0.01em",
                }}>
                  {p.title}
                </h3>

                {/* Body — Calibri Regular */}
                <p className="mt-3" style={{
                  fontFamily: SANS,
                  fontWeight: 400,
                  fontSize: "0.98rem",
                  lineHeight: 1.7,
                  color: "var(--muted-foreground)",
                }}>
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
