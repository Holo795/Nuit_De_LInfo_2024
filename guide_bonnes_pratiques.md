
# Guide des Bonnes Pratiques de Développement Web

## Table des Matières
1. [Introduction](#introduction)
2. [Hiérarchisation et Organisation du Projet](#hiérarchisation-et-organisation-du-projet)
3. [HTML : Bonnes Pratiques](#html--bonnes-pratiques)
4. [CSS : Bonnes Pratiques (Fichiers Découplés)](#css--bonnes-pratiques-fichiers-découplés)
5. [JavaScript : Bonnes Pratiques](#javascript--bonnes-pratiques)
6. [Git : Bonnes Pratiques et Règles de Nommage](#git--bonnes-pratiques-et-règles-de-nommage)
7. [Conclusion](#conclusion)

---

## Introduction
Ce document sert de guide pour standardiser les pratiques de développement au sein de l'équipe. Suivre ces recommandations garantit une meilleure organisation, une collaboration efficace, et une évolutivité du projet.

---

## Hiérarchisation et Organisation du Projet
Adoptez une structure de fichiers claire et logique :
```
/project-root
├── /css              (Fichiers CSS découplés par page)
├── /js               (Scripts JS, organisés par fonctionnalités)
├── /images           (Images et ressources visuelles)
├── /assets           (Polices, icônes ou autres fichiers nécessaires)
├── index.html        (Page principale)
├── about.html        (Exemple de page supplémentaire)
└── README.md         (Documentation du projet)
```

### Conseils :
- Divisez les fichiers en sections logiques pour faciliter la maintenance.
- Utilisez des noms explicites et en anglais pour vos fichiers et dossiers (ex. : `contact.css` plutôt que `style2.css`).

---

## HTML : Bonnes Pratiques
1. Utilisez des balises **sémantiques** (`<header>`, `<main>`, `<footer>`) pour améliorer l'accessibilité.
2. Structurez vos fichiers avec des commentaires :
   ```html
   <!-- Section : Header -->
   <header>
       <h1>Mon Site</h1>
   </header>
   ```
3. Respectez une indentation de 2 espaces par niveau.
4. Assurez-vous que chaque page HTML inclut ces éléments :
   - Doctype (`<!DOCTYPE html>`)
   - Meta tags pour l'encodage et la responsivité :
     ```html
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     ```

---

## CSS : Bonnes Pratiques (Fichiers Découplés)
Adoptez une approche modulable pour vos styles CSS :
1. **Structurez vos fichiers :**
   ```
   /css
   ├── global.css       (Styles communs : typographie, layout global)
   ├── home.css         (Spécifique à la page d'accueil)
   ├── about.css        (Spécifique à la page "À propos")
   ```

2. **Bonnes pratiques CSS :**
   - Utilisez des variables CSS pour centraliser les couleurs et polices :
     ```css
     :root {
         --main-color: #3498db;
         --secondary-color: #2ecc71;
     }
     ```
   - Respectez la convention **BEM (Block, Element, Modifier)** pour les classes :
     ```css
     .card {
         border: 1px solid #ddd;
     }
     .card__header {
         font-size: 1.5rem;
     }
     .card--active {
         border-color: var(--main-color);
     }
     ```
   - Chargez les fichiers CSS spécifiques dans vos pages :
     ```html
     <link rel="stylesheet" href="css/global.css">
     <link rel="stylesheet" href="css/home.css">
     ```

---

## JavaScript : Bonnes Pratiques
1. **Structurez votre code** :
   - Utilisez un fichier principal `/js/app.js` pour les fonctionnalités globales.
   - Créez des fichiers spécifiques pour des modules ou pages :
     ```
     /js
     ├── app.js           (Script global)
     ├── home.js          (Spécifique à la page d'accueil)
     ├── contact.js       (Pour la page "Contact")
     ```
   - Utilisez les modules ES6 pour organiser le code :
     ```javascript
     // Exemple d'import de module
     import { calculateTotal } from './utils.js';
     calculateTotal(100);
     ```

2. **Bonnes pratiques :**
   - Respectez une indentation de 2 espaces.
   - Utilisez `const` et `let` au lieu de `var`.
   - Vérifiez que tout code JS est exécuté après le chargement du DOM :
     ```javascript
     document.addEventListener("DOMContentLoaded", () => {
         console.log("DOM prêt !");
     });
     ```

---

## Git : Bonnes Pratiques et Règles de Nommage
1. **Organisation des branches** :
   - Suivez un modèle de branches clair, comme **Git Flow** :
     ```
     main       (Version stable du projet)
     dev        (Développement en cours)
     feature/   (Nouvelles fonctionnalités)
     fix/       (Corrections de bugs)
     ```
   - Exemple de noms de branches :
     - `feature/add-login-page`
     - `fix/header-responsive`

2. **Règles de commit** :
   - Écrivez des messages clairs et explicites :
     ```
     [Type] Description
     Exemple : [Feature] Ajout de la page de contact
     ```
   - Exemple de types de commits :
     - `[Feature]` : Nouvelle fonctionnalité
     - `[Fix]` : Correction de bug
     - `[Refactor]` : Réorganisation du code
     - `[Update]` : Mise à jour de la documentation

3. **Processus de travail Git :**
   - Travaillez dans des branches spécifiques pour éviter de casser le code sur `main`.
   - Effectuez un `pull` avant de commencer à travailler.
   - Soumettez vos modifications via des pull requests (PR) et faites-les relire. (En fonction du temps disposé)

4. **Exemple de workflow quotidien :**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nom-de-la-feature
   # Travaillez sur votre code...
   git add .
   git commit -m "[Feature] Description claire"
   git push origin feature/nom-de-la-feature
   ```
  Ensuite, ouvrir une pull request sur github.
  Puis, attendre la validation de la pull request par un autre membre de l'équipe. (En fonction du temps disposé)

---

