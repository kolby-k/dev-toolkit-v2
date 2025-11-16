// add 360 to prevent negative values
export function wrap360(v: number) {
  return (v + 360) % 360;
}
