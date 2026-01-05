# Instructions pour créer l'image Open Graph

## Spécifications techniques
- **Dimensions**: 1200x630 pixels
- **Format**: PNG
- **Nom du fichier**: `og-image.png`
- **Emplacement**: `/public/og-image.png`

## Contenu visuel

### Texte principal
- **Nom**: "Raouf Warnier"
  - Police: Bold, grande taille (80-100px)
  - Couleur: Blanc (#FFFFFF)
  - Position: Centre-haut

- **Titre**: "Data Engineering · AI Product Builder · DevOps"
  - Police: Medium (40-50px)
  - Couleur: Dégradé ou texte clair
  - Position: Sous le nom

- **Tagline**: "Pipelines fiables, souverains, scalables"
  - Police: Regular (30-35px)
  - Couleur: Gris clair (#A1A1AA)
  - Position: Sous le titre

### Design & Couleurs

**Background**:
- Dégradé diagonal de 3 couleurs brand:
  - Émeraude (#10B981) → Bleu (#3B82F6) → Violet (#8B5CF6)
  - Overlay noir semi-transparent (40-50%) pour lisibilité

**Éléments graphiques**:
- Motifs géométriques subtils (grilles, points)
- Icônes technos (optionnel): 🐍 Python, ⚡ Spark, 🌬️ Airflow
- Badge "TJM 450€" ou "Disponible immédiatement" (coin)

## Outils recommandés

1. **Figma** (gratuit)
   - Template OG: [figma.com/templates/social-media](https://www.figma.com/templates/social-media/)
   
2. **Canva** (gratuit)
   - Template: "LinkedIn Banner" adapté en 1200x630
   
3. **Photoshop / GIMP**
   - Pour contrôle maximal

## Test & Validation

Après création, tester avec:
- [metatags.io](https://metatags.io/)
- [opengraph.xyz](https://www.opengraph.xyz/)
- Aperçu LinkedIn, Twitter, Discord

## Exemple de structure

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              Raouf Warnier                      │
│                                                 │
│   Data Engineering · AI Product Builder · DevOps│
│                                                 │
│     Pipelines fiables, souverains, scalables    │
│                                                 │
│   [Badge: 450€/j]      [Icônes: 🐍 ⚡ 🌬️]      │
│                                                 │
└─────────────────────────────────────────────────┘
     Background: Dégradé emerald → blue → purple
```

## Alternative temporaire

Si pas le temps de créer l'image maintenant, utiliser un service de génération auto:
- [og-image.vercel.app](https://og-image.vercel.app/)
- [Cloudinary Dynamic OG Images](https://cloudinary.com/documentation/social_media_cards)

## Inspiration

Sites similaires avec bonnes OG images:
- [leerob.io](https://leerob.io)
- [stripe.com/fr](https://stripe.com/fr)
- [vercel.com](https://vercel.com)
