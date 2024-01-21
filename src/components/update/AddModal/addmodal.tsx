import { useState, useEffect } from "react";
import Add from "../../../pages/Add/Add";

const AddModal = ({ closeModal, type }: any) => {
  const [closing, setClosing] = useState(false);

  const handleCloseModal = () => {
    setClosing(true);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  const handleOverlayClick = (e: any) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`modal-overlay ${closing ? "fade-out" : "fade-in"}`}
      onClick={handleOverlayClick}
    >
      <div className={`modal ${closing ? "fade-out" : "fade-in"}`}>
        <button className="modal-close" onClick={handleCloseModal}>
          <i className="bi bi-x"></i>
        </button>
        <div className="modal-content">
          <Add closeModal={handleCloseModal} type={type} />
        </div>
      </div>
    </div>
  );
};

export default AddModal;
