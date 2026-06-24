{/* MARKER-MAKE-KIT-INVOKED */}
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Process } from "./components/Process";
import { Portfolio } from "./components/Portfolio";
// import { Studio } from "./components/Studio"; // "In My Studio" — hidden for now; keep to restore later
import { Contact } from "./components/Contact";
import { ScrollBrainwave } from "./components/ScrollBrainwave";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Nav />
      <ScrollBrainwave />
      <main>
        <Hero />
        <Story />
        <Process />
        <Portfolio />
        {/* "In My Studio" section hidden for now to keep the page focused on AlphaRise.
            Component file (./components/Studio) is preserved — re-add <Studio /> here and
            uncomment its import above to bring it back. */}
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
