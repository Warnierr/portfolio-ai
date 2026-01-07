import { NextResponse } from "next/server";

/**
 * API REST pour l'AI Act Auditor
 * 
 * POST /api/ai-act-audit
 * Body: { answers: Record<string, unknown>, companyName: string, systemName: string }
 * 
 * Returns: { riskLevel, score, recommendations, timestamp }
 */

type AuditRequest = {
  companyName: string;
  systemName: string;
  answers: {
    purpose?: string;
    hasHumanSupervision?: boolean;
    affectsRights?: boolean;
    usesPersonalData?: boolean;
    hasTransparency?: boolean;
    hasBiasTests?: boolean;
    hasDocumentation?: boolean;
  };
};

type RiskLevel = "minimal" | "limited" | "high" | "unacceptable";

function calculateRiskLevel(answers: AuditRequest["answers"]): RiskLevel {
  const {
    purpose,
    hasHumanSupervision,
    affectsRights,
    usesPersonalData,
    hasTransparency,
  } = answers;

  // Risque inacceptable
  if (purpose?.includes("social scoring") || purpose?.includes("manipulation")) {
    return "unacceptable";
  }

  // Risque élevé
  if (
    affectsRights ||
    (usesPersonalData && !hasHumanSupervision) ||
    purpose?.includes("recrutement") ||
    purpose?.includes("crédit")
  ) {
    return "high";
  }

  // Risque limité
  if (!hasTransparency || purpose?.includes("chatbot")) {
    return "limited";
  }

  // Risque minimal
  return "minimal";
}

function calculateScore(answers: AuditRequest["answers"]): number {
  let score = 100;

  if (!answers.hasHumanSupervision) score -= 20;
  if (!answers.hasTransparency) score -= 15;
  if (!answers.hasBiasTests) score -= 20;
  if (!answers.hasDocumentation) score -= 25;
  if (answers.affectsRights && !answers.hasHumanSupervision) score -= 20;

  return Math.max(0, score);
}

function generateRecommendations(
  riskLevel: RiskLevel,
  answers: AuditRequest["answers"]
): string[] {
  const recommendations: string[] = [];

  if (riskLevel === "unacceptable") {
    recommendations.push(
      "⚠️ URGENT : Votre système est interdit par l'AI Act. Arrêtez son utilisation immédiatement."
    );
    recommendations.push("Consultez un juriste spécialisé en droit européen de l'IA.");
    return recommendations;
  }

  if (riskLevel === "high") {
    recommendations.push(
      "Mettre en place une supervision humaine obligatoire pour toutes les décisions."
    );
    recommendations.push(
      "Documenter l'architecture technique complète (model card, données d'entraînement)."
    );
    recommendations.push(
      "Effectuer des tests de robustesse et d'équité (fairness metrics)."
    );
    recommendations.push(
      "Implémenter un système de traçabilité des décisions (logs + audit trail)."
    );
  }

  if (!answers.hasTransparency) {
    recommendations.push(
      "Ajouter un disclaimer visible : 'Vous interagissez avec une IA'."
    );
  }

  if (!answers.hasBiasTests) {
    recommendations.push(
      "Tester les biais démographiques (genre, âge, origine) avec Fairlearn ou AIF360."
    );
  }

  if (!answers.hasDocumentation) {
    recommendations.push(
      "Créer une documentation technique complète (model card, limitations, risques)."
    );
  }

  if (answers.usesPersonalData) {
    recommendations.push(
      "Vérifier la conformité RGPD (consentement, droit à l'oubli, minimisation)."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push("✅ Votre système semble conforme. Continuez le monitoring.");
  }

  return recommendations;
}

export async function POST(req: Request) {
  try {
    const body: AuditRequest = await req.json();

    if (!body.companyName || !body.systemName || !body.answers) {
      return NextResponse.json(
        { error: "Missing required fields: companyName, systemName, answers" },
        { status: 400 }
      );
    }

    const riskLevel = calculateRiskLevel(body.answers);
    const score = calculateScore(body.answers);
    const recommendations = generateRecommendations(riskLevel, body.answers);

    const result = {
      timestamp: new Date().toISOString(),
      companyName: body.companyName,
      systemName: body.systemName,
      riskLevel,
      score,
      recommendations,
      answers: body.answers,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'audit AI Act:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai-act-audit
 * Returns API documentation
 */
export async function GET() {
  return NextResponse.json({
    name: "AI Act Auditor API",
    version: "1.0.0",
    description: "API REST pour auditer la conformité AI Act d'un système d'IA",
    endpoints: {
      POST: {
        path: "/api/ai-act-audit",
        description: "Effectuer un audit AI Act",
        body: {
          companyName: "string (required)",
          systemName: "string (required)",
          answers: {
            purpose: "string (optional)",
            hasHumanSupervision: "boolean (optional)",
            affectsRights: "boolean (optional)",
            usesPersonalData: "boolean (optional)",
            hasTransparency: "boolean (optional)",
            hasBiasTests: "boolean (optional)",
            hasDocumentation: "boolean (optional)",
          },
        },
        response: {
          timestamp: "string (ISO 8601)",
          companyName: "string",
          systemName: "string",
          riskLevel: "minimal | limited | high | unacceptable",
          score: "number (0-100)",
          recommendations: "string[]",
          answers: "object",
        },
      },
    },
    example: {
      request: {
        companyName: "Acme Corp",
        systemName: "Credit Risk Classifier",
        answers: {
          purpose: "crédit",
          hasHumanSupervision: true,
          affectsRights: true,
          usesPersonalData: true,
          hasTransparency: true,
          hasBiasTests: false,
          hasDocumentation: true,
        },
      },
      response: {
        timestamp: "2026-01-07T12:00:00.000Z",
        companyName: "Acme Corp",
        systemName: "Credit Risk Classifier",
        riskLevel: "high",
        score: 80,
        recommendations: [
          "Tester les biais démographiques (genre, âge, origine) avec Fairlearn ou AIF360.",
          "Vérifier la conformité RGPD (consentement, droit à l'oubli, minimisation).",
        ],
      },
    },
    contact: {
      author: "Raouf Warnier",
      email: "rww.warnier@gmail.com",
      website: "https://kenshu.dev",
    },
  });
}
