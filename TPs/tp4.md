# TP 4

## Objectif du TP
Créer une suite de tests complète pour votre application Todo  en couvrant tous les aspects : composants, hooks, intégrations.

## Prérequis
- Application Todo  fonctionnelle 
- Connaissance de base de Jest

---

## Étape 1 : Configuration de l'environnement de test 
### Installation



---

## Étape 2 : Tests des hooks React Query 

### Consignes :
1. Testez `useFetchTodos` avec différents états
2. Testez `useAddTodo` avec succès/échec
3. Testez `useToggleTodo` avec optimistic updates
4. Mockez les appels API avec MSW

### Points à tester :
- États loading, success, error
- Cache et invalidation
- Optimistic updates et rollback
- Retry automatique

---

## Étape 3 : Tests des composants Redux 

### Consignes :
1. Créez un `renderWithProviders` helper
2. Testez `TodoFilter` avec les actions Redux
3. Testez l'état local vs état serveur
4. Mockez le store Redux

### Scénarios à tester :
- Dispatch des actions de filtre
- Sélecteurs Redux
- Interaction Redux + React Query
- État initial et mis à jour

---

## Étape 4 : Tests d'intégration 

### Consignes :
1. Testez le flow complet CRUD
2. Testez les interactions online/offline
3. Testez la synchronisation des données
4. Simulez les conditions réseau


#### Solutions

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D msw @types/jest vitest jsdom

```



