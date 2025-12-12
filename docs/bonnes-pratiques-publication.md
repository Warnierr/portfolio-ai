## Bonnes pratiques avant publication / déploiement

- **Secrets** : jamais de clés dans le dépôt. Utiliser `.env.local` (déjà ignoré), vérifier l’historique avant de pousser. Si une clé a fuité : la révoquer puis la regénérer.
- **.gitignore** : garder `node_modules/`, `.next/`, `out/`, `.env*`, `.vercel/`, logs et artefacts de build hors du dépôt.
- **Données perso** : limiter les infos privées (téléphone perso, adresse postale). Préférer une adresse email dédiée ou un formulaire de contact.
- **Dépendances** : mettre à jour régulièrement (`npm audit`, `npm outdated`). Corriger les vulnérabilités bloquantes avant déploiement.
- **Licences & assets** : n’utiliser que des images/polices libres ou sous licence acquise. Documenter la licence du projet (ex : MIT) à la racine.
- **Qualité** : lancer `npm run lint` et `npm run build` avant de pousser. Ajouter une CI GitHub Actions qui fait install + lint + build.
- **Env prod** : définir les variables d’environnement dans le dashboard (ex : Vercel) et non dans le dépôt. Pas de logs sensibles côté client.
- **SEO/Indexation** : si des pages doivent rester non indexées, ajouter `robots.txt` ou headers `X-Robots-Tag` adaptés.
- **Nettoyage** : éviter les gros fichiers inutiles (vidéos brutes, PSD). Supprimer les dépendances mortes et assets non utilisés.
- **Déploiement Next.js** : build par défaut `npm run build`. Sur Vercel, connecter le repo GitHub, définir les env vars, vérifier que `next.config.ts` ne contient pas de secrets.

Checklist rapide avant push :
- `git status` propre, pas de fichiers inattendus.
- Pas de secrets ni données privées.
- Tests/lint/build OK en local.
- README à jour (commandes de run/build, env vars attendues).
