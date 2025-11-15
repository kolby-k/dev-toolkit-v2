export function clamp255(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)));
}

export function clamp100(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function clamp100p(value: number) {
  return Math.min(1, Math.max(0, value));
}
