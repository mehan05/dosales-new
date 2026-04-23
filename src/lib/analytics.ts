/**
 * Analytics Utility
 * Handles event tracking via Google Tag Manager dataLayer.
 */

interface EventPayload {
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Pushes a custom event to the GTM dataLayer.
 * @param eventName - The name of the event to track (e.g., 'cta_click', 'form_submit')
 * @param payload - Additional context for the event
 */
export const trackEvent = (eventName: string, payload: EventPayload = {}) => {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  const eventData = {
    event: eventName,
    ...payload,
    timestamp: new Date().toISOString(),
  };

  // Log in development for debugging
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Tracking Event: ${eventName}`, eventData);
  }

  window.dataLayer.push(eventData);
};

/**
 * Common event trackers for quick access
 */
export const analytics = {
  trackCTA: (buttonId: string, location: string, text: string) => {
    trackEvent('cta_click', {
      element_id: buttonId,
      element_location: location,
      element_text: text,
    });
  },
  
  trackFormSubmit: (formId: string, status: 'success' | 'error') => {
    trackEvent('form_submit', {
      form_id: formId,
      submission_status: status,
    });
  },
  
  trackPageView: (path: string) => {
    trackEvent('page_view', {
      page_path: path,
    });
  }
};
