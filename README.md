# RecetteBox 🍽️

Application mobile React Native permettant de rechercher des recettes, consulter leurs détails et gérer une liste de favoris persistée.

## Stack technique

- Expo (React Native)
- React Navigation (Bottom Tabs + Native Stack)
- Redux Toolkit + RTK Query (API TheMealDB)
- redux-persist + AsyncStorage

## Lancement

```bash
# Installer les dépendances
npm install

# Lancer le projet
npx expo start
```

Puis scanner le QR code avec Expo Go, ou appuyer sur `w` pour lancer la version web.

## Fonctionnalités réalisées 

- [x] Recherche de recettes via l'API
- [x] Liste des résultats avec `FlatList` + `RecipeCard` réutilisable
- [x] Écran détail (image, ingrédients, instructions)
- [x] État global géré avec Redux Toolkit (`favoritesSlice`, `mealApi`)
- [x] Favoris persistés avec `redux-persist` (AsyncStorage)
- [x] Écran "Favoris" avec état vide
- [x] Gestion des états loading / erreur / vide
- [x] Navigation par onglets en bas (Accueil / Favoris)
- [x] Lien vers la vidéo de la recette (YouTube)

## Bonus réalisés 

- [x] TabNavigator en bas (Accueil / Favoris)
- [x] Lien vidéo
- [x] Bouton "Recette au hasard"

## Non fait / pistes d'amélioration

- Filtrage par catégorie (endpoint identifié, pas encore intégré)
- Thème sombre
- Animations sur les transitions d'écran

## Difficultés rencontrées

- **Navigation imbriquée (Tab + Stack)** : comprendre comment naviguer vers un écran (`Detail`) qui se trouve dans un `Stack` lui-même imbriqué dans un `Tab` a demandé plusieurs essais. La syntaxe `navigation.navigate('HomeTab', { screen: 'Detail', params: {...} })` n'est pas intuitive au premier abord.


- **Typage TypeScript de la navigation** : bien différencier `NativeStackScreenProps` (pour les écrans dans un Stack) et `BottomTabScreenProps` (pour les écrans dans un Tab) selon l'emplacement de l'écran dans l'arborescence.


- **Ingrédients de l'API TheMealDB** : les ingrédients sont renvoyés sous forme de 20 champs séparés (`strIngredient1` à `strIngredient20`), il a fallu écrire une fonction utilitaire pour les transformer en tableau exploitable.


- **Clés dupliquées dans une `FlatList`** : certains ingrédients identiques (ex: "Sugar") provoquaient une erreur de clé React — résolu en utilisant l'index comme clé.
