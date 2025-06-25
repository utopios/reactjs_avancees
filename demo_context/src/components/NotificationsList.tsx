import { useNotifications } from "../contexts/notificationContext";

export const NotificationsList = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="notifications-list">
      {notifications.map((notification) => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
          <button onClick={() => removeNotification(notification.id)}>Close</button>
        </div>
      ))}
    </div>
  );
}