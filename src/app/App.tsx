{/* MARKER-MAKE-KIT-INVOKED */}
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Portfolio } from "./components/Portfolio";
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
        <About />
        <Portfolio />
        <Contact />
      </main>
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
  );
}
