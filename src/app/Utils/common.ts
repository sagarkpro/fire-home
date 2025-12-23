export function splitInHalf<T>(arr: T[]): [T[], T[]] {
  const mid = arr.length / 2;
  return [arr.slice(0, mid), arr.slice(mid)];
}