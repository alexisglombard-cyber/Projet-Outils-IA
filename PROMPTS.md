# Journal des prompts — TaskFlow

**Équipe : Manyl et Alexis**  
**Filière : Cybersécurité**

Ce document présente les demandes adressées à l'assistant IA, les choix de développement et les vérifications réalisées. Les formulations des prompts sont synthétisées pour faciliter la lecture ; elles ne constituent pas une transcription littérale des échanges. Le développement des trois sprints a été demandé à partir des consignes de la séance 2, puis confirmé dans la conversation.

## Séance 1 — Conception du projet

| Objet de la demande | Résultat et décision |
|---|---|
| Comprendre la notion de user story et ses critères d'acceptation. | Définition des besoins utilisateurs et des comportements attendus. |
| Analyser les consignes et identifier les livrables. | Organisation du travail autour des fonctionnalités, de l'architecture et du dépôt GitHub. |
| Proposer un projet adapté à la filière cybersécurité. | Une première proposition de coffre-fort numérique a été écartée au profit de TaskFlow, conformément au sujet du cours. |
| Étudier une solution utilisant une base de données. | La variante SQLite a été écartée, car le projet devait fonctionner sans serveur ni base de données. |
| Compléter le document de conception de TaskFlow. | Rédaction des user stories, proposition d'architecture et définition du modèle de données. |

Le document de conception initial est conservé dans [docs/CONCEPTION.md](docs/CONCEPTION.md).

## Séance 2 — Développement

### Sprint 1 — Gestion des tâches

**Synthèse du prompt :** « Développer une application TaskFlow en HTML, CSS et JavaScript, sans framework. Permettre la création, l'affichage, la modification, la suppression et la validation d'une tâche. Refuser les titres vides ou composés uniquement d'espaces. »

- **Éléments conservés :** tableau d'objets représentant les tâches, affichage avec `textContent` et case à cocher pour terminer ou réactiver une tâche.
- **Éléments modifiés :** validation des titres avec `trim()` lors de la création et de la modification, limite de 120 caractères et identifiant unique par tâche.
- **Éléments rejetés :** insertion des titres avec `innerHTML`, afin de ne pas interpréter une saisie utilisateur comme du code HTML.
- **Vérifications réalisées :** tests avec DOM simulé couvrant l'ajout, la modification, la suppression, le changement d'état, le refus des titres composés d'espaces et l'affichage d'une chaîne HTML comme du texte.
- **Commit :** `067fd89` — Sprint 1 : ajouter la gestion complète des tâches.

### Sprint 2 — Sauvegarde et interface

**Synthèse du prompt :** « Enregistrer les tâches dans localStorage après chaque action et les restaurer au démarrage. Gérer les erreurs de stockage et les données invalides. Ajouter une interface CSS adaptée aux différentes tailles d'écran. »

- **Éléments conservés :** sérialisation JSON, sauvegarde dans `localStorage`, compteur de tâches terminées et présentation visuelle sobre.
- **Éléments modifiés :** validation des données restaurées, traitement des erreurs avec `try/catch`, adaptation de la disposition aux petits écrans et indication visible du focus au clavier.
- **Éléments rejetés :** bibliothèque CSS et service de sauvegarde externe, non nécessaires au périmètre du projet.
- **Vérifications réalisées :** tests avec DOM simulé couvrant la restauration des tâches et de leur état, ainsi que le traitement de données JSON corrompues.
- **Correction issue de la relecture :** l'ordre d'affichage des messages a été ajusté pour préserver le message d'erreur en cas d'échec de sauvegarde. Cette correction est intégrée au commit du sprint 3.
- **Commit :** `27cc5f0` — Sprint 2 : sauvegarder les tâches et ajouter le style responsive.

### Sprint 3 — Connexion et contrôle du mot de passe

**Synthèse du prompt :** « Ajouter une connexion locale et vérifier les critères de composition du mot de passe. Ne pas enregistrer le mot de passe en clair dans localStorage. Présenter les limites d'un mécanisme de connexion exécuté uniquement dans le navigateur. »

- **Éléments conservés :** création d'un compte local, connexion, déconnexion et messages de validation.
- **Éléments modifiés :** longueur de 12 à 128 caractères, présence d'une minuscule, d'une majuscule, d'un chiffre et d'un symbole ; dérivation PBKDF2-SHA-256 avec un sel aléatoire et 600 000 itérations ; prévention des soumissions simultanées.
- **Éléments rejetés :** stockage du mot de passe en clair, simple encodage Base64 et présentation de la connexion locale comme une authentification de production.
- **Vérifications réalisées :** tests avec DOM simulé couvrant les critères du mot de passe, la création du compte, le format du sel et du dérivé, l'absence de mot de passe en clair dans le stockage, le refus d'un mot de passe incorrect, la connexion avec les identifiants attendus et la déconnexion.
- **Commit :** `508c364` — Sprint 3 : ajouter la connexion locale et le contrôle du mot de passe.

## Bilan des vérifications

La syntaxe des scripts JavaScript et les scénarios fonctionnels décrits ci-dessus ont été vérifiés automatiquement avec un DOM simulé. Les tests dans un navigateur réel n'ont pas pu être menés à terme, le dispositif de contrôle du navigateur ayant interrompu l'exécution.

Les points suivants restent à vérifier avant le rendu :

- le rendu sur ordinateur et sur écran étroit ;
- la navigation au clavier dans les formulaires ;
- le parcours complet dans le navigateur : création du compte, gestion des tâches, rechargement et reconnexion ;
- la compréhension du code et la justification des choix techniques par le binôme.

## Publication et traçabilité

Les trois commits de sprint sont publiés dans le dépôt [Projet-Outils-IA](https://github.com/alexisglombard-cyber/Projet-Outils-IA). L'historique et le document de conception de la séance 1 ont été conservés lors de l'intégration.
