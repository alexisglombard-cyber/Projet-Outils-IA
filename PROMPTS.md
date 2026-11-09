# Journal des prompts — TaskFlow

Ce journal décrit les demandes utilisées pour générer le projet. La relecture personnelle et les tests manuels de l'élève restent à faire ; les cases non cochées ne sont pas des validations réalisées.

## Sprint 1 — Gérer les tâches

**Prompt :** « Crée une application TaskFlow en HTML et JavaScript sans framework. Permets de créer, afficher, modifier, supprimer et terminer une tâche. Refuse les titres vides ou composés d'espaces. Affiche les titres avec textContent. »

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
