# 🖼️ Guide : Créer l'image Open Graph (og-image.png)

## ⚠️ URGENT : Image OG manquante !

L'image `og-image.png` n'existe pas actuellement. C'est l'image qui s'affiche quand on partage votre site sur :
- ����️ LinkedIn
- 📘 Facebook  
- 🐦 Twitter/X
- 💬 Slack, Discord, etc.

**Impact** : Sans cette image, le partage de votre site aura l'air peu professionnel.

---

## ✅ Spécifications requises

- **Dimensions** : 1200 x 630 pixels (standard Facebook/LinkedIn)
- **Format** : PNG ou JPG
- **Taille** : < 1MB (idéal : < 300KB)
- **Nom du fichier** : `og-image.png`
- **Emplacement** : `public/og-image.png`

---

## 🎨 Contenu recommandé

### Texte principal
```
Raouf Warnier
Data Engineering • AI Product Builder • DevOps
```

### Texte secondaire (optionnel)
```
Kenshu Dev 研修
Freelance • Paris • Remote
```

### Style
- **Fond** : Sombre moderne (#0a0a0a ou gradient sombre)
- **Texte** : Blanc (#ffffff)
- **Accent** : Vert émeraude (#10b981) ou ton dominant de votre site
- **Police** : Moderne, sans-serif (Inter, Outfit, Geist)
- **Éléments visuels** : Optionnels - motifs tech subtils, géométrie, data nodes

---

## 🛠️ Option 1 : Canva (Recommandé - Gratuit)

### Étapes

1. **Aller sur** : https://www.canva.com/
   
2. **Sélectionner** : "Taille personnalisée" → 1200 x 630 px

3. **Choisir un template** :
   - Rechercher "LinkedIn post dark" ou "Tech banner"
   - Ou partir d'un fond vide

4. **Design recommandé** :
   ```
   Fond sombre (#0a0a0a)
   ________________________
   |                       |
   |   RAOUF WARNIER       |  ← Grande police, bold, blanc
   |   Data Engineering •  |  ← Taille moyenne, gris clair
   |   AI Product Builder  |
   |   • DevOps            |
   |                       |
   |   Kenshu Dev 研修      | ← Petit, accent vert
   |_______________________|
   ```

5. **Télécharger** :
   - Format PNG
   - Qualité standard
   - Renommer en `og-image.png`

6. **Placer dans** : `public/og-image.png`

---

## 🛠️ Option 2 : Figma (Professionnel - Gratuit)

1. **Aller sur** : https://www.figma.com/
2. **Nouveau fichier** → Frame 1200x630
3. **Utiliser ce design system** :

```
Fond: Rectangle 1200x630
- Fill: Linear gradient
  - Start: #0a0a0a
  - End: #1a1a1a
  - Angle: 135°

Titre "Raouf Warnier"
- Font: Inter/Outfit Bold
- Size: 72px
- Color: #ffffff
- Position: Center Y, Left margin 80px

Sous-titre "Data Engineering • AI Product Builder • DevOps"
- Font: Inter Regular
- Size: 32px
- Color: #9ca3af
- Position: Below title, same margin

Logo "Kenshu Dev"
- Font: Inter Medium
- Size: 24px
- Color: #10b981
- Position: Bottom left, 40px margin

Élément visuel (optionnel)
- Cercles/Nodes géométriques
- Opacity 10-20%
- Color: #10b981
```

4. **Exporter** : PNG, 1x, placer dans `public/`

---

## 🛠️ Option 3 : Photopea (Photoshop gratuit en ligne)

1. **Aller sur** : https://www.photopea.com/
2. **Fichier** → Nouveau → 1200 x 630 px
3. **Utiliser les outils texte** pour créer le design
4. **Exporter** : Fichier → Exporter → PNG

---

## 🛠️ Option 4 : Code (Pour les devs)

Si vous préférez générer l'image programmatiquement :

```bash
npm install canvas
```

```typescript
// scripts/generate-og-image.ts
import { createCanvas } from 'canvas';
import fs from 'fs';

const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#0a0a0a';
ctx.fillRect(0, 0, 1200, 630);

// Main title
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 72px sans-serif';
ctx.fillText('Raouf Warnier', 80, 260);

// Subtitle
ctx.fillStyle = '#9ca3af';
ctx.font = '32px sans-serif';
ctx.fillText('Data Engineering • AI Product Builder • DevOps', 80, 330);

// Kenshu brand
ctx.fillStyle = '#10b981';
ctx.font = '24px sans-serif';
ctx.fillText('Kenshu Dev 研修', 80, 560);

// Save
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./public/og-image.png', buffer);
```

---

## ✅ Checklist de validation

Après création, vérifier :

- [ ] Fichier existe : `public/og-image.png`
- [ ] Dimensions : 1200 x 630 px
- [ ] Taille : < 1MB
- [ ] Texte lisible sur mobile
- [ ] Contraste suffisant (texte sur fond)

### Tests recommandés

1. **Facebook Debugger** : https://developers.facebook.com/tools/debug/
   - Coller URL : `https://kenshu.dev`
   - Cliquer "Scrape Again"
   - Vérifier que l'image s'affiche

2. **LinkedIn Post Inspector** : https://www.linkedin.com/post-inspector/
   - Même procédure

3. **Twitter Card Validator** : https://cards-dev.twitter.com/validator
   - Même procédure

---

## 🚀 Une fois l'image créée

1. Placer `og-image.png` dans `public/`
2. Commit & Push :
   ```bash
   git add public/og-image.png
   git commit -m "feat(seo): ajout image Open Graph"
   git push
   ```
3. Attendre déploiement Vercel (2-3 min)
4. Tester avec Facebook Debugger
5. Partager le site sur LinkedIn pour vérifier !

---

## 💡 Templates recommandés

Pour gagner du temps, chercher sur Google :

- "OG image template dark tech"
- "LinkedIn banner template developer"
- "Open Graph image personal brand"

Et adapter avec vos infos.

---

## 📏 Dimensions alternatives (optionnel)

Si vous créez plusieurs versions :

- **Twitter** : 1200 x 628 px (quasi identique)
- **Facebook** : 1200 x 630 px ✅ (déjà fait)
- **LinkedIn** : 1200 x 627 px (quasi identique)

→ **Une seule image 1200x630** fonctionne pour tout !

---

**Priorité** : 🔴 Haute - À faire ASAP pour professionnaliser le partage du site.
