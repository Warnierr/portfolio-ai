# Configuration de Resend pour le formulaire de contact

## Étape 1 : Créer un compte Resend (GRATUIT)

1. Allez sur [https://resend.com/signup](https://resend.com/signup)
2. Créez un compte gratuit (3000 emails/mois gratuits)
3. Confirmez votre email

## Étape 2 : Obtenir votre clé API

1. Connectez-vous à [https://resend.com/api-keys](https://resend.com/api-keys)
2. Cliquez sur **"Create API Key"**
3. Donnez un nom (ex: "Portfolio Contact Form")
4. Sélectionnez les permissions : **Sending access** (Full access)
5. Cliquez sur **"Add"**
6. **COPIEZ LA CLÉ IMMÉDIATEMENT** (elle ne sera plus affichée)
   - Format : `re_xxxxxxxxxxxxxxxxxxxxxxxxx`

## Étape 3 : Configurer les variables d'environnement

### Pour le développement local (.env.local)

Créez ou modifiez le fichier `.env.local` à la racine du projet :

```bash
RESEND_API_KEY=re_votre_cle_api_ici
CONTACT_EMAIL=votre.email@gmail.com
```

### Pour la production (Vercel)

1. Allez sur [https://vercel.com](https://vercel.com)
2. Sélectionnez votre projet Portfolio
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez :
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_votre_cle_api_ici`
   - **Environment:** Cochez "Production", "Preview", et "Development"
5. Ajoutez aussi :
   - **Name:** `CONTACT_EMAIL`
   - **Value:** `votre.email@gmail.com`
   - **Environment:** Cochez "Production", "Preview", et "Development"
6. Cliquez sur **"Save"**
7. **Redéployez votre application** pour que les variables prennent effet

## Étape 4 : Tester le formulaire

1. Redémarrez votre serveur de développement (si en local)
2. Allez sur `/contact`
3. Remplissez et envoyez le formulaire
4. Vous devriez recevoir un email à l'adresse configurée dans `CONTACT_EMAIL`

## Note importante sur l'email expéditeur

Par défaut, l'email sera envoyé depuis `onboarding@resend.dev`.

Pour utiliser votre propre domaine (ex: `contact@kenshu.dev`) :

1. Allez sur [https://resend.com/domains](https://resend.com/domains)
2. Cliquez sur **"Add Domain"**
3. Entrez votre domaine : `kenshu.dev`
4. Suivez les instructions pour ajouter les enregistrements DNS
5. Une fois vérifié, modifiez le fichier `src/app/api/contact/route.ts` :
   ```typescript
   from: "Portfolio Contact <contact@kenshu.dev>",
   ```

## Tarification Resend

- **Gratuit** : 3000 emails/mois, 100 emails/jour
- **Pro** ($20/mois) : 50 000 emails/mois
- Largement suffisant pour un portfolio !

## Dépannage

### Erreur "Email service not configured"
→ Vérifiez que `RESEND_API_KEY` est bien définie dans `.env.local`

### Pas d'email reçu
→ Vérifiez vos spams
→ Vérifiez que `CONTACT_EMAIL` est correctement défini
→ Consultez les logs Resend : [https://resend.com/emails](https://resend.com/emails)

### Erreur 400/500
→ Vérifiez les logs de la console dans votre terminal
→ Vérifiez que la clé API est valide
