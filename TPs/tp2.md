# TP Formation Redux Toolkit + React Query - Optimisation des Requêtes

## Objectif du TP

Intégrer React Query (TanStack Query) à votre application Todo existante pour optimiser la gestion des données asynchrones. Vous apprendrez à combiner Redux Toolkit pour l'état local et React Query pour le cache serveur.

## Prérequis
- Avoir terminé le TP 1 (application Todo avec Redux Toolkit)
- Application fonctionnelle avec des actions asynchrones

---

## Étape 1 : Installation et configuration initiale

### Installation des dépendances
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### Configuration du QueryClient
**Consignes :**
1. Créez `src/lib/queryClient.js`
2. Configurez le QueryClient avec des options personnalisées
3. Ajoutez le QueryProvider dans `App.js`


---

## Étape 2 : Création des hooks personnalisés

### Consignes :
1. Créez `src/hooks/useTodos.js`
2. Implémentez les hooks pour chaque opération CRUD
3. Gérez les états de loading, error et success

### Hooks à implémenter :

#### `useFetchTodos`
- Récupère la liste des todos
- Gère le cache automatique
- Actualisation en arrière-plan

#### `useAddTodo`
- Ajoute un nouveau todo
- Invalide le cache après succès
- Optimistic updates optionnel

#### `useUpdateTodo`
- Met à jour un todo existant
- Gère le toggle de statut
- Invalidation ciblée du cache

#### `useDeleteTodo`
- Supprime un todo
- Optimistic updates
- Rollback en cas d'erreur

---

## Étape 3 : Refactorisation des composants 

### Consignes :
1. Modifiez `TodoApp.js` pour utiliser les hooks React Query
2. Supprimez les actions asynchrones du slice Redux
3. Gardez Redux uniquement pour l'état local (filtres, UI)


