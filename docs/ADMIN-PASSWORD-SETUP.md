# 🔐 Configuration du Mot de Passe Admin

## 📍 Où définir le mot de passe admin

Le mot de passe admin est défini via la variable d'environnement **`ADMIN_PASSWORD`**.

### **En Local (Développement)**

Dans le fichier `.env.local` (non versionné) :

```bash
ADMIN_PASSWORD="ton-mot-de-passe-securise-ici"
```

⚠️ **Important** : Ne jamais commiter le fichier `.env.local` dans Git !

---

### **Sur Vercel (Production + Preview)**

1. Aller sur https://vercel.com → Ton projet `portfolio-ai`
2. **Settings** → **Environment Variables**
3. Ajouter une nouvelle variable :
   - **Name** : `ADMIN_PASSWORD`
   - **Value** : Ton mot de passe sécurisé (ex: `K3n$hu-4dm1n-2026!`)
   - **Environments** : Cocher ✅ **Production** et ✅ **Preview**
4. Cliquer sur **Save**

---

## 🔒 Recommandations pour un mot de passe sécurisé

### **Critères de sécurité :**
- ✅ Minimum 16 caractères
- ✅ Mélange de majuscules, minuscules, chiffres, symboles
- ✅ Pas de mots du dictionnaire
- ✅ Unique (pas réutilisé ailleurs)

### **Exemples de mots de passe sécurisés :**

```
K3n$hu-4dm1n-2026!
K3nshu_Dev_Admin_2026_Secure!
K3n$hu-P0rtf0l10-4dm1n-2026!
```

### **Générer un mot de passe sécurisé :**

**Option 1 : En ligne**
- https://passwordsgenerator.net/
- Longueur : 20+ caractères
- Inclure : Majuscules, Minuscules, Nombres, Symboles

**Option 2 : Via PowerShell (Windows)**
```powershell
-join ((65..90) + (97..122) + (48..57) + (33..47) | Get-Random -Count 20 | ForEach-Object {[char]$_})
```

**Option 3 : Via Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

---

## 🔄 Changer le mot de passe

### **En Local :**
1. Modifier `.env.local`
2. Redémarrer le serveur : `npm run dev`

### **Sur Vercel :**
1. Vercel Dashboard → Settings → Environment Variables
2. Modifier la valeur de `ADMIN_PASSWORD`
3. Redéployer (ou attendre le prochain déploiement)

---

## ⚠️ Sécurité Avancée (Optionnel)

Pour renforcer la sécurité, tu peux :

1. **Utiliser un gestionnaire de mots de passe** (1Password, Bitwarden, etc.)
2. **Activer 2FA sur Vercel** (Settings → Security)
3. **Limiter l'accès IP** (via Vercel Edge Config ou middleware personnalisé)
4. **Ajouter un rate limiting** sur `/api/admin/login`

---

## 📝 Checklist

- [ ] Mot de passe sécurisé généré (16+ caractères)
- [ ] Variable `ADMIN_PASSWORD` définie dans `.env.local` (local)
- [ ] Variable `ADMIN_PASSWORD` définie sur Vercel (Production)
- [ ] Variable `ADMIN_PASSWORD` définie sur Vercel (Preview)
- [ ] Test de connexion admin en local : `/admin/login`
- [ ] Test de connexion admin en production : `https://kenshu.dev/admin/login`

---

## 🚨 En cas de compromission

Si le mot de passe est compromis :

1. **Changer immédiatement** la variable `ADMIN_PASSWORD` sur Vercel
2. **Redéployer** l'application
3. **Vérifier les logs** Vercel pour détecter des accès suspects
4. **Révoquer les cookies** existants (changer le nom du cookie dans le code)
