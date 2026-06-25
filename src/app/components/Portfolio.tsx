import { AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { FadeIn, motion, useReducedMotion, EASE } from "./motion";
import posterUrl from "../../public/AlphaRise Research Poster Design-Website-compressed.png";
import figureUrl from "../../assets/AlphaRise/The Idea/figure-About-Panel-Pip.png";
import brainBgUrl from "../../assets/AlphaRise/The Idea/idea-bg.jpg";
import brainUrl from "../../assets/AlphaRise/The Idea/idea-brain.png";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

// Subtle, accessible hover/focus tooltip — dark panel, muted ink, small.
// Drop inside a `group relative` (or `group` + positioned) clickable element.
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

const tabs = ["The Idea", "Design Philosophy", "Recognition"] as const;
type Tab = (typeof tabs)[number];

// Each folder tab carries a brain-state color from the site's optic-safe
// fatigue → calm → focus axis (purple → blue → gold), as RGB triples so the
// active/inactive/hover states can vary only the alpha.
const TAB_COLORS: Record<Tab, string> = {
  "The Idea":          "177,161,209", // fatigue — lilac
  "Design Philosophy": "135,184,203", // calm — mist blue
  "Recognition":       "219,179,94",  // focus — gold
};

const ideas = [
  { lead: "Brainwaves as Controller",            body: "You play with focus, not buttons",                       color: "#dbb35e", icon: "wave"  },
  { lead: "Quick Sessions",                      body: "Under ten minutes, whenever you've got it",                color: "#87b8cb", icon: "clock" },
  { lead: "Heal as you Game",                    body: "Play and therapy, happening in one space",                 color: "#b1a1d1", icon: "heart" },
  { lead: "Methodology",                         body: "Surveyed people with MS through the National MS Society",  color: "#5b82a0", icon: "check" },
];

function ideaIcon(name: string) {
  switch (name) {
    case "wave":
      return <polyline points="2,12 6,12 8,5 11,19 13,9 15,14 17,12 22,12" />;
    case "clock":
      return (<><circle cx="12" cy="12" r="9" /><polyline points="12,7 12,12 15,14" /></>);
    case "heart":
      return <path d="M12 20s-6.5-4.2-9-8.2C1.4 9 2.7 5.5 6 5.5c2 0 3.2 1.3 6 3.7 2.8-2.4 4-3.7 6-3.7 3.3 0 4.6 3.5 3 6.3-2.5 4-9 8.2-9 8.2Z" />;
    case "check":
      return (<><circle cx="12" cy="12" r="9" /><polyline points="8.5,12.3 11,14.7 15.5,9.5" /></>);
    default:
      return null;
  }
}

// A single Idea statement — text only (no card chrome). The lead is a serif
// headline tinted with the item's palette color; the body is bold muted sans
// and breaks onto a second line at its comma. A text halo keeps it readable
// where the text overlaps the brain artwork.
function IdeaStatement({ item, maxW = "16rem", align = "left" }: { item: (typeof ideas)[number]; maxW?: string; align?: "left" | "right" }) {
  const [first, ...rest] = item.body.split(/,\s+/);
  const shadow = "0 2px 12px rgba(10,6,18,0.96), 0 0 24px rgba(10,6,18,0.85)";
  return (
    <div className="w-full" style={{ maxWidth: maxW, textAlign: align }}>
      <p style={{ fontFamily: SERIF, fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.25, color: "var(--primary)", textShadow: shadow }}>
        {item.lead}
      </p>
      <p className="mt-1.5" style={{ fontFamily: SANS, fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.45, color: "var(--muted-foreground)", textShadow: shadow }}>
        {rest.length > 0 ? (<>{first},<br />{rest.join(", ")}</>) : item.body}
      </p>
    </div>
  );
}

const tabContent = (onOpenPoster: () => void, reduced: boolean | null): Record<Tab, React.ReactNode> => {
  // Idea-card cascade + brain entrance (reduced-motion aware).
  const cardsContainerV = { hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: reduced ? 0 : 0.2 } } };
  const cardV = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 18, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } } };
  const brainInitial = reduced ? { opacity: 0 } : { opacity: 0, scale: 1.12 };
  const brainAnimate = reduced ? { opacity: 1 } : { opacity: 1, scale: 1 };
  const brainTransition = reduced ? { duration: 0.3 } : { duration: 1.4, ease: EASE };

  return {
  "The Idea": (
    <div>
      {/* Featured pull quote — Georgia italic, gold; centered above the brain */}
      <blockquote className="text-center">
        <p style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          lineHeight: 1.35,
          color: "var(--primary)",
        }}>
          "Games can heal. We're proving it."
        </p>
      </blockquote>

      {/* ===== Desktop (md+): compact horizontal band — brain centered, four cards flanking ===== */}
      <div
        className="hidden md:block relative mx-auto mt-4 overflow-hidden rounded-xl"
        style={{ height: "24rem", maxWidth: "58rem", border: "1px solid var(--border)", background: "var(--background)" }}
      >
        {/* Static background layer (starfield) */}
        <img
          src={brainBgUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Transparent brain layer — zooms in over the static background */}
        <motion.img
          src={brainUrl}
          alt="A glowing brain rendered in indigo and lilac with gold neural pathways against dark space — the visual motif for AlphaRise's brain-controlled gameplay."
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
          initial={brainInitial}
          whileInView={brainAnimate}
          viewport={{ margin: "-60px" }}
          transition={brainTransition}
        />
        {/* Perpetual, very subtle glow pulse so the brain feels alive */}
        {!reduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(219,179,94,0.16) 0%, rgba(177,161,209,0.10) 38%, transparent 66%)",
              mixBlendMode: "screen",
            }}
            animate={{ opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Four statements over the dark space, laid out as two rows so each pair's
            titles start at the same height. Narrow center column keeps the brain clear.
            Left statements align left; right statements align right. They cascade in. */}
        <motion.div
          className="absolute inset-0 grid items-start px-10 pt-9"
          style={{ gridTemplateColumns: "1fr 28% 1fr", rowGap: "1rem" }}
          variants={cardsContainerV}
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-60px" }}
        >
          {/* Row 1 */}
          <motion.div variants={cardV} className="flex justify-start pr-3"><IdeaStatement item={ideas[0]} align="left" /></motion.div>
          <div aria-hidden="true" />
          <motion.div variants={cardV} className="flex justify-end pl-3"><IdeaStatement item={ideas[2]} align="right" /></motion.div>
          {/* Row 2 */}
          <motion.div variants={cardV} className="flex justify-start pr-3"><IdeaStatement item={ideas[1]} align="left" /></motion.div>
          <div aria-hidden="true" />
          <motion.div variants={cardV} className="flex justify-end pl-3"><IdeaStatement item={ideas[3]} align="right" /></motion.div>
        </motion.div>

        {/* 96% — center bottom, prominent on a clear pill */}
        <p
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center rounded-full px-5 py-1.5"
          style={{
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "1rem",
            lineHeight: 1.5,
            color: "var(--foreground)",
            whiteSpace: "nowrap",
            background: "rgba(10,6,18,0.78)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(3px)",
          }}
        >
          <span style={{ color: "var(--secondary)", fontWeight: 700, fontSize: "1.2rem" }}>96%</span>{" "}
          of surveyed people with MS were open to trying therapeutic games (N=146)
        </p>
      </div>

      {/* ===== Mobile (below md): stacked — brain (smaller), statements in one column, then 96% ===== */}
      <div className="md:hidden">
        <div
          className="relative mx-auto mt-5 w-full max-w-sm overflow-hidden rounded-lg"
          style={{ aspectRatio: "1600 / 523", border: "1px solid var(--border)", background: "var(--background)" }}
        >
          {/* Static background layer */}
          <img
            src={brainBgUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: "cover" }}
          />
          {/* Transparent brain layer — zooms in over the static background */}
          <motion.img
            src={brainUrl}
            alt="A glowing brain rendered in indigo and lilac with gold neural pathways against dark space."
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: "cover" }}
            initial={brainInitial}
            whileInView={brainAnimate}
            viewport={{ margin: "-60px" }}
            transition={brainTransition}
          />
          {!reduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, rgba(219,179,94,0.16) 0%, rgba(177,161,209,0.10) 38%, transparent 66%)",
                mixBlendMode: "screen",
              }}
              animate={{ opacity: [0.3, 0.65, 0.3] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        <motion.div
          className="mt-6 mx-auto max-w-sm flex flex-col gap-3"
          variants={cardsContainerV}
          initial="hidden"
          whileInView="show"
          viewport={{ margin: "-60px" }}
        >
          {ideas.map((item) => (
            <motion.div key={item.lead} variants={cardV}>
              <IdeaStatement item={item} maxW="100%" />
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 text-center mx-auto w-fit rounded-full px-5 py-2.5" style={{
          fontFamily: SANS, fontWeight: 500, fontSize: "1rem", lineHeight: 1.5,
          color: "var(--foreground)",
          background: "rgba(10,6,18,0.6)", border: "1px solid var(--border)",
        }}>
          <span style={{ color: "var(--secondary)", fontWeight: 700, fontSize: "1.2rem" }}>96%</span>{" "}
          of surveyed people with MS were open to trying therapeutic games (N=146)
        </p>
      </div>
    </div>
  ),

  "Design Philosophy": (
    <div className="space-y-6">
      <blockquote className="pl-6" style={{ borderLeft: "2px solid var(--primary)" }}>
        <p style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          lineHeight: 1.35,
          color: "var(--primary)",
        }}>
          "You should never punish the symptom you're trying to heal."
        </p>
      </blockquote>
      <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "1.08rem", lineHeight: 1.8, color: "var(--muted-foreground)", textWrap: "pretty" }}>
        While designing and playtesting my BCI game, I kept asking: how do I challenge players and
        still keep them motivated? Most games push you to try harder by penalizing failure. This one
        does the opposite. You're already carrying the weight of a symptom, the game shouldn't add to it.
      </p>
      <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "1.08rem", lineHeight: 1.8, color: "var(--muted-foreground)", textWrap: "pretty" }}>
        <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Compassionate Mode</em> reads your
        brain state and turns it into challenges you can meet at your own pace. You're not competing
        against the game; you're competing against your symptom. The goal is to help you push back
        without pressure, in a therapeutic flow that builds stamina instead of draining it.
      </p>
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
          className="group relative shrink-0 inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
          {/* Left-aligned so the wide label stays inside the card */}
          <HoverTip label="Open the research poster" className="bottom-full left-0 mb-2" />
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

          {/* Press coverage of the same research — Healio Neurology feature */}
          <a
            href="https://www.healio.com/news/neurology/20260408/neurofeedback-game-helps-patients-with-ms-manage-fatigue"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Featured in Healio Neurology"
            className="group relative mt-4 inline-flex items-center gap-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              padding: "0.5rem 1rem 0.5rem 0.85rem",
              background: "rgba(219,179,94,0.10)",
              border: "1px solid rgba(219,179,94,0.45)",
              color: "var(--primary)",
              textDecoration: "none",
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: "0.95rem",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(219,179,94,0.18)";
              el.style.borderColor = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(219,179,94,0.10)";
              el.style.borderColor = "rgba(219,179,94,0.45)";
            }}
          >
            {/* external-link icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14 4h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 4l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Featured in Healio Neurology
            <HoverTip label="Read the Healio feature" className="bottom-full left-0 mb-2" />
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
          {
            label: "Certified",
            title: "AbleGamers APX (Accessible Player Experiences)",
            color: "var(--blue-deep)",
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
  };
};

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("The Idea");
  const [posterOpen, setPosterOpen] = useState(false);
  const [figureZoom, setFigureZoom] = useState(false);
  const reduced = useReducedMotion();

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
    <section id="alpharise" className="relative min-h-screen px-6 pt-24 pb-32 md:pb-40" aria-label="AlphaRise">
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
              AlphaRise
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

            </div>

            {/* Tabs — refined file-folder tabs; the active tab merges into the panel below */}
            <div className="px-8 pt-7" style={{ borderBottom: "1px solid var(--border)" }}>
              <div role="tablist" aria-label="Project details" className="flex items-end gap-1">
                {tabs.map((tab) => {
                  const active = activeTab === tab;
                  const rgb = TAB_COLORS[tab];
                  return (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={active}
                      aria-controls={`tabpanel-${tab}`}
                      id={`tab-${tab}`}
                      onClick={() => setActiveTab(tab)}
                      className="relative rounded-t-lg px-5 py-2.5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      style={{
                        fontFamily: SANS,
                        fontWeight: active ? 600 : 400,
                        fontSize: "0.88rem",
                        letterSpacing: "0.02em",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        // Overlap the panel's top edge so the active tab can erase the divider beneath it
                        marginBottom: "-1px",
                        // Each tab wears its brain-state hue; inactive is the same hue, dimmed
                        color: active ? `rgb(${rgb})` : `rgba(${rgb},0.5)`,
                        background: active ? "var(--card)" : "var(--background)",
                        borderTop: "1px solid var(--border)",
                        borderLeft: active ? "1px solid var(--border)" : "1px solid transparent",
                        borderRight: active ? "1px solid var(--border)" : "1px solid transparent",
                        // Active: bottom border matches the panel so the divider disappears → one surface.
                        // Inactive: bottom border continues the divider line → tab reads as recessed.
                        borderBottom: active ? "1px solid var(--card)" : "1px solid var(--border)",
                      }}
                      onMouseEnter={(e) => {
                        if (active) return;
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "var(--muted)";
                        el.style.color = `rgba(${rgb},0.9)`;
                        el.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        if (active) return;
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "var(--background)";
                        el.style.color = `rgba(${rgb},0.5)`;
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      {/* Accent cap on the active folder, in that tab's hue — slides between tabs via shared layoutId */}
                      {active && (
                        <motion.span
                          layoutId="work-folder-accent"
                          aria-hidden="true"
                          className="absolute left-3 right-3 rounded-full"
                          style={{
                            top: "-1px",
                            height: "2px",
                            background: `rgb(${rgb})`,
                            boxShadow: `0 1px 8px rgba(${rgb},0.5)`,
                          }}
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab panel */}
            <div
              id={`tabpanel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="px-8 py-8"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: reduced ? 0.15 : 0.32, ease: EASE }}
                >
                  {tabContent(() => setPosterOpen(true), reduced)[activeTab]}
                </motion.div>
              </AnimatePresence>
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
              className="group absolute -top-4 -right-2 md:-right-4 z-10 flex items-center justify-center rounded-full transition-opacity duration-200"
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
              <HoverTip label="Close" className="top-full right-0 mt-2" />
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
