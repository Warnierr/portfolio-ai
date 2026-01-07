// Système d'events personnalisés pour Google Analytics 4

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export type AnalyticsEvent =
  | "cta_click"
  | "download_pdf"
  | "chat_message_sent"
  | "chat_session_start"
  | "contact_form_submit"
  | "article_view"
  | "project_view"
  | "external_link_click";

export interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

/**
 * Envoie un event personnalisé à Google Analytics 4
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  params?: EventParams
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: params?.category || "engagement",
      event_label: params?.label || "",
      value: params?.value || 0,
      ...params,
    });
  }

  // Log en développement
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 Analytics Event: ${eventName}`, params);
  }
}

/**
 * Track un clic sur un CTA
 */
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent("cta_click", {
    category: "conversion",
    label: ctaName,
    cta_location: location,
  });
}

/**
 * Track un téléchargement de PDF
 */
export function trackDownload(fileName: string, fileType: string): void {
  trackEvent("download_pdf", {
    category: "engagement",
    label: fileName,
    file_type: fileType,
  });
}

/**
 * Track un message chat
 */
export function trackChatMessage(messageLength: number, sessionId: string): void {
  trackEvent("chat_message_sent", {
    category: "chat",
    value: messageLength,
    session_id: sessionId,
  });
}

/**
 * Track le début d'une session chat
 */
export function trackChatSessionStart(): void {
  trackEvent("chat_session_start", {
    category: "chat",
  });
}

/**
 * Track une soumission de formulaire de contact
 */
export function trackContactFormSubmit(formType: string): void {
  trackEvent("contact_form_submit", {
    category: "conversion",
    label: formType,
  });
}

/**
 * Track la vue d'un article
 */
export function trackArticleView(articleTitle: string, category: string): void {
  trackEvent("article_view", {
    category: "content",
    label: articleTitle,
    article_category: category,
  });
}

/**
 * Track la vue d'un projet
 */
export function trackProjectView(projectName: string): void {
  trackEvent("project_view", {
    category: "content",
    label: projectName,
  });
}

/**
 * Track un clic sur un lien externe
 */
export function trackExternalLinkClick(url: string, linkText: string): void {
  trackEvent("external_link_click", {
    category: "outbound",
    label: linkText,
    destination_url: url,
  });
}

/**
 * Track une page vue
 */
export function trackPageView(url: string, title: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: title,
      page_location: url,
      page_path: new URL(url).pathname,
    });
  }
}
