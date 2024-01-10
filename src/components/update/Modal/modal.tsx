import { Children, useState } from "react";

const Modal = ({ closeModal, children }: any) => {
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
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;