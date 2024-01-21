import React, { useState, useEffect } from "react";

const Modal = ({ closeModal, children, closing }: any) => {
  const [closingContainer, setClosingContainer] = useState(false);

  useEffect(() => {
    setClosingContainer(closing);
  }, [closing]);

  const handleCloseModal = () => {
    setClosingContainer(true);
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
      className={`modal-overlay ${closingContainer ? "fade-out" : "fade-in"}`}
      onClick={handleOverlayClick}
    >
      <div className={`modal ${closingContainer ? "fade-out" : "fade-in"}`}>
        <button className="modal-close" onClick={handleCloseModal}>
          <i className="bi bi-x"></i>
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
