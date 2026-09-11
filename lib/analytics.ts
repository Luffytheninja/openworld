// Lightweight, privacy-first client analytics & conversion tracking for OPN WRLD

export type AnalyticsEventType =
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'checkout_view'
  | 'whatsapp_preorder_click'
  | 'search_performed';

export interface AnalyticsEvent {
  event: AnalyticsEventType;
  timestamp: string;
  path: string;
  sessionId: string;
  data?: Record<string, any>;
}

const STORAGE_KEY = 'opn_analytics_events';
const SESSION_KEY = 'opn_analytics_session_id';
const STATS_KEY = 'opn_analytics_stats';

// Get or generate a persistent session ID for the current visitor
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'opn_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function trackEvent(event: AnalyticsEventType, data?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  try {
    const payload: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      sessionId: getSessionId(),
      data,
    };

    // Store raw event log (capped at latest 100 events)
    const existingEvents: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existingEvents.push(payload);
    if (existingEvents.length > 100) existingEvents.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingEvents));

    // Update aggregated visitor & conversion stats
    const stats = JSON.parse(
      localStorage.getItem(STATS_KEY) ||
        JSON.stringify({
          totalPageViews: 0,
          uniqueVisitors: 0,
          productViews: 0,
          addToCartCount: 0,
          checkoutVisits: 0,
          whatsappPreorders: 0,
        })
    );

    if (event === 'page_view') stats.totalPageViews += 1;
    if (event === 'product_view') stats.productViews += 1;
    if (event === 'add_to_cart') stats.addToCartCount += 1;
    if (event === 'checkout_view') stats.checkoutVisits += 1;
    if (event === 'whatsapp_preorder_click') stats.whatsappPreorders += 1;

    localStorage.setItem(STATS_KEY, JSON.stringify(stats));

    // Console debugging in dev mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`[OPN Analytics] 📊 ${event}`, data || '');
    }
  } catch (err) {
    console.error('Analytics tracking error:', err);
  }
}

export function getAnalyticsStats() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
  } catch {
    return null;
  }
}
