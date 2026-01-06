export type ArticleCategory = 
  | 'data-engineering'
  | 'dataops'
  | 'llm-ia'
  | 'devops-plateforme'
  | 'conformite-ai-act-rgpd'
  | 'retours-experience';

export type ArticleStatus = 'draft' | 'published' | 'archived';
export type AuthorType = 'human' | 'ai' | 'ai-assisted';

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  'data-engineering': 'Data Engineering',
  'dataops': 'DataOps',
  'llm-ia': 'LLM & IA',
  'devops-plateforme': 'DevOps & Plateforme',
  'conformite-ai-act-rgpd': 'Conformité AI Act & RGPD',
  'retours-experience': 'Retours d\'expérience',
};

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  'data-engineering': 'blue',
  'dataops': 'emerald',
  'llm-ia': 'purple',
  'devops-plateforme': 'orange',
  'conformite-ai-act-rgpd': 'red',
  'retours-experience': 'yellow',
};
