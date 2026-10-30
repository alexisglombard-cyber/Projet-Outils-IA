# TaskFlow

Mini-application web de gestion de tâches, conçue en binôme avec l'aide de l'IA (cours Outils IA · Bachelor 1).

- **Équipe :** Manyl et Alexis
- **Filière :** Cybersécurité
- **Technologies :** HTML, CSS, JavaScript
- **État :** conception du projet (application non encore développée)

## Cahier des charges

### Fonctionnalités de base

| Fonction | Description |
|---|---|
| Créer | Ajouter une tâche (titre, priorité, échéance). Un titre vide est refusé. |
| Afficher | Voir toutes les tâches avec leur priorité et leur date. |
| Modifier | Changer le titre, la priorité ou la date d'une tâche existante. |
| Terminer | Cocher une tâche faite : elle apparaît barrée. |
| Supprimer | Retirer une tâche de la liste, après confirmation. |
| Sauvegarder | Retrouver ses tâches après avoir fermé le navigateur (`localStorage`). |

### Fonctionnalité filière : Cybersécurité

Base du cours :
- écran de connexion avant d'accéder aux tâches ;
- contrôle de robustesse du mot de passe : au moins 8 caractères, une majuscule, un chiffre et un caractère spécial ;
- jauge faible / moyen / fort ;
- bonus envisagé : blocage temporaire après 3 échecs.

**Nos règles de mot de passe proposées :**
1. Au moins 8 caractères.
2. Au moins une lettre majuscule et un chiffre.
3. Au moins un caractère spécial parmi `! @ # $ % & * ? _ -`.

**Choix proposés pour la jauge :**
- **Faible** : moins de 8 caractères ou moins de 3 catégories parmi minuscules, majuscules, chiffres, spéciaux.
- **Moyen** : au moins 8 caractères et les 4 catégories, mais moins de 12 caractères.
- **Fort** : au moins 12 caractères et les 4 catégories.

La jauge est un indicateur pédagogique, et non une mesure fiable de la résistance à toutes les attaques. Un mot de passe ne peut être accepté que s'il respecte toutes les règles ci-dessus, même si la jauge indique « moyen ».

**Connexion et limites :** sans serveur ni base de données, l'écran de connexion sera une **simulation locale**, adaptée à une démonstration pédagogique et non à la protection de données sensibles. Le projet ne stockera aucun vrai mot de passe utilisateur. Ne pas présenter cette simulation comme une authentification sécurisée.

### Cadre technique

- HTML, CSS et JavaScript, sans framework.
- `localStorage` pour la sauvegarde des tâches de démonstration.
- Pas de serveur ni de base de données.
- Pas de bibliothèque externe.
- Pas de données personnelles réelles dans l'application.

## User stories

### Itération 1 — Gestion minimale des tâches

1. **US01 — Ajouter :** En tant qu'utilisateur, je veux créer une tâche avec un titre, une priorité et une échéance, afin de planifier mon travail. **Acceptation :** un titre vide est refusé ; une tâche valide est ajoutée à la liste.
2. **US02 — Consulter :** En tant qu'utilisateur, je veux afficher mes tâches avec leur priorité et leur date, afin de connaître ce que j'ai à faire. **Acceptation :** toutes les tâches enregistrées sont visibles.
3. **US03 — Terminer :** En tant qu'utilisateur, je veux marquer une tâche comme terminée, afin de suivre mon avancement. **Acceptation :** une tâche terminée apparaît barrée et peut être réactivée.

### Itération 2 — Modification et persistance

4. **US04 — Modifier / supprimer :** En tant qu'utilisateur, je veux modifier ou supprimer une tâche, afin de tenir ma liste à jour. **Acceptation :** les modifications sont visibles ; la suppression demande confirmation.
5. **US05 — Sauvegarder :** En tant qu'utilisateur, je veux retrouver mes tâches après avoir fermé puis rouvert le navigateur, afin de ne pas perdre ma liste. **Acceptation :** les données de démonstration sont conservées via `localStorage` sur le même navigateur.

### Itération 3 — Spécificité cybersécurité

6. **US06 — Accès :** En tant qu'utilisateur, je veux voir un écran de connexion simulé avant la liste de tâches, afin de comprendre la notion de contrôle d'accès. **Acceptation :** la liste n'est pas affichée avant la validation de la démonstration ; le fonctionnement reste explicitement présenté comme non sécurisé.
7. **US07 — Robustesse :** En tant qu'utilisateur, je veux connaître les règles et voir une jauge faible / moyen / fort lorsque je saisis un mot de passe fictif, afin d'apprendre à créer un mot de passe plus robuste. **Acceptation :** les 3 niveaux sont affichés ; les règles de validation sont expliquées ; aucun mot de passe réel n'est enregistré.

## Architecture prévue

```text
TaskFlow/
├── index.html                 # page et écran de connexion de démonstration
├── css/
│   └── style.css              # affichage et responsive
├── js/
│   ├── app.js                 # interface et événements
│   ├── tasks.js               # ajout, affichage, modification, suppression
│   ├── storage.js             # lecture/écriture localStorage
│   └── security-demo.js       # simulation d'accès et jauge pédagogique
├── README.md
└── PROMPTS.md
```

### Modèle de données (objet JavaScript, sans base de données)

```json
{
  "id": "task-001",
  "title": "Préparer le rendu",
  "priority": "haute",
  "dueDate": "2026-11-05",
  "completed": false
}
```

- Une liste d'objets `task` sera sauvegardée sous la clé `taskflow_tasks` dans `localStorage`.
- `id` identifie la tâche ; `title` est non vide ; `priority` vaut `basse`, `moyenne` ou `haute` ; `dueDate` est une date au format `AAAA-MM-JJ` ; `completed` est un booléen.
- **À critiquer en binôme :** fonctionnement sur un seul navigateur, absence de véritable authentification, suppression définitive, accessibilité de l'interface, gestion des dates invalides.

## Ce que nous proposons de refuser (à valider en binôme)

| Proposition non retenue | Pourquoi nous proposons de la refuser |
|---|---|
| Synchronisation cloud | Hors périmètre : le cours impose `localStorage` et aucun serveur. |
| Base SQLite | Incompatible avec la contrainte « pas de base de données ». |
| Authentification réelle | Impossible à garantir en HTML/CSS/JavaScript côté navigateur uniquement ; la connexion doit rester une simulation pédagogique. |
| Framework frontend | Le cours impose du JavaScript sans framework. |

## Journal des prompts

Voir [PROMPTS.md](PROMPTS.md).

