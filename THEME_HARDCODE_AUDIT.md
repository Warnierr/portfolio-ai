# Audit Complet - Variables CSS Hardcodées (Anti-Thème)

**Date**: 2026-01-17 01:23  
**Problème**: Thèmes ne s'appliquent pas sur Homepage et Expériences  
**Cause**: 100+ occurrences de hardcoded colors (`bg-black`, `bg-zinc-900`, `text-white`)

---

## 🔴 Fichiers CRITIQUES (Impact Immédiat)

### 1. **HomeMinimal.tsx** (Homepage)
**Ligne 28**: `bg-[#050505]` → doit devenir `bg-[var(--bg-primary)]`  
**Ligne 31**: `bg-black/60` → `bg-[var(--bg-secondary)]/60`  
**Ligne 37-42**: `text-zinc-400`, `text-white` → `text-[var(--text-muted)]`, `text-[var(--text-primary)]`

**Occurences totales**: ~30+  
**Impact**: 🔴 MASSIF (page d'accueil = première impression)

---

### 2. **projets/page.tsx**
**Problème**: Gradient backgrounds hardcodés

```tsx
// AVANT (ligne 10 approximative)
className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"

// APRÈS
className="min-h-screen bg-[var(--bg-primary)]"
// OU si gradient vraiment nécessaire :
style={{
  background: `linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary), var(--bg-secondary))`
}}
```

**Occurences**: ~15  
**Impact**: 🔴 CRITIQUE (même problème que homepage)

---

### 3. **ExperienceItem.tsx** (composant des cartes expériences)
**Hardcodes détectés**:
- `bg-white/5`, `border-white/10`
- `text-white`, `text-zinc-400`

**Impact**: 🔴 CRITIQUE (utilisé dans page /projets)

---

## 🟠 Fichiers IMPORTANTS (Impact Moyen)

### 4. **ServiceExplorer.tsx**
**Lignes problématiques**:
- L103: `bg-black/50 border-white/5`
- L118-119: `bg-white/10`, `bg-black/40`
- L140: `bg-black/20`

**Occurences**: 20+  
**Impact**: 🟠 MOYEN (page /services fonctionne "plutôt bien" selon user, mais peut mieux faire)

---

### 5. **MobileMenu.tsx**
- L32-40: `bg-white` (lignes du burger menu)
- L54: `bg-black/80 backdrop-blur-sm`
- L63: `bg-black/95`
- L83: `hover:bg-white/5`

**Impact**: 🟠 MOYEN (navigation mobile)

---

### 6. **ConditionalHeader.tsx**
À vérifier (probablement tous les `bg-`, `text-`, `border-`)

---

## 🟡 Fichiers SECONDAIRES (Impact Faible mais à corriger)

- `Testimonials.tsx`
- `TechAccordion.tsx`
- `StickyCtA.tsx`
- `TypingIndicator.tsx`
- `ProcessDiagram.tsx`
- `MethodologyTimeline.tsx`
- `LeadCaptureModal.tsx`
- `NewsFeed.tsx`
- `ProgressBar.tsx`
- `IconGrid.tsx`

**Impact**: 🟡 FAIBLE (composants utilisés ponctuellement)

---

## 🟢 Fichiers LEGACY (À archiver, pas à corriger)

- `LandingPage.tsx` (40KB, version obsolète)
- `LandingPageNew.tsx` (7KB, remplacée par HomeMinimal)

**Action**: Déplacer vers `.archive/components/`

---

## Règles de Remplacement Systématiques

### Backgrounds
```tsx
// ❌ AVANT
bg-black        → bg-[var(--bg-primary)]
bg-zinc-900     → bg-[var(--bg-primary)]
bg-zinc-950     → bg-[var(--bg-primary)]
bg-white        → bg-[var(--bg-primary)]  // en mode light

bg-black/50     → bg-[var(--bg-secondary)]/50
bg-white/5      → bg-[var(--bg-card)]/50
bg-white/10     → bg-[var(--bg-elevated)]

// Gradients
bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950
→ Remplacer par style inline avec var()
```

### Text Colors
```tsx
// ❌ AVANT
text-white      → text-[var(--text-primary)]
text-zinc-400   → text-[var(--text-secondary)]
text-zinc-500   → text-[var(--text-muted)]
text-zinc-300   → text-[var(--text-secondary)]
```

