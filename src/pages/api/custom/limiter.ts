// pages/api/custom/limiter.ts
const requests: Record<string, number[]> = {};

export default function isAllowed(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (!requests[ip]) requests[ip] = [];

  // Remove old requests outside the window
  requests[ip] = requests[ip].filter(timestamp => now - timestamp < windowMs);

  if (requests[ip].length >= limit) {
    return false;
  }

  requests[ip].push(now);
  return true;
}
