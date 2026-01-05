# 📊 Configuration Google Analytics 4 (GA4)

## 🧠 À quoi sert GA4 ?

Google Analytics 4 te permet de **mesurer ce qui se passe sur ton site** :

- 📈 **Visiteurs** : Combien de personnes visitent ton site
- 📄 **Pages vues** : Quelles pages sont les plus populaires
- 🔗 **Sources de trafic** : D'où viennent tes visiteurs (Google, LinkedIn, direct...)
- 🎯 **Conversions** : Combien cliquent sur "Me contacter" ou autres CTAs
- ⏱️ **Temps sur site** : Combien de temps les gens restent
- 🚪 **Taux de rebond** : Combien partent sans interaction

**Sans GA4 = Tu es aveugle 🙈**  
**Avec GA4 = Tu sais exactement ce qui marche 📈**

---

## 🚀 Installation (5 minutes)

### **Étape 1 : Créer un compte Google Analytics**

1. Va sur [analytics.google.com](https://analytics.google.com)
2. Clique sur **"Commencer à mesurer"**
3. Crée un **compte** :
   - Nom : `Kenshu Dev`
   - Pays : France
   - Accepte les conditions

4. Crée une **propriété** :
   - Nom : `kenshu.dev`
   - Fuseau horaire : `France (GMT+1)`
   - Devise : `EUR - Euro`

5. Ajoute un **flux de données Web** :
   - Clique sur **"Web"**
   - URL du site : `https://kenshu.dev`
   - Nom du flux : `Kenshu Portfolio`

6. **📋 Copie ton ID de mesure** :
   - Format : `G-XXXXXXXXXX`
   - Tu le trouveras dans : **Admin > Flux de données > ID de mesure**

---

### **Étape 2 : Configurer dans Next.js**

Le code est **déjà installé** dans `src/app/layout.tsx` ! ✅

Il te reste juste à **ajouter ton ID** :

#### **Option A : Variable d'environnement (recommandé)**

1. Crée un fichier `.env.local` à la racine du projet :

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. Remplace `G-XXXXXXXXXX` par ton vrai ID

3. Redémarre le serveur de dev :

```bash
npm run dev
```

#### **Option B : Directement dans le code (rapide mais pas recommandé)**

Dans `src/app/layout.tsx`, ligne ~145, remplace :

```typescript
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";
```

par ton ID :

```typescript
const GA_MEASUREMENT_ID = "G-1234567890"; // Ton vrai ID ici
```

---

### **Étape 3 : Vérifier que ça marche**

1. **Push ton code sur Vercel** :

```bash
git add .
git commit -m "feat: Google Analytics 4 configuré"
git push
```

2. **Configure la variable d'environnement sur Vercel** :
   - Va sur [vercel.com](https://vercel.com)
   - Sélectionne ton projet `portfolio-ai`
   - Settings > Environment Variables
   - Ajoute : `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
   - Redéploie

3. **Teste en temps réel** :
   - Va sur [analytics.google.com](https://analytics.google.com)
   - Clique sur **"Rapports" > "Temps réel"**
   - Ouvre ton site `https://kenshu.dev`
   - Tu devrais voir **1 utilisateur actif** apparaître en quelques secondes ! 🎉

---

## 📊 Que mesurer avec GA4 ?

### **Rapports importants pour toi**

1. **Vue d'ensemble** (Rapports > Vue d'ensemble)
   - Visiteurs/jour
   - Pages vues
   - Sources de trafic

2. **Pages et écrans** (Rapports > Engagement > Pages et écrans)
   - Quelles pages sont les plus visitées ?
   - `/projets/budget-ai` vs `/blog/5-erreurs-spark` ?

3. **Événements** (Rapports > Engagement > Événements)
   - Clics sur "Me contacter"
   - Téléchargements CV
   - Clics projets

4. **Acquisition de trafic** (Rapports > Acquisition)
   - Google Search : 60%
   - LinkedIn : 25%
   - Direct : 10%
   - Autres : 5%

---

## 🎯 Événements personnalisés (optionnel)

Si tu veux tracker des actions précises (clics, téléchargements...), modifie `src/components/AnalyticsTracker.tsx` :

```typescript
// Fonction helper pour tracker des événements
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
}

// Utilisation dans un composant
<button onClick={() => trackEvent("contact_clicked", { source: "hero" })}>
  Me contacter
</button>
```

**Événements recommandés** :
- `contact_clicked`
- `project_viewed`
- `article_read`
- `calendly_opened`
- `service_viewed`

---

## 🔐 Confidentialité & RGPD

GA4 est **conforme RGPD** si tu :

1. ✅ Ajoutes une mention dans `/contact` ou footer :
   > "Ce site utilise Google Analytics pour mesurer l'audience. Aucune donnée personnelle n'est collectée."

2. ✅ (Optionnel) Ajoutes un bandeau cookies si tu as beaucoup de trafic EU

3. ✅ Anonymises les IPs (GA4 le fait par défaut maintenant)

---

## 📈 Résultats attendus

Après **1 mois** avec GA4, tu sauras :

- 📊 Combien de visiteurs tu as
- 🎯 Quel article blog performe le mieux
- 🔗 Si LinkedIn amène du trafic qualifié
- 💼 Combien de gens vont sur `/contact`
- 🚀 Si ton SEO progresse (trafic Google ↗️)

**Exemple de metrics attendues** (mois 1) :
- Visiteurs : 200-300
- Pages/session : 2.5
- Taux rebond : 45%
- Durée moyenne : 2m 30s
- Top source : Google (60%)

---

## 🆘 Dépannage

### **"Je ne vois aucune donnée dans GA4"**

1. Vérifie que ton ID est correct (format `G-XXXXXXXXXX`)
2. Vérifie que la variable d'environnement est bien sur Vercel
3. Attends 30 minutes (délai de traitement GA4)
4. Teste en mode navigation privée
5. Vérifie la console du navigateur (F12) : pas d'erreur ?

### **"J'ai deux comptes Analytics"**

Si tu as déjà un compte GA4 :
- Utilise le sélecteur de propriété (en haut à gauche)
- Va dans Admin > Flux de données
- Copie l'ID de mesure

---

## 📚 Ressources

- [Documentation officielle GA4](https://support.google.com/analytics/answer/9304153?hl=fr)
- [Next.js + Google Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [Rapports GA4 expliqués](https://support.google.com/analytics/answer/9212670)

---

**✅ Ton GA4 est prêt !** Tu peux maintenant mesurer ton trafic et optimiser ton site en fonction des données réelles. 📊
