# TaskFlow — Séance 2

**Équipe : Manyl et Alexis · Cybersécurité.**

Le [document de conception de la séance 1](docs/CONCEPTION.md) est conservé. Cette version couvre le périmètre de la séance 2 : titres et état des tâches, sauvegarde et connexion locale. Les priorités, échéances, confirmation de suppression et jauge à trois niveaux prévues dans la conception restent à développer. Le mot de passe exige ici au moins 12 caractères.

Application pédagogique sans framework : gestion de tâches, sauvegarde locale et début de fonctionnalité cyber.

## Ouvrir l'application

Ouvrir `index.html` dans un navigateur récent (Edge, Chrome ou Firefox). Si Web Crypto est indisponible avec une URL `file:`, servir le dossier sur localhost avec l'extension **Live Server** de VS Code, ou `py -m http.server 8000`, puis ouvrir `http://localhost:8000`.

1. Saisir un nom et un mot de passe respectant les critères, puis choisir **Créer le compte local**.
2. Ajouter, modifier, terminer et supprimer des tâches.
3. Recharger et se reconnecter : les tâches sont conservées.

Un seul compte existe par navigateur et par origine. Changer de port ou de navigateur change le stockage utilisé.

## Comprendre les fichiers

- `index.html` : structure, formulaires et libellés accessibles.
- `style.css` : couleurs, disposition et adaptation au mobile.
- `app.js` : tableau de tâches, affichage du DOM et stockage JSON.
- `auth.js` : critères du mot de passe, création du compte et vérification locale.
- `PROMPTS.md` : prompts, choix et tests manuels à compléter après relecture.

## Fonctionnalité cyber et limites

Le stockage du compte contient un nom, un sel aléatoire de 16 octets et un dérivé PBKDF2-SHA-256 de 32 octets (600 000 itérations). Le mot de passe n'est pas enregistré en clair. Un sel différent produit un dérivé différent pour le même mot de passe.

La session reste uniquement dans l'interface : recharger demande une nouvelle connexion. **Ce n'est pas une authentification de production.** Les tâches ne sont pas chiffrées. Une personne ayant accès au navigateur peut lire ou modifier le stockage, contourner l'interface et attaquer le dérivé hors ligne. Une vraie application doit vérifier l'identité sur un serveur et gérer les sessions et les tentatives de connexion côté serveur.

Pour réinitialiser la démonstration (perte du compte et des tâches), supprimer uniquement les clés `taskflow.account` et `taskflow.tasks` dans les outils de développement → Application / Stockage local. Aucun mécanisme de récupération de mot de passe n'est fourni.

## Vérifications à effectuer avant de rendre

Contrôles automatisés effectués avec un DOM simulé : syntaxe des deux scripts, titres invalides, affichage comme texte, ajout, modification, suppression, état terminé, restauration et stockage corrompu ; critères du mot de passe, format du sel et du dérivé, absence de mot de passe brut, bon/mauvais mot de passe et déconnexion. Le rendu visuel et les interactions dans un navigateur réel restent à vérifier.

- Ajouter, renommer, terminer, réactiver et supprimer une tâche ; recharger après chaque action.
- Refuser un titre vide ou composé d'espaces, y compris pendant une modification.
- Afficher `<img src=x onerror=alert(1)>` comme du texte, sans exécuter de code.
- Créer le compte avec un mot de passe valide ; refuser les critères manquants et un nom fait d'espaces.
- Refuser un mauvais nom ou mot de passe ; accepter les bons identifiants après déconnexion et rechargement.
- Vérifier que `taskflow.account` ne contient pas le mot de passe en clair.
- Vérifier les messages quand le stockage est bloqué ou corrompu.
- Parcourir les formulaires au clavier et tester une fenêtre étroite.

## GitHub

Les trois sprints sont conservés dans trois commits locaux. Créer un dépôt GitHub vide, puis dans ce dossier exécuter (en remplaçant l'URL) :

```sh
git remote add origin https://github.com/VOTRE-COMPTE/taskflow.git
git push -u origin HEAD
```

Dépôt GitHub configuré : [Projet-Outils-IA](https://github.com/alexisglombard-cyber/Projet-Outils-IA). Avant de rendre, relire le code, réaliser les tests manuels et compléter `PROMPTS.md` avec vos propres observations.
