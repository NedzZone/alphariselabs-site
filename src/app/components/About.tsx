import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

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

const timeline = [
  {
    title: "First signal",
    body:  "I streamed live brain data into a game engine for the first time on a single-channel EEG kit, and watched a digital world respond to a real mind. That moment was worth years of my life.",
  },
  {
    title: "The build",
    body:  "Chose the hardware, worked through calibration and signal processing, learned the language of neuroscience, interviewed scientists and clinicians. I learned to treat every failure as information — a signal toward the next step.",
  },
  {
    title: "Compassionate Mode",
    body:  "Defined the rule the whole project rests on: never punish the symptom you are trying to heal.",
  },
  {
    title: "AlphaRise Labs",
    body:  "Turned a thesis project into a real venture, with my faculty and committee actively encouraging the path from designer to founder.",
  },
  {
    title: "What's next",
    body:  "Building a custom, home-based brain-sensing device of my own design, so therapeutic tools keep getting more accessible, not less.",
  },
];

const pills = [
  { label: "Cedars-Sinai vMed26",         color: "#dbb35e" }, // gold
  { label: "AWE USA 2026 Research Track",  color: "#87b8cb" }, // mist blue
  { label: "Entelechy 2026, 1st Place",    color: "#b1a1d1" }, // lilac
  { label: "AbleGamers APX Certified",     color: "#5b82a0" }, // deep blue
];

export function About() {
  return (
    <section id="about" className="relative min-h-screen px-6 pt-24 pb-32 md:pb-40" aria-label="About">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <FadeIn>
          <div className="flex items-center gap-5 mb-16">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            {/* Label — Calibri Light, 10% letter-spacing */}
            <span style={{
              fontFamily: PIXEL,
              fontWeight: 300,
              fontSize: "2.34rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--secondary)",
            }}>
              About
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24">

          {/* Left — headline + bio */}
          <FadeIn delay={0.1} className="h-full">
            <div className="h-full flex flex-col">
              {/* Georgia Bold headline, italic on last phrase */}
              <h2 style={{
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)",
                lineHeight: 1.12,
                color: "var(--foreground)",
                letterSpacing: "-0.02em",
              }}>
                Designing technology that adapts to people,{" "}
                <em style={{ fontStyle: "italic", color: "var(--secondary)" }}>
                  not the other way around.
                </em>
              </h2>

              {/* Calibri Regular paragraphs */}
              <p className="mt-8" style={{
                fontFamily: SANS,
                fontWeight: 400,
                fontSize: "1.15rem",
                lineHeight: 1.8,
                color: "var(--muted-foreground)",
              }}>
                I build therapeutic games for symptoms that are felt but rarely seen. I live with
                multiple sclerosis, and AlphaRise comes from that lived experience: the long therapy
                sessions, the days fatigue takes the decision out of your hands, the wish for
                something that feels less like a chore and more like relief.
              </p>
              <p className="mt-5" style={{
                fontFamily: SANS,
                fontWeight: 400,
                fontSize: "1.15rem",
                lineHeight: 1.8,
                color: "var(--muted-foreground)",
              }}>
                My work sits at the intersection of neurofeedback, adaptive game design, and
                accessibility. The goal is never the technology. The goal is a person getting a
                steadier day back.
              </p>

              {/* Credential pills */}
              <div className="mt-auto pt-12 grid grid-cols-2 gap-3">
                {pills.map((tag) => (
                  <span
                    key={tag.label}
                    className="px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2"
                    style={{
                      fontFamily: SANS,
                      fontWeight: 300,
                      fontSize: "0.95rem",
                      letterSpacing: "0.04em",
                      background: `${tag.color}14`,
                      border: `1px solid ${tag.color}55`,
                      color: tag.color,
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — timeline */}
          <FadeIn delay={0.2} className="h-full">
            <ol className="relative h-full flex flex-col" aria-label="Journey timeline">
              {timeline.map((item, i) => (
                <li key={item.title} className="relative pl-10 pb-10 last:pb-0 grow last:grow-0">
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
                  <p style={{
                    fontFamily: SERIF,
                    fontWeight: 700,
                    fontSize: "1.5rem",
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
                  }}>
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
