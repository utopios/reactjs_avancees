# TP Formation React - Optimisation et Découpage de Composants

## Objectif du TP
Suite au TP Redux Toolkit, vous allez maintenant optimiser l'application Todo en découpant les composants et en appliquant les techniques d'optimisation React : `useMemo`, `useCallback`, et `React.memo`.

## Pré-requis
- Avoir terminé le TP Redux Toolkit précédent
- Application Todo fonctionnelle avec Redux Toolkit

---

## Étape 1 : Analyse des problèmes de performance

### Consignes
1. **Ajoutez des logs de rendu** dans votre composant `TodoApp` actuel pour observer les re-rendus
2. **Testez les actions suivantes** et comptez combien de fois le composant se re-rend :
   - Taper dans l'input (chaque caractère)
   - Ajouter une todo
   - Cocher/décocher une todo
   - Changer de filtre
   - Supprimer une todo

3. **Constatez le problème** : Le composant principal se re-rend à chaque action !

---

## Étape 2 : Découpage en composants 

### Consignes
Découpez votre application monolithique en plusieurs composants spécialisés :

#### Exemples
`src/components/TodoInput.js`
**Responsabilité :** Gérer uniquement l'ajout de nouvelles todos

`src/components/FilterButtons.js`
**Responsabilité :** Gérer uniquement les boutons de filtrage

`src/components/TodoList.js`
**Responsabilité :** Afficher la liste des todos filtrées

`src/components/TodoItem.js`
**Responsabilité :** Afficher une todo individuelle avec ses actions

--- 

## Étape 3 : Optimisation des performances 

### Consignes
Maintenant que votre application est découpée, optimisez-la en utilisant les techniques React appropriées 