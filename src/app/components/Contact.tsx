import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

const EMAIL = "nedzzonexr@gmail.com";

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

export function Contact() {
  return (
    <section id="contact" className="relative grow px-6 pt-24 pb-32 md:pb-40" aria-label="Contact">
      {/* Bottom ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "min(500px, 80vw)",
          height: "300px",
          background: "radial-gradient(ellipse at bottom, rgba(177,161,209,0.07) 0%, transparent 70%)",
        }} />

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
              color: "var(--accent)",
            }}>
              Contact
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left — copy */}
          <FadeIn delay={0.1}>
            <div>
              {/* Georgia Bold headline, italic on last word */}
              <h2 style={{
                fontFamily: SERIF,
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)",
                lineHeight: 1.12,
                color: "var(--foreground)",
                letterSpacing: "-0.02em",
              }}>
                Let's think{" "}
                <em style={{ fontStyle: "italic", color: "var(--accent)" }}>together.</em>
              </h2>

              {/* Calibri Regular */}
              <p className="mt-7" style={{
                fontFamily: SANS,
                fontWeight: 400,
                fontSize: "1.45rem",
                lineHeight: 1.7,
                color: "var(--muted-foreground)",
              }}>
                Whether you're a clinician, researcher, investor, or someone living with a condition
                that doesn't have a good answer yet, I want to hear from you.
              </p>

              <div className="mt-10 space-y-5">
                {/* Email */}
                <div>
                  <p style={{
                    fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "var(--blue-deep)",
                  }}>
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    style={{
                      fontFamily: SANS, fontWeight: 400, fontSize: "1.25rem",
                      color: "var(--secondary)", textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--secondary)")}
                  >
                    {EMAIL}
                  </a>
                </div>

                {/* Based in */}
                <div>
                  <p style={{
                    fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "var(--blue-deep)",
                  }}>
                    Based in
                  </p>
                  <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "1.25rem", color: "var(--foreground)" }}>
                    Savannah, GA
                  </p>
                </div>

                {/* Open to */}
                <div>
                  <p style={{
                    fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "var(--blue-deep)",
                  }}>
                    Open to
                  </p>
                  <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "1.25rem", color: "var(--foreground)", lineHeight: 1.6 }}>
                    Research collaboration · Advising · Speaking
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right — CTA */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col justify-center h-full">
              <div
                className="p-8 rounded-2xl flex flex-col items-start gap-6"
                style={{
                  background: "rgba(177,161,209,0.05)",
                  border: "1px solid var(--border)",
                }}
              >
                <p style={{
                  fontFamily: SERIF,
                  fontWeight: 700,
                  fontSize: "1.7rem",
                  color: "var(--foreground)",
                  lineHeight: 1.4,
                }}>
                  Ready to connect? Send a direct email — I read everything and respond personally.
                </p>
                <p style={{
                  fontFamily: SANS,
                  fontWeight: 400,
                  fontSize: "1.45rem",
                  lineHeight: 1.7,
                  color: "var(--muted-foreground)",
                }}>
                  Clinician, researcher, investor, or someone looking for a better answer — reach out.
                  I'm especially interested in conversations around MS therapeutics, accessible
                  game design, and brain-computer interfaces.
                </p>

                {/* Send email button */}
                <a
                  href={`mailto:${EMAIL}`}
                  aria-label="Send email"
                  className="inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
                  {/* envelope icon */}
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M3 6.5l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
