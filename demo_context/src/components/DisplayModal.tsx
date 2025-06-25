import { useState } from "react";
import { CustomModal } from "./CustomModal";

export const DisplayModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Open Modal</button>
      {show && (
        <CustomModal onClose={() => setShow(false)}>
          <h2>Je suis une modale</h2>
        </CustomModal>
      )}
    </>
  );
};
