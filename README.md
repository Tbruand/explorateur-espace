# Explorateur de l'Espace 🌌

## Description

**Explorateur de l'Espace** est un projet interactif visant à explorer le système solaire, les planètes et les missions spatiales. Ce projet a été conçu dans le but d'apprendre à utiliser **Three.js** pour les visualisations 3D, approfondir mes connaissances sur l'utilisation des **API**, et perfectionner mes compétences en **React.js**.

Le projet propose une expérience utilisateur enrichissante avec des éléments visuels en 3D, un système de navigation fluide, et des données provenant d'API et de fichiers JSON.

---

## Fonctionnalités

- **Système Solaire en 3D** :

  - Visualisation interactive avec **Three.js**.
  - Zoom directionnel pour explorer les planètes éloignées.
  - Animation des orbites des planètes à des vitesses réalistes.
  - Ajout aléatoire de comètes pour plus de dynamisme.

- **Planètes** :

  - Informations détaillées pour chaque planète.
  - Modèles 3D rotatifs intégrés dans les cartes des planètes.
  - Description des caractéristiques physiques (diamètre, température, etc.).

- **Missions spatiales** :

  - Affichage des missions spatiales avec un défilement infini.
  - Données des missions intégrées à partir d'un fichier JSON.

- **Interface Utilisateur** :

  - Navbar avec un menu burger pour les écrans mobiles.
  - Responsive design pour s'adapter à toutes les tailles d'écran.

---

## Installation

### Pré-requis

- Node.js (v16+ recommandé)
- npm ou yarn installé sur votre machine

### Étapes

1. Clonez ce dépôt :

   ```bash
   git clone https://github.com/Tbruand/explorateur-espace.git
   cd explorateur-espace
   ```

2. Installez les dépendances :

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Lancez l'application en mode développement :

   ```bash
   npm start
   # ou
   yarn start
   ```

4. Accédez à l'application dans votre navigateur à l'adresse : [http://localhost:3000](http://localhost:3000)

---

## Modules utilisés

- **React** : Librairie pour construire l'interface utilisateur.
- **React Router** : Gestion des routes pour naviguer entre les différentes pages.
- **Three.js** : Bibliothèque pour la création des visualisations 3D.
- **Framer Motion** : Animation fluide pour les transitions entre les pages et les éléments.
- **Tailwind CSS** : Framework CSS pour un design rapide et réactif.

---

## Fichiers importants

- `src/components/` : Contient les composants réutilisables (Navbar, Footer, Planet3D, etc.).
- `src/pages/` : Contient les différentes pages du projet (Accueil, Planètes, Système Solaire, Missions).
- `src/data/missions.json` : Fichier contenant les données des missions spatiales.
- `src/utils/` : Fonctions utilitaires, par exemple pour les appels d'API.

---

## Fichiers JSON

Le fichier JSON des missions se trouve dans le dossier `src/data/missions.json`. Il contient des données descriptives et des liens vers les images des missions.

---

## Objectifs pédagogiques

- **Three.js** : Apprendre les bases de la création d'une scène 3D interactive, incluant les lumières, les matériaux et les animations.
- **API** : Approfondir la compréhension des appels d'API REST, du traitement des réponses JSON et de la gestion des erreurs.
- **React** : Renforcer mes compétences dans la gestion des états, les hooks, et l'organisation d'un projet React modulaire.

---

## Aperçu du Projet

### Système solaire 3D :

![Système solaire 3D](screenshots/SolarSystem.png)

### Page des planètes :

![Page des planètes](screenshots/planetes.png)

### Page des missions :

![Page des missions](screenshots/Missions.png)

---

## Auteur

Si vous avez des suggestions ou des remarques, n'hésitez pas à me contacter via [GitHub](https://github.com/Tbruand).
