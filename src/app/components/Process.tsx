import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import firstSignalUrl from "../../assets/About/phase-first-signal.jpg";
import theBuildUrl from "../../assets/About/phase-the-build.jpg";
import compassionateModeUrl from "../../assets/About/phase-compassionate-mode.jpg";
import alphariseLabsUrl from "../../assets/About/phase-alpharise-labs.jpg";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Small thumbnail that enlarges on hover (desktop) and toggles on tap (touch).
// It scales in place over a reserved box, so neighbouring rows don't shift.
function PhaseThumb({ src, alt, credit }: { src: string; alt: string; credit?: string }) {
  const [open, setOpen] = useState(false);   // tap toggle (touch)
  const [hover, setHover] = useState(false); // pointer hover (desktop)
  const big = open || hover;
  return (
    <div className="relative shrink-0 w-32" style={{ aspectRatio: "4 / 3" }}>
      <button
        type="button"
        aria-label={big ? "Shrink photo" : "Enlarge photo"}
        aria-expanded={big}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="absolute inset-0 overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        style={{
          padding: 0,
          background: "var(--card)",
          border: "1px solid var(--border)",
          transform: big ? "scale(2.1)" : "scale(1)",
          transformOrigin: "left center",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
          zIndex: big ? 30 : 0,
          boxShadow: big ? "0 24px 60px rgba(10,6,18,0.7)" : "none",
          cursor: open ? "zoom-out" : "zoom-in",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none"
          style={{ objectFit: "cover" }}
        />
        {credit && (
          <div
            className="absolute inset-x-0 bottom-0 px-2 pt-3 pb-1"
            style={{ background: "linear-gradient(to top, rgba(10,6,18,0.92), transparent)" }}
          >
            <span style={{
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: "0.55rem",
              letterSpacing: "0.03em",
              color: "rgba(228,223,242,0.92)",
              whiteSpace: "nowrap",
            }}>
              {credit}
            </span>
          </div>
        )}
      </button>
    </div>
  );
}

const timeline = [
  {
    title: "First signal",
    body:  "I streamed live brain data into a game engine for the first time on a single-channel EEG kit, and watched a digital world respond to a real mind. That moment was worth years of my life.",
    photo:  firstSignalUrl,
    credit: "Photo: Soroush Ahirad",
  },
  {
    title: "The build",
    body:  "Chose the hardware, worked through calibration and signal processing, learned the language of neuroscience, interviewed scientists and clinicians. I learned to treat every failure as information — a signal toward the next step.",
    photo:  theBuildUrl,
    credit: "Photo: Soroush Ahirad",
  },
  {
    title: "Compassionate Mode",
    body:  "Defined the rule the whole project rests on: never punish the symptom you are trying to heal.",
    photo:  compassionateModeUrl,
    credit: "Photo: SCAD",
  },
  {
    title: "AlphaRise Labs",
    body:  "Turned a thesis project into a real venture, with my faculty and committee actively encouraging the path from designer to founder.",
    photo:  alphariseLabsUrl,
    credit: "Photo: Mike Schalk",
    collab: true,
  },
  {
    title: "What's next",
    body:  "Building a custom, home-based brain-sensing device of my own design, so therapeutic tools keep getting more accessible, not less.",
  },
] as { title: string; body: string; photo?: string; credit?: string; collab?: boolean }[];

export function Process() {
  return (
    <section id="process" className="relative min-h-screen px-6 pt-24 pb-32 md:pb-40" aria-label="Process">
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
              color: "var(--blue-deep)",
            }}>
              Process
            </span>
          </div>
        </FadeIn>

        {/* Timeline — full width, larger process photos */}
        <FadeIn delay={0.1}>
          <ol className="relative" aria-label="Journey timeline">
            {timeline.map((item, i) => (
              <li key={item.title} className="relative pl-10 pb-11 last:pb-0">
                {i < timeline.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[5px] top-[22px] w-px"
                    style={{ height: "calc(100% - 6px)", background: "rgba(177,161,209,0.30)" }}
                  />
                )}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-[7px] w-[11px] h-[11px] rounded-full"
                  style={{
                    background: "var(--background)",
                    border: "1px solid var(--primary)",
                    boxShadow: "0 0 6px rgba(219,179,94,0.30)",
                  }}
                />
                {/* Small photo left of the text (stacked above on mobile); enlarges on hover/tap */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {item.photo && (
                    <PhaseThumb src={item.photo} alt={`${item.title} — process photo`} credit={item.credit} />
                  )}

                  <div className="min-w-0 sm:pt-0.5">
                    <p style={{
                      fontFamily: SERIF,
                      fontWeight: 700,
                      fontSize: "1.6rem",
                      color: "var(--primary)",
                      letterSpacing: "0.01em",
                    }}>
                      {item.title}
                    </p>
                    <p className="mt-2" style={{
                      fontFamily: SANS,
                      fontWeight: 400,
                      fontSize: "1.15rem",
                      lineHeight: 1.7,
                      color: "var(--muted-foreground)",
                      maxWidth: "44rem",
                    }}>
                      {item.body}
                    </p>
                    {item.collab && (
                      <p className="mt-2" style={{
                        fontFamily: SANS,
                        fontWeight: 400,
                        fontSize: "0.9rem",
                        letterSpacing: "0.02em",
                        color: "var(--text-faint)",
                      }}>
                        Game Art Collaborator:{" "}
                        <span style={{ color: "var(--secondary)" }}>Madeleine Schaefer</span>, BFA Game Development, SCAD
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>
      </div>
    </section>
  );
}
