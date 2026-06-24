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

export function Story() {
  return (
    <section id="story" className="relative min-h-screen px-6 pt-24 pb-32 md:pb-40" aria-label="Story">
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
              color: "var(--secondary)",
            }}>
              Story
            </span>
          </div>
        </FadeIn>

        {/* Intro band — headline + bio, left-aligned and width-constrained for readability */}
        <FadeIn delay={0.1}>
          <div className="max-w-3xl">
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
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
