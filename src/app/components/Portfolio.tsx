import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import posterUrl from "../../public/NedShoaei_ResearchPoster_vMed_AlphaRise-compressed.pdf?url";

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

const tabContent: Record<Tab, React.ReactNode> = {
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
        className="p-6 rounded-xl"
        style={{
          background: "rgba(219,179,94,0.06)",
          border: "1px solid rgba(219,179,94,0.22)",
        }}
      >
        <p style={{
          fontFamily: SANS,
          fontWeight: 300,
          fontSize: "0.68rem",
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
          fontSize: "1.1rem",
          lineHeight: 1.4,
          color: "var(--foreground)",
        }}>
          Research poster accepted to the AMXRA-sponsored poster session at the{" "}
          <em style={{ fontStyle: "italic", color: "var(--primary)" }}>
            Cedars-Sinai Virtual Medicine Conference (vMed26).
          </em>
        </p>
        <div className="mt-4">
          <a
            href={posterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: "0.85rem",
              letterSpacing: "0.03em",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            {/* using <svg> here instead of lucide-react Download: no kit icon system present */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View the poster (PDF)
          </a>
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
                fontSize: "0.65rem",
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
              fontSize: "0.92rem",
              lineHeight: 1.55,
              color: "var(--foreground)",
            }}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <section id="portfolio" className="relative px-6 py-32 md:py-40" aria-label="Portfolio">
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(219,179,94,0.2), transparent)" }} />

      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <FadeIn>
          <div className="flex items-center gap-5 mb-16">
            <span style={{ fontFamily: PIXEL, fontSize: "2.8rem", color: "var(--primary)" }}>
              02
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span style={{
              fontFamily: SANS,
              fontWeight: 300,
              fontSize: "1.8rem",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
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
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  {/* Pill */}
                  <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full" style={{
                    fontFamily: SANS,
                    fontWeight: 300,
                    fontSize: "0.95rem",
                    letterSpacing: "0.08em",
                    background: "rgba(219,179,94,0.12)",
                    border: "1px solid rgba(219,179,94,0.25)",
                    color: "var(--primary)",
                  }}>
                    Therapeutic Neurogame
                  </span>

                  {/* Project name — Georgia Bold */}
                  <h2 style={{
                    fontFamily: SERIF,
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5vw, 3.2rem)",
                    lineHeight: 1.08,
                    color: "var(--foreground)",
                    letterSpacing: "-0.02em",
                  }}>
                    AlphaRise
                  </h2>

                  <p className="mt-4 max-w-lg" style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: "1.15rem",
                    lineHeight: 1.75,
                    color: "var(--muted-foreground)",
                  }}>
                    A closed-loop neurofeedback game for people living with MS-related cognitive
                    fatigue. The player wears a brain-sensing headset; a small creature named Pip
                    responds to their brain activity in real time. As focus rises, Pip rises with it.
                    The connection is never explained — it is felt.
                  </p>

                  {/* Collaborator credit */}
                  <p className="mt-4" style={{
                    fontFamily: SANS,
                    fontWeight: 400,
                    fontSize: "0.85rem",
                    letterSpacing: "0.02em",
                    color: "var(--muted-foreground)",
                  }}>
                    Game Art Collaborator:{" "}
                    <span style={{ color: "var(--secondary)" }}>Madeleine Schaefer</span>, BFA Game Development, SCAD
                  </p>
                </div>

                {/* EEG waveform graphic */}
                <div aria-hidden="true" className="flex-shrink-0">
                  <svg width="80" height="48" viewBox="0 0 80 48" fill="none">
                    <polyline
                      points="0,24 12,24 18,8 24,40 30,4 36,44 42,16 48,32 54,20 60,24 80,24"
                      stroke="#dbb35e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
                    />
                    <polyline
                      points="0,32 10,32 16,22 22,42 28,18 34,38 40,28 46,36 52,26 58,32 80,32"
                      stroke="#87b8cb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"
                    />
                  </svg>
                </div>
              </div>
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
                {tabContent[activeTab]}
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
