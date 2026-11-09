# Journal des prompts — TaskFlow

Ce journal distingue les demandes réellement formulées dans la conversation et les propositions rédigées par l'IA. Les formulations ci-dessous reprennent ou résument les échanges ; elles ne constituent pas un historique exhaustif et littéral de toutes les requêtes.

| Étape | Demande de l'utilisateur | Utilisation / résultat |
|---|---|---|
| Compréhension | « qu'est ce qu'un user story » | Explication de la structure et des critères d'acceptation. |
| Consigne | « frzngin explique moi » avec la diapositive « Votre mission en 4 étapes » | Compréhension des livrables : binôme, User Stories, architecture, dépôt GitHub. |
| Préparation | « fais le stp » | Première proposition de projet CoffreFort, ensuite écartée car distincte du README du cours. |
| Base de données | « nan mais fais le a partir d'une nouvelle base de donnée » | Une variante SQLite a été proposée mais ne correspond pas aux contraintes du README TaskFlow. |
| Vérification | « faut il remplir quelque chose » en transmettant le README-v2.md | Identification des sections à compléter et des contraintes du cours. |
| Révision | « remplace directement » | Complétion du README TaskFlow avec choix proposés, 7 User Stories / 3 itérations, architecture sans base de données et modèle d'objet JavaScript. |

## Points à discuter / corriger avec le binôme

- Valider les règles de robustesse et les seuils de la jauge.
- Valider les 7 User Stories et leurs critères d'acceptation.
- Confirmer les propositions refusées et ajuster les justifications en fonction des vrais choix de l'équipe.
- Ajouter ici les futurs prompts utilisés pour développer et tester l'application, en indiquant ce qui a été conservé, modifié ou rejeté.

---

# Journal des prompts — TaskFlow

Ce journal décrit les demandes utilisées pour générer le projet. La relecture personnelle et les tests manuels de l'élève restent à faire ; les cases non cochées ne sont pas des validations réalisées.

## Sprint 1 — Gérer les tâches

**Prompt de génération proposé :** « Crée une application TaskFlow en HTML et JavaScript sans framework. Permets de créer, afficher, modifier, supprimer et terminer une tâche. Refuse les titres vides ou composés d'espaces. Affiche les titres avec textContent. »

- Gardé : tableau de tâches, fonctions courtes, événements du DOM, titres limités à 120 caractères.
- Modifié : suppression par identifiant unique et validation après trim à la création comme à la modification.
- Rejeté : insertion des titres avec innerHTML et dépendances inutiles.
- À expliquer : tableau, objet, filter, addEventListener, trim et textContent.
- [ ] Tester ajout, affichage, modification, suppression et case terminée.
- [ ] Tester un titre vide, des espaces, l'annulation de la modification et un titre `<img src=x onerror=alert(1)>`.

## Sprint 2 — Sauvegarde et CSS

**Prompt :** « Sauvegarde les tâches dans localStorage après chaque action et restaure-les au démarrage. Gère un stockage illisible ou indisponible. Ajoute un style sobre, responsive et des états de focus visibles. »

- Gardé : JSON.stringify / JSON.parse, mise en page verte et crème, compteur de tâches terminées.
- Modifié : validation du format des données et des identifiants avant leur restauration.
- Rejeté : services externes et bibliothèque CSS pour cette petite application.
- À expliquer : stockage local, try/catch, media queries et différence entre données en mémoire et données persistantes.
- [ ] Recharger après ajout, modification, suppression et changement d'état.
- [ ] Vérifier sur écran étroit et au clavier.
- [ ] Mettre du JSON invalide dans le stockage, recharger et vérifier le message.

## Sprint 3 — Connexion et mot de passe

**Prompt :** « Ajoute un compte local et la connexion. Vérifie un mot de passe de 12 à 128 caractères avec minuscule, majuscule, chiffre et symbole. Ne stocke jamais le mot de passe en clair : utilise Web Crypto, PBKDF2-SHA-256 et un sel aléatoire. Explique les limites de cette démonstration côté navigateur. »

- Gardé : Web Crypto natif, sel aléatoire, 600 000 itérations, déconnexion et messages d'erreur.
- Modifié : un seul compte local, double soumission bloquée, vérification du format du compte sauvegardé.
- Rejeté : mot de passe en clair, simple encodage Base64, promesse d'une authentification sécurisée avec seulement du JavaScript côté client.
- À expliquer : hachage dérivé, sel, promesse/async-await, stockage local et différence entre masquer une interface et protéger des données.
- [ ] Tester les critères, le bon et le mauvais mot de passe, puis la déconnexion et le rechargement.
- [ ] Inspecter le stockage et vérifier l'absence de mot de passe en clair.
- [ ] Expliquer pourquoi cette connexion locale reste contournable.

## État de la livraison

Contrôles de génération : syntaxe des scripts et scénarios fonctionnels testés avec un DOM simulé (tâches, stockage et connexion). Ajustement après contrôle : le message d'échec de sauvegarde n'est plus masqué par le message d'ajout. Aucun test visuel dans un navigateur réel n'a été réalisé.

Les trois commits sont des étapes de génération. Ils ne certifient pas la compréhension du code par l'élève. Dépôt de destination : https://github.com/alexisglombard-cyber/Projet-Outils-IA. Tests manuels à finaliser avant de rendre.


## Intégration GitHub

Demande réellement reçue : publier dans `https://github.com/alexisglombard-cyber/Projet-Outils-IA`. Historique existant conservé par fusion ; document de conception conservé dans `docs/CONCEPTION.md`.
