import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Linkedin } from "lucide-react";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

const EMAIL = "nedshoaei@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/nedshoaei/";

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
                Let's exchange{" "}
                <em style={{ fontStyle: "italic", color: "var(--accent)" }}>brainwaves</em>
              </h2>

              {/* Two brainwaves connecting — fills the line */}
              <svg className="mt-5 w-full" viewBox="0 0 480 40" fill="none" aria-hidden="true">
                <polyline points="0,20 70,20 86,8 100,34 114,12 128,30 142,18 168,20 240,20"
                  stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
                <polyline points="240,20 312,20 338,18 352,30 366,12 380,34 394,8 410,20 480,20"
                  stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
                <circle cx="240" cy="20" r="7" stroke="var(--primary)" strokeWidth="1.2" opacity="0.5" />
                <circle cx="240" cy="20" r="4" fill="var(--primary)" />
              </svg>

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

                {/* Connect — social icons */}
                <div>
                  <p style={{
                    fontFamily: SANS, fontWeight: 300, fontSize: "0.9rem",
                    letterSpacing: "0.10em", textTransform: "uppercase",
                    color: "var(--blue-deep)",
                  }}>
                    Connect
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <a
                      href={LINKEDIN}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Connect on LinkedIn"
                      title="Connect on LinkedIn"
                      className="group relative inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        width: "3rem",
                        height: "3rem",
                        background: "rgba(177,161,209,0.06)",
                        border: "1px solid var(--border)",
                        color: "var(--secondary)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "var(--foreground)";
                        el.style.borderColor = "var(--secondary)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "var(--secondary)";
                        el.style.borderColor = "var(--border)";
                      }}
                    >
                      <Linkedin size={22} strokeWidth={1.8} aria-hidden="true" />
                      <HoverTip label="Connect on LinkedIn" className="bottom-full left-1/2 -translate-x-1/2 mb-2" />
                    </a>
                  </div>
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
                  title="Email me"
                  className="group relative inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
                  <HoverTip label="Email me" className="bottom-full left-1/2 -translate-x-1/2 mb-2" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
