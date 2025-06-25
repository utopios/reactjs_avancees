import { useNotifications } from "../contexts/notificationContext";


export const TestButtons = () => {
  const { addNotification } = useNotifications();

  const handleSuccess = () => {
    addNotification('success', 'This is a success message!');
  };

  const handleError = () => {
    addNotification('error', 'This is an error message!');
  };

  const handleInfo = () => {
    addNotification('info', 'This is an info message!');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success Notification</button>
      <button onClick={handleError}>Show Error Notification</button>
      <button onClick={handleInfo}>Show Info Notification</button>
    </div>
  );
}