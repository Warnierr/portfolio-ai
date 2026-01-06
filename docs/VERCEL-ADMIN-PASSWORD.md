# 🔐 Configuration du Mot de Passe Admin sur Vercel

## 📍 Où définir le mot de passe admin

Le mot de passe admin est défini via la variable d'environnement **`ADMIN_PASSWORD`** sur Vercel.

---

## 🚀 Étapes pour configurer sur Vercel

### **1. Aller sur Vercel Dashboard**

1. Ouvrir https://vercel.com
2. Se connecter à ton compte
3. Sélectionner le projet **`portfolio-ai`**

---

### **2. Accéder aux Variables d'Environnement**

1. Cliquer sur **"Settings"** (en haut à droite)
2. Dans le menu de gauche, cliquer sur **"Environment Variables"**

---

### **3. Ajouter la Variable `ADMIN_PASSWORD`**

1. Cliquer sur **"Add New"** ou **"Add"**
2. Remplir le formulaire :
   - **Name** : `ADMIN_PASSWORD`
   - **Value** : Ton mot de passe sécurisé (ex: `K3n$hu-4dm1n-2026!`)
   - **Environments** : 
     - ✅ Cocher **Production**
     - ✅ Cocher **Preview**
     - ❌ Ne PAS cocher **Development** (on utilise `.env.local` en local)
3. Cliquer sur **"Save"**

---

### **4. Redéployer (si nécessaire)**

Si l'application est déjà déployée :

1. Aller dans l'onglet **"Deployments"**
2. Cliquer sur les **3 points** (⋯) du dernier déploiement
3. Cliquer sur **"Redeploy"**

Ou simplement attendre le prochain push Git (Vercel redéploie automatiquement).

---

## 🔒 Générer un Mot de Passe Sécurisé

### **Recommandations :**
- ✅ Minimum **16 caractères**
- ✅ Mélange de **majuscules, minuscules, chiffres, symboles**
- ✅ Pas de mots du dictionnaire
- ✅ Unique (pas réutilisé ailleurs)

### **Exemples de mots de passe sécurisés :**

```
K3n$hu-4dm1n-2026!
K3nshu_Dev_Admin_2026_Secure!
K3n$hu-P0rtf0l10-4dm1n-2026!
```

### **Générer un mot de passe :**

**Option 1 : En ligne**
- https://passwordsgenerator.net/
- Longueur : 20+ caractères
- Inclure : Majuscules, Minuscules, Nombres, Symboles

**Option 2 : Via PowerShell (Windows)**
```powershell
-join ((65..90) + (97..122) + (48..57) + (33..47) | Get-Random -Count 20 | ForEach-Object {[char]$_})
```

---

## ✅ Vérification

Après avoir configuré la variable :

1. Attendre que Vercel redéploie (ou déclencher un redeploy)
2. Aller sur `https://kenshu.dev/admin/login`
3. Tester la connexion avec ton mot de passe
4. Si ça fonctionne → ✅ Configuration réussie !

---

## 🔄 Changer le Mot de Passe Plus Tard

1. Vercel Dashboard → Settings → Environment Variables
2. Trouver `ADMIN_PASSWORD`
3. Cliquer sur **"Edit"** (icône crayon)
4. Modifier la valeur
5. Cliquer sur **"Save"**
6. Redéployer l'application

---

## ⚠️ Sécurité Avancée (Optionnel)

Pour renforcer la sécurité :

1. **Activer 2FA sur Vercel** (Settings → Security)
2. **Utiliser un gestionnaire de mots de passe** (1Password, Bitwarden, etc.)
3. **Limiter l'accès IP** (via middleware personnalisé)
4. **Ajouter un rate limiting** sur `/api/admin/login`

---

## 📝 Checklist

- [ ] Mot de passe sécurisé généré (16+ caractères)
- [ ] Variable `ADMIN_PASSWORD` ajoutée sur Vercel
- [ ] Variable configurée pour **Production** ✅
- [ ] Variable configurée pour **Preview** ✅
- [ ] Application redéployée
- [ ] Test de connexion réussi sur `https://kenshu.dev/admin/login`

---

## 🆘 En cas de problème

**Erreur : "Unauthorized"**
- Vérifier que la variable `ADMIN_PASSWORD` est bien définie sur Vercel
- Vérifier qu'elle est configurée pour l'environnement correct (Production/Preview)
- Vérifier que l'application a été redéployée après l'ajout de la variable

**Le mot de passe ne fonctionne pas**
- Vérifier qu'il n'y a pas d'espaces avant/après dans la valeur
- Vérifier que le cookie est bien supprimé (déconnexion puis reconnexion)
- Vérifier les logs Vercel pour voir les erreurs
