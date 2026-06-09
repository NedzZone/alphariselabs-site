import { useEffect, useRef, useState } from "react";

const WAVE_HEIGHT  = 576;
const CANVAS_WIDTH = 144;
const cx = CANVAS_WIDTH / 2; // 72

// Three-stop interpolation: #712699 → #87b8cb → #dbb35e
function lerpColor(t: number): string {
  let r: number, g: number, b: number;
  if (t <= 0.5) {
    const s = t / 0.5;
    r = Math.round(113 + (135 - 113) * s);
    g = Math.round(38  + (184 -  38) * s);
    b = Math.round(153 + (203 - 153) * s);
  } else {
    const s = (t - 0.5) / 0.5;
    r = Math.round(135 + (219 - 135) * s);
    g = Math.round(184 + (179 - 184) * s);
    b = Math.round(203 + ( 94 - 203) * s);
  }
  return `rgb(${r},${g},${b})`;
}

// Build the list of [x, y] control points — shared by path builder and knob tracker
function buildPoints(amplitude: number): [number, number][] {
  return [
    [cx, 0],
    [cx, 44],
    [cx + 4, 51],
    [cx - 4, 57],
    [cx, 65],
    [cx, 93],
    // alpha burst
    [cx + 6  * amplitude, 108],
    [cx - 10 * amplitude, 123],
    [cx + 14 * amplitude, 137],
    [cx - 6  * amplitude, 152],
    [cx + 3  * amplitude, 162],
    [cx, 173],
    [cx, 206],
    // big spike (QRS-style)
    [cx + 4  * amplitude, 213],
    [cx - 4  * amplitude, 221],
    [cx + 18 * amplitude, 231],
    [cx - 16 * amplitude, 245],
    [cx + 6  * amplitude, 255],
    [cx, 267],
    [cx, 299],
    // theta ripple
    [cx + 5  * amplitude, 309],
    [cx - 5  * amplitude, 321],
    [cx + 5  * amplitude, 332],
    [cx - 5  * amplitude, 342],
    [cx + 3  * amplitude, 353],
    [cx, 360],
    [cx, 396],
    // small blip
    [cx + 8  * amplitude, 407],
    [cx - 4  * amplitude, 414],
    [cx + 4  * amplitude, 422],
    [cx, 429],
    [cx, 468],
    // slow wave
    [cx + 10 * amplitude, 489],
    [cx - 6  * amplitude, 512],
    [cx + 4  * amplitude, 533],
    [cx, 555],
    [cx, WAVE_HEIGHT],
  ];
}

function buildWavePath(pts: [number, number][]): string {
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y}`).join(" ");
}

// Linear interpolation along the piecewise path to find x at a given y
function getXAtY(pts: [number, number][], y: number): number {
  if (y <= pts[0][1]) return pts[0][0];
  if (y >= pts[pts.length - 1][1]) return pts[pts.length - 1][0];
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    if (y <= y1) {
      const t = (y - y0) / (y1 - y0);
      return x0 + (x1 - x0) * t;
    }
  }
  return pts[pts.length - 1][0];
}

export function ScrollBrainwave() {
  const [scrollPct, setScrollPct] = useState(0);
  const [amplitude, setAmplitude] = useState(1);
  const velRef   = useRef(0);
  const lastYRef = useRef(0);
  const decayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(maxScroll > 0 ? scrollTop / maxScroll : 0);
      const dy = Math.abs(scrollTop - lastYRef.current);
      lastYRef.current = scrollTop;
      velRef.current = Math.min(dy / 8, 1.6);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    decayRef.current = setInterval(() => {
      setAmplitude((prev) => {
        const target = 1 + velRef.current;
        velRef.current = Math.max(0, velRef.current - 0.08);
        return prev + (target - prev) * 0.18;
      });
    }, 16);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (decayRef.current) clearInterval(decayRef.current);
    };
  }, []);

  const pts       = buildPoints(amplitude);
  const wavePath  = buildWavePath(pts);
  const scanY     = scrollPct * WAVE_HEIGHT;
  // Knob tracks the exact x position on the wave line at the current y
  const knobX     = getXAtY(pts, scanY);
  const knobColor = lerpColor(scrollPct);
  const scale     = 1 + scrollPct * 0.2;

  return (
    <div
      aria-hidden="true"
      className="fixed right-4 top-1/2 z-40 pointer-events-none hidden md:block"
      style={{
        opacity: 0.82,
        width: CANVAS_WIDTH,
        transform: `translateY(-50%) scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <svg
        width={CANVAS_WIDTH}
        height={WAVE_HEIGHT}
        viewBox={`0 0 ${CANVAS_WIDTH} ${WAVE_HEIGHT}`}
        style={{ overflow: "visible" }}
        role="presentation"
      >
        <defs>
          <linearGradient
            id="sbw-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0"
            x2="0" y2={WAVE_HEIGHT}
          >
            <stop offset="0%"   stopColor="#712699" />
            <stop offset="50%"  stopColor="#87b8cb" />
            <stop offset="100%" stopColor="#dbb35e" />
          </linearGradient>

          <clipPath id="sbw-above">
            <rect x={0} y={0} width={CANVAS_WIDTH} height={scanY} />
          </clipPath>
          <clipPath id="sbw-below">
            <rect x={0} y={scanY} width={CANVAS_WIDTH} height={WAVE_HEIGHT - scanY} />
          </clipPath>

          <filter id="sbw-glow" x="-80%" y="-10%" width="260%" height="120%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="sbw-knob-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feFlood floodColor={knobColor} floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="SourceGraphic" operator="in" result="tinted" />
            <feGaussianBlur in="tinted" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dim unvisited portion */}
        <g clipPath="url(#sbw-below)">
          <path d={wavePath} fill="none" stroke="rgba(177,161,209,0.18)"
            strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Lit visited portion */}
        <g clipPath="url(#sbw-above)" filter="url(#sbw-glow)">
          <path d={wavePath} fill="none" stroke="url(#sbw-gradient)"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Knob — positioned on the wave line */}
        <circle cx={knobX} cy={scanY} r={4.2}
          fill={knobColor} filter="url(#sbw-knob-glow)" opacity={0.95} />
        <circle cx={knobX} cy={scanY} r={7.5}
          fill="none" stroke={knobColor} strokeWidth="0.8" opacity={0.3} />
      </svg>
    </div>
  );
}
