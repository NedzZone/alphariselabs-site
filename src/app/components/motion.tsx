import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, CSSProperties } from "react";

// Shared, slightly cinematic scroll-motion system.
// Every helper honours prefers-reduced-motion: when reduce is requested the
// movement / blur / scale fall back to a quick, simple opacity fade (no motion).

export const EASE = [0.22, 1, 0.36, 1] as const;
// No `once`: re-fire every time an element scrolls back into view.
const VIEWPORT = { margin: "-80px" } as const;

// Section / element entrance: rise + fade with a blur-to-sharp settle.
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2, delay } } }
    : {
        hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.62, ease: EASE, delay } },
      };
  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </motion.div>
  );
}

// Directional reveal for paired layouts; optional subtle scale (used for photos).
export function RevealSide({
  children,
  from = "left",
  scale = false,
  delay = 0,
  className,
}: {
  children: ReactNode;
  from?: "left" | "right";
  scale?: boolean;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const dx = from === "left" ? -44 : 44;
  const variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2, delay } } }
    : {
        hidden: { opacity: 0, x: dx, scale: scale ? 1.06 : 1 },
        show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.68, ease: EASE, delay } },
      };
  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </motion.div>
  );
}

// Subtle zoom-in entrance (used for hero titles).
export function RevealZoom({
  children,
  delay = 0,
  className,
  scaleFrom = 0.94,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  scaleFrom?: number;
}) {
  const reduced = useReducedMotion();
  const variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2, delay } } }
    : {
        hidden: { opacity: 0, scale: scaleFrom },
        show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE, delay } },
      };
  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </motion.div>
  );
}

// Stagger container — cascades its <StaggerItem> children as it scrolls in.
export function Stagger({
  children,
  className,
  gap = 0.12,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ol";
}) {
  const reduced = useReducedMotion();
  const variants = { hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : gap } } };
  const Comp = as === "ol" ? motion.ol : motion.div;
  return (
    <Comp className={className} variants={variants} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
      };
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp className={className} style={style} variants={variants}>
      {children}
    </Comp>
  );
}

export { motion, useReducedMotion };
