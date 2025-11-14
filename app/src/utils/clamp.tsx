export function clamp255(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)));
}
