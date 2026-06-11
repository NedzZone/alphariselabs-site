import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import posterUrl from "../../public/AlphaRise Research Poster Design-Website-compressed.png";
import figureUrl from "../../assets/figure-About-Panel-Pip.png";

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

const tabs = ["Overview", "The Science", "Recognition"] as const;
type Tab = (typeof tabs)[number];

const stats = [
  { label: "APPROACH", value: "Real-time neurofeedback", note: "brain state drives the game" },
  { label: "SESSION",  value: "Under 10 min",            note: "distributed, not demanded"   },
  { label: "SAFEGUARD",value: "Compassionate Mode",      note: "never penalizes fatigue"     },
  { label: "RESEARCH", value: "N=146 survey",            note: "MS-specific fatigue study"   },
];

const tabContent = (onOpenPoster: () => void): Record<Tab, React.ReactNode> => ({
  Overview: (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-xl"
            style={{
              background: "rgba(177,161,209,0.05)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Calibri Light, 10% letter-spacing */}
            <p style={{
              fontFamily: SANS,
              fontWeight: 300,
              fontSize: "0.68rem",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}>
              {s.label}
            </p>
            {/* Georgia Bold value */}
            <p className="mt-1" style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "var(--foreground)",
              lineHeight: 1.25,
            }}>
              {s.value}
            </p>
            <p className="mt-1" style={{
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: "1.05rem",
              lineHeight: 1.45,
              color: "var(--secondary)",
            }}>
              {s.note}
            </p>
          </div>
        ))}
      </div>

      {/* Pull quote — Georgia italic, gold */}
      <blockquote className="mt-8 pl-5" style={{ borderLeft: "2px solid var(--primary)" }}>
        <p style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "1.1rem",
          lineHeight: 1.6,
          color: "var(--primary)",
        }}>
          "You should never punish the symptom you're trying to heal."
        </p>
      </blockquote>
    </div>
  ),

  "The Science": (
    <div className="space-y-5">
      <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "1.08rem", lineHeight: 1.8, color: "var(--muted-foreground)" }}>
        AlphaRise reads the player's brain activity in real time via a consumer-grade EEG headset.
        The game's central character — a small creature named <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>Pip</strong> — responds
        directly to that signal. As the player's focus rises, Pip rises with it. The connection is
        never explained. It is felt.
      </p>
      <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "1.08rem", lineHeight: 1.8, color: "var(--muted-foreground)" }}>
        The core design principle — <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Compassionate Mode</em> — ensures
        the game never introduces penalty, failure states, or time pressure. When MS-related
        cognitive fatigue drops the player's alpha-band activity, the game responds with calm
        instead of consequence. The system adapts to the brain it is listening to, session by session.
      </p>
      <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "1.08rem", lineHeight: 1.8, color: "var(--muted-foreground)" }}>
        An N=146 survey of people living with MS informed the fatigue model and the session-length
        design. Sessions run under ten minutes and are structured for use during low-energy
        windows — distributed across the day, not demanded in one block.
      </p>
      <blockquote className="pl-5 mt-4" style={{ borderLeft: "2px solid var(--primary)" }}>
        <p style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "var(--primary)",
        }}>
          "You should never punish the symptom you're trying to heal."
        </p>
      </blockquote>
    </div>
  ),

  Recognition: (
    <div className="space-y-8">
      {/* Lead item — research poster with visual weight */}
      <div
        className="p-6 md:p-7 rounded-xl flex items-center gap-5 md:gap-6"
        style={{
          background: "rgba(219,179,94,0.06)",
          border: "1px solid rgba(219,179,94,0.22)",
        }}
      >
        {/* Circular eye button — left, vertically centered; opens the poster */}
        <button
          type="button"
          onClick={onOpenPoster}
          aria-label="View the poster"
          className="shrink-0 inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            width: "4.25rem",
            height: "4.25rem",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(10,6,18,0.55)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
          </svg>
        </button>

        {/* Text */}
        <div>
          <p style={{
            fontFamily: SANS,
            fontWeight: 300,
            fontSize: "0.9rem",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: "0.5rem",
          }}>
            Peer-reviewed · Conference Poster
          </p>
          <p style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: "1.5rem",
            lineHeight: 1.35,
            color: "var(--foreground)",
          }}>
            Research poster accepted to the AMXRA-sponsored poster session at the{" "}
            <em style={{ fontStyle: "italic", color: "var(--primary)" }}>
              Cedars-Sinai Virtual Medicine Conference (vMed26).
            </em>
          </p>
        </div>
      </div>

      {/* Supporting recognition items */}
      <div className="space-y-4">
        {[
          {
            label: "Accepted",
            title: "AWE USA 2026 Research Track",
            color: "var(--secondary)",
          },
          {
            label: "1st Place",
            title: "Best Graduate Research Design Artifact — SCAD Entelechy 2026",
            color: "var(--primary)",
          },
          {
            label: "Faculty Nominee",
            title: "2026 Lumen Prize Student Award",
            color: "var(--accent)",
          },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <div
              className="mt-1 shrink-0 px-2 py-0.5 rounded-full"
              style={{
                fontFamily: SANS,
                fontWeight: 300,
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                background: "transparent",
                border: `1px solid ${item.color}`,
                color: item.color,
              }}
            >
              {item.label}
            </div>
            <p style={{
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: "1.25rem",
              lineHeight: 1.5,
              color: "var(--foreground)",
            }}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
});

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [posterOpen, setPosterOpen] = useState(false);
  const [figureZoom, setFigureZoom] = useState(false);

  // Close the poster lightbox on Escape, and lock body scroll while open
  useEffect(() => {
    if (!posterOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPosterOpen(false); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [posterOpen]);

  return (
    <section id="portfolio" className="relative min-h-screen px-6 pt-24 pb-32 md:pb-40" aria-label="Portfolio">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <FadeIn>
          <div className="flex items-center gap-5 mb-16">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span style={{
              fontFamily: PIXEL,
              fontWeight: 300,
              fontSize: "2.34rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--primary)",
            }}>
              The Work
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

            {/* Project header */}
            <div
              className="relative px-8 pt-10 pb-8"
              style={{
                background: "linear-gradient(135deg, rgba(219,179,94,0.06) 0%, rgba(135,184,203,0.04) 100%)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-10 md:items-center">
                <div style={{
                  filter: figureZoom ? "blur(3px)" : "none",
                  opacity: figureZoom ? 0.6 : 1,
                  transition: "filter 0.45s ease, opacity 0.45s ease",
                }}>
                  {/* Project name — Georgia Bold */}
                  <h2 style={{
                    fontFamily: SERIF,
                    fontWeight: 700,
                    fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)",
                    lineHeight: 1.12,
                    color: "var(--foreground)",
                    letterSpacing: "-0.02em",
                  }}>
                    Play AlphaRise with your{" "}
                    <em style={{ fontStyle: "italic", color: "var(--primary)" }}>brainwaves</em>
                  </h2>

                  <p className="mt-4 max-w-lg" style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: "1.15rem",
                    lineHeight: 1.7,
                    color: "var(--muted-foreground)",
                    textWrap: "pretty",
                  }}>
                    A therapeutic closed-loop neurogame for people living with chronic fatigue, starting
                    with MS-related fatigue. The player wears a brain-sensing headset; a small creature
                    named Pip responds to their brain activity in real time. As focus rises, Pip rises
                    with it. The connection is never explained, it is felt, both seen and heard.
                  </p>
                </div>

                {/* Project figure — hover to magnify (grows inward from top-right, no clip) */}
                <div
                  className="w-full rounded-xl p-3 md:p-4"
                  onMouseEnter={() => setFigureZoom(true)}
                  onMouseLeave={() => setFigureZoom(false)}
                  style={{
                    position: "relative",
                    zIndex: figureZoom ? 20 : 0,
                    background: "rgba(227,222,238,0.2)",
                    boxShadow: figureZoom
                      ? "0 26px 64px rgba(10,6,18,0.6)"
                      : "0 10px 30px rgba(10,6,18,0.45)",
                    transform: figureZoom ? "scale(1.45)" : "scale(1)",
                    transformOrigin: "right center",
                    transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s",
                    cursor: "zoom-in",
                  }}
                >
                  <img
                    src={figureUrl}
                    alt="Diagram of the AlphaRise closed-loop system: a seated person wearing a brain-sensing headset whose brainwaves feed a Brain State Classifier (High, Mild, Neutral, Calm, Focus), which drives an on-screen game — Pip, a glowing creature in space, with dynamic difficulty across 9 levels — then loops back to the player."
                    loading="lazy"
                    className="w-full rounded-md"
                    style={{ display: "block", height: "auto" }}
                  />
                </div>
              </div>

              {/* Collaborator credit — full width below the header, one line on desktop */}
              <p className="mt-8 md:whitespace-nowrap" style={{
                fontFamily: SANS,
                fontWeight: 400,
                fontSize: "0.9rem",
                letterSpacing: "0.02em",
                color: "var(--text-faint)",
              }}>
                Game Art Collaborator:{" "}
                <span style={{ color: "var(--secondary)" }}>Madeleine Schaefer</span>, BFA Game Development, SCAD
              </p>
            </div>

            {/* Tabs */}
            <div className="px-8 pt-6" style={{ borderBottom: "1px solid var(--border)" }}>
              <div role="tablist" className="flex gap-6" aria-label="Project details">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`tabpanel-${tab}`}
                    id={`tab-${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className="relative pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    style={{
                      fontFamily: SANS,
                      fontWeight: activeTab === tab ? 600 : 400,
                      fontSize: "0.88rem",
                      color: activeTab === tab ? "var(--foreground)" : "var(--muted-foreground)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0 0 1rem 0",
                      transition: "color 0.2s",
                    }}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: "var(--primary)" }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab panel */}
            <div
              id={`tabpanel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="px-8 py-8"
            >
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {tabContent(() => setPosterOpen(true))[activeTab]}
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Poster lightbox — view-only flattened image (no PDF served) */}
      {posterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AlphaRise research poster"
          onClick={() => setPosterOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(10,6,18,0.86)", backdropFilter: "blur(6px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[96rem]"
          >
            <button
              type="button"
              onClick={() => setPosterOpen(false)}
              aria-label="Close poster"
              className="absolute -top-4 -right-2 md:-right-4 z-10 flex items-center justify-center rounded-full transition-opacity duration-200"
              style={{
                width: "2.25rem",
                height: "2.25rem",
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                border: "none",
                cursor: "pointer",
                fontSize: "1.1rem",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              ✕
            </button>
            <div
              className="max-h-[90vh] overflow-auto rounded-lg"
              style={{ border: "1px solid var(--border)", background: "#0a0612" }}
            >
              <img
                src={posterUrl}
                alt="Research poster — AlphaRise: A compassionate neurofeedback game for MS fatigue management, by Ned Shoaei (MFA Game Development, SCAD). It covers the background on MS-related fatigue, an N=146 survey of people with MS, the closed-loop neurofeedback system, Pip's five brain states (Focus, Calm, Neutral, Mild fatigue, High fatigue), Compassionate Mode, a comparison with prior systems, and future directions."
                draggable={false}
                className="block w-full h-auto select-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
