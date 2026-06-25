import { FadeIn, RevealSide } from "./motion";
import storyHeroUrl from "../../assets/Story/story-hero.jpg";

const PIXEL = "'Upheaval TT BRK', 'Press Start 2P', monospace";
const SERIF = "'Georgia', 'Times New Roman', serif";
const SANS  = "'Calibri', 'Lato', 'Gill Sans', sans-serif";

export function Story() {
  return (
    <section id="story" className="relative min-h-screen px-6 pt-24 pb-20 md:pb-24" aria-label="Story">
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

        {/* Hero image — enters from the left with a subtle scale settle */}
        <RevealSide from="left" scale delay={0.05} className="w-fit mx-auto">
          <div
            className="relative w-fit mx-auto overflow-hidden rounded-2xl mb-10"
            style={{ border: "1px solid var(--border)" }}
          >
            <img
              src={storyHeroUrl}
              alt="Ned Shoaei delivering the keynote at Hack iX 2025"
              className="block"
              style={{
                maxHeight: "clamp(220px, 40vh, 380px)",
                width: "auto",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
            {/* Caption overlay — descriptive line over a dimmer credit */}
            <div
              className="absolute inset-x-0 bottom-0 z-10 px-4 pt-12 pb-3"
              style={{ background: "linear-gradient(to top, rgba(10,6,18,0.92) 12%, rgba(10,6,18,0.55) 48%, transparent)" }}
            >
              <p style={{
                fontFamily: SANS,
                fontWeight: 400,
                fontSize: "0.9rem",
                lineHeight: 1.35,
                color: "rgba(228,223,242,0.96)",
              }}>
                Keynote speaker at Hack iX 2025, SCAD's inaugural hackathon
              </p>
              <p className="mt-0.5" style={{
                fontFamily: SANS,
                fontWeight: 300,
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(228,223,242,0.55)",
              }}>
                Photo: SCAD
              </p>
            </div>
          </div>
        </RevealSide>

        {/* Intro band — enters from the right, opposite the photo */}
        <RevealSide from="right" delay={0.1}>
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
        </RevealSide>
      </div>
    </section>
  );
}
