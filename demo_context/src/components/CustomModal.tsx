import ReactDOM from "react-dom";

export const CustomModal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null; // Ensure modalRoot exists
  }

  return ReactDOM.createPortal(
    <div className="custom-modal">
      {children}
      <button onClick={onClose}>Close</button>
    </div>,
    modalRoot
  );
}