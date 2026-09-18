/** Pure scroll-position timelines: no timers, accumulated state or scroll interception. */
export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}
export function smoothRange(start: number, end: number, value: number): number {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}
export function sceneProgress(top: number, height: number, viewport: number): number {
  return clamp(-top / Math.max(1, height - viewport));
}
export function heroTimeline(progress: number) {
  return {
    frame: smoothRange(.06, .8, progress),
    logo: 1 - smoothRange(.06, .3, progress),
    offer: smoothRange(.34, .66, progress),
    menu: smoothRange(.2, .46, progress),
  };
}
export function finaleTimeline(progress: number) {
  return {
    expansion: smoothRange(0, .67, progress),
    opening: 1 - smoothRange(.2, .44, progress),
    invitation: smoothRange(.42, .72, progress),
  };
}
/** Crossfade only around the midpoint between neighbouring paragraphs. */
export function guestTimeline(centers: number[], viewportCenter: number) {
  if (!centers.length) return { opacities: [], active: 0 };
  const last = centers.length - 1;
  let continuousIndex = 0;
  if (viewportCenter >= centers[last]) continuousIndex = last;
  else for (let i = 0; i < last; i++) {
    if (viewportCenter >= centers[i] && viewportCenter < centers[i + 1]) {
      continuousIndex = i + (viewportCenter - centers[i]) / Math.max(1, centers[i + 1] - centers[i]);
      break;
    }
  }
  const lower = Math.floor(continuousIndex);
  const crossfade = smoothRange(.34, .66, continuousIndex - lower);
  const opacities = centers.map((_, i) => i === lower ? 1 - crossfade : i === lower + 1 ? crossfade : 0);
  return { opacities, active: Math.min(last, lower + (crossfade >= .5 ? 1 : 0)) };
}
