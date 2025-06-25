## 📝 **Exercice Context API - Système de Notifications**

### **Objectif**
Créer un contexte TypeScript pour gérer un système de notifications globales avec différents types et positions d'affichage.

### **Contraintes TypeScript**
1. **Types stricts** pour tous les objets
2. **Interface complète** du contexte  
3. **Hook personnalisé** avec validation
4. **Gestion d'erreurs** TypeScript

### **Fonctionnalités à implémenter**

#### **Types à définir :**
```typescript
// Types de notifications
type NotificationType = 'success' | 'error' | 'warning' | 'info';

// Positions d'affichage
type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

// Notification
interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // millisecondes
  autoClose?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
}

// Configuration globale
interface NotificationConfig {
  position: NotificationPosition;
  defaultDuration: number;
  maxNotifications: number;
  enableSound: boolean;
}
```

#### **Fonctions du contexte :**
- `addNotification(options)` - retourne l'id
- `removeNotification(id: string)`
- `clearAllNotifications()`




