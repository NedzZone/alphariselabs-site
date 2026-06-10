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
    <section id="contact" className="relative px-6 py-32 md:py-40" aria-label="Contact">
      {/* Dividers */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(135,184,203,0.18), transparent)" }} />
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
            <span style={{ fontFamily: PIXEL, fontSize: "2.8rem", color: "var(--primary)" }}>
              04
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
                fontSize: "1.15rem",
                lineHeight: 1.8,
                color: "var(--muted-foreground)",
              }}>
                Whether you're a clinician, researcher, investor, or someone living with a condition
                that doesn't have a good answer yet, I want to hear from you.
              </p>

              <div className="mt-10 space-y-5">
                {/* Email */}
                <div>
                  <p style={{
                    fontFamily: SANS, fontWeight: 300, fontSize: "0.68rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                  }}>
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    style={{
                      fontFamily: SANS, fontWeight: 400, fontSize: "0.95rem",
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
                    fontFamily: SANS, fontWeight: 300, fontSize: "0.68rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                  }}>
                    Based in
                  </p>
                  <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "0.95rem", color: "var(--foreground)" }}>
                    USA
                  </p>
                </div>

                {/* Open to */}
                <div>
                  <p style={{
                    fontFamily: SANS, fontWeight: 300, fontSize: "0.68rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                  }}>
                    Open to
                  </p>
                  <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: "0.95rem", color: "var(--foreground)", lineHeight: 1.6 }}>
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
                  fontSize: "1.15rem",
                  color: "var(--foreground)",
                  lineHeight: 1.45,
                }}>
                  Ready to connect? Send a direct email — I read everything and respond personally.
                </p>
                <p style={{
                  fontFamily: SANS,
                  fontWeight: 400,
                  fontSize: "0.9rem",
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
                  Send email
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
