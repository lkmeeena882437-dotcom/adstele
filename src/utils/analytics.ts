// ============================================================
// ANALYTICS ARCHITECTURE
// Prepared for future integration with Google Analytics,
// Meta Pixel, or custom analytics backends.
// Uses environment variables for credentials.
// ============================================================

export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  // Future: Send to analytics provider using env vars
  // e.g., VITE_GA_ID, VITE_META_PIXEL
  if (typeof window !== 'undefined') {
    try {
      console.log(`[Analytics] ${eventName}`, params);
    } catch {
      // silently fail
    }
  }
}