### Borders
```tsx
// ❌ AVANT
border-white/10       → border-[var(--border)]
border-white/20       → border-[var(--border-strong)]
border-zinc-800       → border-[var(--border)]
border-emerald-500    → border-[var(--accent)] (si accent)
```

### Hovers
```tsx
// ❌ AVANT
hover:bg-white/10     → hover:bg-[var(--bg-elevated)]
hover:text-white      → hover:text-[var(--text-primary)]
hover:bg-zinc-900     → hover:bg-[var(--bg-secondary)]
```

---

## Plan d'Action Priorisé

### Phase 1: Critique (1-2h) 🔴
1. ✅ **HomeMinimal.tsx** - Remplacer TOUS les hardcodes
   - Navbar
   - Hero section
   - CTA buttons
   - Sections de contenu

2. ✅ **projets/page.tsx** - Backgrounds + gradient
   
3. ✅ **ExperienceItem.tsx** - Cardes d'expériences

**Test après Phase 1**: Homepage + /projets doivent s'adapter à TOUS les thèmes

---

### Phase 2: Important (1h) 🟠
4. **ServiceExplorer.tsx** - Affiner (déjà fonctionnel mais improvable)
5. **MobileMenu.tsx** - Menu burger mobile
6. **ConditionalHeader.tsx** - Header global

**Test après Phase 2**: Navigation complète s'adapte

---

### Phase 3: Secondaire (2h) 🟡
7-16. Tous les composants secondaires listés

---

### Phase 4: Cleanup (30min) 🟢
17. Archiver `LandingPage.tsx` et `LandingPageNew.tsx`

---

## Commandes de Recherche Utiles

```bash
# Trouver tous les bg-black, bg-zinc, bg-white
rg "bg-(black|zinc-9|zinc-8|white)" --glob "*.tsx" src/

# Trouver tous les text-white, text-zinc
rg "text-(white|zinc-[3-5])" --glob "*.tsx" src/

# Trouver tous les border-white
rg "border-white" --glob "*.tsx" src/

# Trouver gradients hardcodés
rg "bg-gradient" --glob "*.tsx" src/
```

---

## Validation Post-Correction

### Checklist par Thème
Pour CHAQUE thème (Dark, Light, Neon, Matrix, Cyberpunk, Retro, Zen):

**Homepage** `/`:
- [ ] Navbar: couleur fond adaptée
- [ ] Hero title: texte visible
- [ ] CTA buttons: couleurs cohérentes
- [ ] Sections: backgrounds adaptés
- [ ] Images: pas de clash de couleurs

**Expériences** `/projets`:
- [ ] Hero section: background + texte
- [ ] Cartes expériences: fond + bordures
- [ ] Texte achievements: lisible
- [ ] CTA contact: couleur adaptée

**Services** `/services`:
- [ ] ServiceExplorer: panneau gauche/droite
- [ ] Catégories: sélection visible
- [ ] Cards services: backgrounds
- [ ] Images: visibles

### Test Rapide (30s par thème)
1. Ouvrir homepage
2. Cliquer 🎨 → Sélectionner thème
3. Scroller toute la page
4. Naviguer vers /projets
5. Scroller
6. Revenir à homepage

**Critère de succès**: AUCUN élément invisible ou illisible

---

## Impact Estimé

**Avant correction**:
- Dark theme: ✅ 95% fonctionnel
- Light theme: ❌ 30% fonctionnel (page noire sur fond clair)
- Autres thèmes: ⚠️ 50-70% fonctionnels

**Après correction**:
- Tous les thèmes: ✅ 95-100% fonctionnels
- Cohérence visuelle: ✅ Complète
- Maintenance: ✅ Facile (changer 1 token = tout s'adapte)

---

## Fichiers à Modifier (Ordre de Priorité)

```
1. src/components/HomeMinimal.tsx                    🔴 CRITIQUE
2. src/app/projets/page.tsx                          🔴 CRITIQUE  
3. src/components/ExperienceItem.tsx                 🔴 CRITIQUE
4. src/components/ServiceExplorer.tsx                🟠 IMPORTANT
5. src/components/MobileMenu.tsx                     🟠 IMPORTANT
6. src/components/ConditionalHeader.tsx              🟠 IMPORTANT
7-16. Composants secondaires                         🟡 SECONDAIRE
17-18. LandingPage*.tsx                              🟢 ARCHIVER
```

---

**Dernière mise à jour**: 2026-01-17 01:25  
**Statut**: Prêt pour correction immédiate Phase 1
