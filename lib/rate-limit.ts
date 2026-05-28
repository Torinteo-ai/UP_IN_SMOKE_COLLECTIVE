type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export const applyBasicRateLimit = (
  key: string,
  windowMs: number,
  maxRequests: number,
): { allowed: boolean; retryAfterSec: number } => {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: Math.ceil(windowMs / 1000) };
  }

  if (current.count >= maxRequests) {
    return { allowed: false, retryAfterSec: Math.ceil((current.resetAt - now) / 1000) };
  }

  current.count += 1;
  store.set(key, current);

  return { allowed: true, retryAfterSec: Math.ceil((current.resetAt - now) / 1000) };
};
