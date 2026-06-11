import { useEffect } from "react";

/**
 * Plays a short audio cue when the pointer moves onto — or the keyboard
 * focuses — any button or link. An accessibility aid (non-visual cue for
 * interactive elements). Synthesized via Web Audio, so no asset to load.
 *
 * Note: browser autoplay policy keeps the AudioContext suspended until the
 * first real user gesture (click / key / tap), so the very first cues before
 * any interaction may be silent — by design.
 */
const SELECTOR = 'a[href], button, [role="button"], [role="tab"]';

export function UiSound() {
  useEffect(() => {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    let ctx: AudioContext | null = null;
    let last: Element | null = null;

    const ensure = () => {
      if (!ctx) ctx = new AudioCtx();
      if (ctx.state === "suspended") void ctx.resume();
      return ctx;
    };

    const click = () => {
      const c = ensure();
      if (!c || c.state !== "running") return;
      const t = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(680, t);
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.05);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.05, t + 0.004); // soft, low volume
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
      osc.connect(gain).connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    };

    const onOver = (e: Event) => {
      const el = (e.target as Element)?.closest?.(SELECTOR) ?? null;
      if (el && el !== last) {
        last = el;
        click();
      } else if (!el) {
        last = null;
      }
    };

    const onFocus = (e: Event) => {
      const el = (e.target as Element)?.closest?.(SELECTOR) ?? null;
      if (el) click();
    };

    const resume = () => {
      if (ctx && ctx.state === "suspended") void ctx.resume();
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("pointerdown", resume);
    window.addEventListener("keydown", resume);

    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
      void ctx?.close();
    };
  }, []);

  return null;
}
