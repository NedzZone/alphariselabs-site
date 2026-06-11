{/* MARKER-MAKE-KIT-INVOKED */}
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Portfolio } from "./components/Portfolio";
import { Studio } from "./components/Studio";
import { Contact } from "./components/Contact";
import { ScrollBrainwave } from "./components/ScrollBrainwave";
import { UiSound } from "./components/UiSound";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav />
      <ScrollBrainwave />
      <UiSound />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Studio />
        {/* Contact + footer share the final viewport, footer pinned to the bottom */}
        <div className="flex min-h-screen flex-col">
          <Contact />
          <footer
            className="px-6 py-10 text-center"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 300,
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                color: "var(--muted-foreground)",
              }}
            >
              © 2026 Ned Shoaei · AlphaRise Labs · USA
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
