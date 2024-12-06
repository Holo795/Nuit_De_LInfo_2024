# Application Météo - Fonctionnalités

Url: [https://nuitdelinfo.holo795.fr/weather.html](https://nuitdelinfo.holo795.fr/weather.html)

## 1. Fonctionnalités de l'application météo

L'application météo propose plusieurs fonctionnalités pour afficher des informations météo en temps réel et des prévisions :

- **Recherche de villes** : L'utilisateur peut rechercher des villes en utilisant une barre de recherche. Il suffit de saisir le nom de la ville et appuyer sur le bouton de recherche pour obtenir les données météo correspondantes.
  
- **Affichage des conditions météorologiques** :
  - **Nom de la ville** : Le nom de la ville recherchée est affiché.
  - **Description du temps** : Les conditions météorologiques actuelles sont décrites (par exemple, "ensoleillé", "pluvieux").
  - **Température** : La température actuelle est affichée en degrés Celsius.
  - **Humidité** : L'humidité relative est indiquée en pourcentage.
  - **Vitesse du vent** : La vitesse du vent est affichée en km/h.
  
- **Affichage des prévisions** :
  - L'utilisateur peut voir les prévisions météo pour les prochains jours, avec la possibilité de faire défiler les prévisions à l'aide de boutons de navigation (flèches gauche et droite).

- **Localisation géographique** : Un bouton permet à l'utilisateur de récupérer la météo basée sur sa position actuelle, en utilisant la géolocalisation.

- **Animation météo dynamique** :
  - Des animations représentant différentes conditions météorologiques (ensoleillé, pluvieux, brumeux, etc.) sont affichées en fonction des données météorologiques actuelles.
  
- **Style dynamique** : L'interface utilise une combinaison de TailwindCSS et de transitions pour donner un aspect moderne et fluide à l'application.

## 2. Fonctionnalités d'accessibilité

L'application a été conçue avec des considérations d'accessibilité en tête :

- **Contrastes élevés** : L'interface utilise des couleurs avec des contrastes forts (texte blanc sur fond sombre), ce qui facilite la lecture pour les utilisateurs malvoyants.

- **Navigation au clavier** : Les utilisateurs peuvent naviguer entre les éléments de l'application à l'aide du clavier, en particulier pour la barre de recherche et les boutons de navigation des prévisions.

- **Balises de description des éléments** :
  - Des balises `alt` appropriées sont utilisées pour les images, permettant aux lecteurs d'écran de décrire les éléments visuels de l'application.
  - Des icônes sont accompagnées de descriptions textuelles comme "🌍 Ma Localisation" pour fournir un contexte clair.

- **Feedback visuel sur les éléments interactifs** :
  - Les boutons changent de couleur lorsqu'ils sont survolés ou cliqués, améliorant ainsi la visibilité des actions disponibles.
  - Des animations subtiles rendent l'interface plus dynamique tout en restant accessibles et non distrayantes.

- **Adaptabilité** : L'application est responsive et s'adapte à différentes tailles d'écrans, rendant l'interface utilisable sur des appareils mobiles et des ordinateurs de bureau.

---

> **Note** : Ce document est à jour et contient toutes les fonctionnalités essentielles de l'application météo.
