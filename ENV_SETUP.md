# 🔧 Configuration des Variables d'Environnement

## Configuration Email (Formulaire de Contact)

### 1. Configuration Gmail (Recommandé)

Créez un fichier `.env` à la racine du projet avec :

```env
# Configuration SMTP Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre.email@gmail.com
SMTP_PASS=votre_mot_de_passe_application

# Email de destination
CONTACT_EMAIL=raouf.warnier@exemple.com
```

### 2. Obtenir un App Password Gmail

1. **Aller dans Google Account Settings**
   - [myaccount.google.com](https://myaccount.google.com)

2. **Activer la 2-Step Verification**
   - Security > 2-Step Verification

3. **Générer un App Password**
   - Security > 2-Step Verification > App passwords
   - Sélectionner "Mail" 
   - Copier le mot de passe généré dans `SMTP_PASS`

### 3. Autres fournisseurs SMTP

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=votre.email@outlook.com
SMTP_PASS=votre_mot_de_passe
```

#### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=votre.email@yahoo.com
SMTP_PASS=votre_mot_de_passe_application
```

#### SendGrid (Service professionnel)
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=votre_api_key_sendgrid
```

## Configuration Production (Vercel)

### Variables à ajouter dans Vercel Dashboard

1. **Settings > Environment Variables**

2. **Ajouter ces variables :**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=votre.email@gmail.com
   SMTP_PASS=votre_app_password
   CONTACT_EMAIL=raouf.warnier@exemple.com
   NUXT_PUBLIC_SITE_URL=https://votre-portfolio.vercel.app
   ```

## Test de Configuration

### 1. Vérifier la configuration
```bash
# Installer les dépendances
npm install nodemailer @types/nodemailer

# Redémarrer le serveur
npm run dev
```

### 2. Tester l'envoi d'email
1. Aller sur `http://localhost:3000`
2. Naviguer vers la section Contact
3. Remplir et envoyer le formulaire
4. Vérifier la réception de l'email

### 3. Debug en cas de problème
```bash
# Vérifier les logs
console.log('SMTP Config:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER ? '✓' : '✗',
  pass: process.env.SMTP_PASS ? '✓' : '✗'
})
```

## Sécurité

### ⚠️ Important
- **Jamais** commiter le fichier `.env` 
- Utiliser des **App Passwords**, pas vos mots de passe principaux
- Vérifier que `.env` est dans `.gitignore`

### Configuration .gitignore
```gitignore
# Environment variables
.env
.env.local
.env.production
```

## Variables Optionnelles

```env
# Analytics
NUXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX

# Sécurité
SESSION_SECRET=cle_secrete_longue_et_aleatoire
ALLOWED_ORIGINS=http://localhost:3000,https://votre-domaine.com

# Development
PORT=3000
DEBUG=false
```

## Aide et Support

Si vous rencontrez des problèmes :

1. **Vérifier les logs** dans la console du navigateur
2. **Tester la configuration SMTP** avec un outil comme [SMTP Tester](https://www.smtper.net/)
3. **Vérifier les paramètres** de sécurité de votre fournisseur email
4. **Consulter la documentation** de votre fournisseur SMTP 