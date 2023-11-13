import React from "react";
import "./ErrorModal.css";

const ErrorModal = ({ title, message, closeModal }) => {
 return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;
