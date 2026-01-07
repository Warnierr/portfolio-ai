/**
 * Fonctions d'export pour l'AI Act Auditor
 * Formats supportés : JSON, Markdown, PDF
 */

export type AuditResult = {
  timestamp: string;
  companyName: string;
  systemName: string;
  riskLevel: "minimal" | "limited" | "high" | "unacceptable";
  score: number;
  recommendations: string[];
  answers: Record<string, unknown>;
};

/**
 * Export en JSON
 */
export function exportToJSON(result: AuditResult): string {
  return JSON.stringify(result, null, 2);
}

/**
 * Download JSON file
 */
export function downloadJSON(result: AuditResult, filename?: string): void {
  const json = exportToJSON(result);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || `ai-act-audit-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export en Markdown (format checklist Notion/Trello)
 */
export function exportToMarkdown(result: AuditResult): string {
  const riskEmoji = {
    minimal: "✅",
    limited: "⚡",
    high: "⚠️",
    unacceptable: "🚫",
  };

  return `# Audit AI Act - ${result.systemName}

## 📋 Informations Générales

- **Entreprise** : ${result.companyName}
- **Système IA** : ${result.systemName}
- **Date de l'audit** : ${new Date(result.timestamp).toLocaleDateString("fr-FR")}
- **Niveau de risque** : ${riskEmoji[result.riskLevel]} ${result.riskLevel.toUpperCase()}
- **Score de conformité** : ${result.score}/100

---

## 🎯 Recommandations Prioritaires

${result.recommendations.map((rec, i) => `${i + 1}. [ ] ${rec}`).join("\n")}

---

## 📊 Détails de l'Audit

### Réponses aux Questions

${Object.entries(result.answers)
  .map(([key, value]) => `- **${key}** : ${value}`)
  .join("\n")}

---

## 📚 Ressources Utiles

- [Texte officiel AI Act](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:52021PC0206)
- [Guide de conformité CNIL](https://www.cnil.fr/)
- [AI Act Auditor](https://kenshu.dev/ai-act-auditor)

---

**Généré par [AI Act Auditor](https://kenshu.dev/ai-act-auditor)**  
*Cet audit est informatif. Consultez un juriste pour une validation légale.*
`;
}

/**
 * Download Markdown file
 */
export function downloadMarkdown(result: AuditResult, filename?: string): void {
  const markdown = exportToMarkdown(result);
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || `ai-act-audit-${Date.now()}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export en format Notion (JSON structuré pour import Notion)
 */
export function exportToNotion(result: AuditResult): string {
  const notionFormat = {
    object: "block",
    type: "page",
    page: {
      properties: {
        title: {
          title: [
            {
              text: {
                content: `Audit AI Act - ${result.systemName}`,
              },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [{ text: { content: "Informations Générales" } }],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [{ text: { content: `Entreprise : ${result.companyName}` } }],
          },
        },
        {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [{ text: { content: `Niveau de risque : ${result.riskLevel}` } }],
          },
        },
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [{ text: { content: "Recommandations" } }],
          },
        },
        ...result.recommendations.map((rec) => ({
          object: "block",
          type: "to_do",
          to_do: {
            rich_text: [{ text: { content: rec } }],
            checked: false,
          },
        })),
      ],
    },
  };

  return JSON.stringify(notionFormat, null, 2);
}

/**
 * Download Notion format
 */
export function downloadNotion(result: AuditResult, filename?: string): void {
  const notion = exportToNotion(result);
  const blob = new Blob([notion], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || `ai-act-audit-notion-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Erreur lors de la copie:", error);
    return false;
  }
}
