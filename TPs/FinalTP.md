**TP Final : Mini application de gestion de livres avec optimisations**

---

### Objectif

Créer une application React qui permet de :

1. Afficher une liste de livres récupérés via une fausse API (React Query).
2. Ajouter un livre via un formulaire (Redux Toolkit + React Query mutation).
3. Filtrer les livres par auteur (Redux Toolkit).
4. Gérer les préférences de tri via React Context.
5. Mettre en place des optimisations de performance pour améliorer le rendu.

---

### Détails techniques

**1. Liste des livres**

* Chaque livre contient : `id`, `titre`, `auteur`, `annee`.
* Utiliser React Query pour faire une requête GET.
* API exemple : `https://fakeapi.platzi.com/books` (ou simuler localement).

**2. Ajout d’un livre**

* Formulaire avec les champs `titre`, `auteur`, `annee`.
* Utiliser Redux Toolkit pour gérer l’état global (par exemple : message de confirmation, statut d’envoi).
* Utiliser React Query pour une mutation POST simulée.

**3. Filtrage**

* Champ de texte permettant de filtrer les livres affichés par nom d’auteur.
* Gérer le filtre avec Redux Toolkit.

**4. Contexte : gestion des préférences de tri**

* Créer un React Context pour stocker et fournir les critères de tri (`titre`, `auteur`, `annee`, sens croissant/décroissant).
* Fournir ce contexte à tous les composants concernés.
* Mettre en place un sélecteur de tri (dropdown ou boutons).

**5. Optimisations à intégrer**

* Utiliser `React.memo` pour éviter les re-render inutiles de composants d’affichage.
* Utiliser `useMemo` pour mémoriser la liste triée et filtrée des livres.
* Utiliser `useCallback` pour éviter la recréation des fonctions passées en props.
* Activer le cache et la gestion fine du refetch dans React Query (`staleTime`, `cacheTime`, `refetchOnWindowFocus`, etc).
* Séparer les composants en unités cohérentes pour limiter les re-rendus.

---

**Technologies et outils**

* React avec hooks
* Redux Toolkit (store, slice, useDispatch, useSelector)
* React Query (useQuery, useMutation, QueryClient)
* React Context (useContext, Provider)
* Mécanismes de mémoïsation et analyse des performances (React DevTools Profiler)
