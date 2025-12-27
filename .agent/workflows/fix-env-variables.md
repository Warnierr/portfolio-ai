---
description: Résolution des problèmes de variables d'environnement Next.js sous Windows
---

# Erreur : Variables d'environnement non lues par Next.js

## Symptômes
- L'API renvoie des erreurs d'authentification (401) malgré une clé API valide dans `.env`
- Les logs affichent des valeurs comme `%VARIABLE_NAME%` au lieu de la vraie valeur
- Prisma échoue avec "DATABASE_URL resolved to an empty string"

## Causes identifiées

### 1. Fichiers `package-lock.json` parents
Next.js peut détecter un mauvais workspace root s'il existe des fichiers `package-lock.json` dans des dossiers parents :
```
C:\Users\User\package-lock.json  ← PROBLÈME
C:\Users\User\Desktop\Projets\package-lock.json  ← PROBLÈME
C:\Users\User\Desktop\Projets\Portfolio Ai\portfolio-ai\package-lock.json  ← OK
```

**Solution :** Supprimer les lockfiles parents :
```powershell
Remove-Item "C:\Users\User\package-lock.json" -Force -ErrorAction SilentlyContinue
Remove-Item "C:\Users\User\Desktop\Projets\package-lock.json" -Force -ErrorAction SilentlyContinue
```

### 2. Variables d'environnement système Windows
Si une variable d'environnement Windows existe avec une mauvaise valeur (ex: `%OPENROUTER_API_KEY%` comme valeur littérale), elle override les fichiers `.env`.

**Vérification :**
```powershell
$env:OPENROUTER_API_KEY  # Doit afficher la vraie clé ou être vide
$env:DATABASE_URL        # Doit afficher le chemin ou être vide
```

**Solution :** Supprimer via `sysdm.cpl` → Variables d'environnement, ou :
```powershell
[Environment]::SetEnvironmentVariable("OPENROUTER_API_KEY", $null, "User")
```

### 3. Fichier .env.local mal formaté
Éviter les backslashes et les lignes mal formées :
```env
# ❌ MAUVAIS
DATABASE_URL=\
file:./dev.db\

# ✅ BON
DATABASE_URL="file:./dev.db"
```

## Solution de contournement
Définir les variables directement dans PowerShell avant de lancer le serveur :

```powershell
# start-dev.ps1
$env:OPENROUTER_API_KEY = "sk-or-v1-xxx"
$env:DATABASE_URL = "file:./dev.db"
$env:ADMIN_PASSWORD = "admin"
npm run dev
```

// turbo-all
## Vérification
1. Lancer `npm run dev`
2. Vérifier que le warning "workspace root" n'apparaît plus
3. Tester l'endpoint `/api/test-openrouter` (doit renvoyer status 200)
4. Vérifier les logs : `[Chat API] API key present: true` avec la vraie clé (pas `%...%`)

## Prévention
- Ne jamais créer de fichiers npm/node dans les dossiers parents
- Toujours vérifier `$env:VARIABLE` avant de chercher dans les fichiers .env
- Utiliser un script de démarrage pour garantir l'environnement
