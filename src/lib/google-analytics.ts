/**
 * Configuration Google Analytics 4 Data API
 * Pour récupérer les métriques de trafic dans le dashboard admin
 * 
 * Setup:
 * 1. Créer un Service Account dans Google Cloud Console
 * 2. Activer l'API Google Analytics Data API
 * 3. Ajouter le Service Account en tant que "Viewer" dans GA4
 * 4. Définir les variables d'environnement :
 *    - GA4_PROPERTY_ID
 *    - GA4_CLIENT_EMAIL
 *    - GA4_PRIVATE_KEY
 */

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA4_PROPERTY_ID;

let analyticsDataClient: BetaAnalyticsDataClient | null = null;

// Initialiser le client seulement si les credentials sont disponibles
if (
  propertyId &&
  process.env.GA4_CLIENT_EMAIL &&
  process.env.GA4_PRIVATE_KEY
) {
  try {
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA4_CLIENT_EMAIL,
        private_key: process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
    });
  } catch (error) {
    console.error("Failed to initialize GA4 client:", error);
  }
}

export type TrafficMetrics = {
  date: string;
  activeUsers: number;
  sessions: number;
  pageViews: number;
};

/**
 * Récupère les métriques de trafic pour une période donnée
 */
export async function getTrafficMetrics(
  startDate: string = "30daysAgo",
  endDate: string = "today"
): Promise<TrafficMetrics[]> {
  if (!analyticsDataClient || !propertyId) {
    console.warn("GA4 API not configured, returning empty data");
    return [];
  }

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
      ],
    });

    if (!response.rows) return [];

    return response.rows.map((row) => ({
      date: row.dimensionValues?.[0]?.value || "",
      activeUsers: parseInt(row.metricValues?.[0]?.value || "0"),
      sessions: parseInt(row.metricValues?.[1]?.value || "0"),
      pageViews: parseInt(row.metricValues?.[2]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA4 API error:", error);
    return [];
  }
}

export type FunnelStep = {
  eventName: string;
  eventCount: number;
};

/**
 * Récupère les données du funnel de conversion
 */
export async function getFunnelData(): Promise<FunnelStep[]> {
  if (!analyticsDataClient || !propertyId) {
    console.warn("GA4 API not configured, returning empty data");
    return [];
  }

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: {
            values: ["page_view", "cta_click", "form_submit", "lead_created"],
          },
        },
      },
    });

    if (!response.rows) return [];

    return response.rows.map((row) => ({
      eventName: row.dimensionValues?.[0]?.value || "",
      eventCount: parseInt(row.metricValues?.[0]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA4 funnel API error:", error);
    return [];
  }
}

export type TopPage = {
  pagePath: string;
  pageViews: number;
};

/**
 * Récupère les pages les plus vues
 */
export async function getTopPages(limit: number = 10): Promise<TopPage[]> {
  if (!analyticsDataClient || !propertyId) {
    return [];
  }

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit,
    });

    if (!response.rows) return [];

    return response.rows.map((row) => ({
      pagePath: row.dimensionValues?.[0]?.value || "",
      pageViews: parseInt(row.metricValues?.[0]?.value || "0"),
    }));
  } catch (error) {
    console.error("GA4 top pages API error:", error);
    return [];
  }
}

/**
 * Vérifie si GA4 est configuré
 */
export function isGA4Configured(): boolean {
  return !!(propertyId && process.env.GA4_CLIENT_EMAIL && process.env.GA4_PRIVATE_KEY);
}
