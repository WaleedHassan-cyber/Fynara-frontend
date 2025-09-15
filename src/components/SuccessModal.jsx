import React, { useEffect, useState } from "react";
import "./SuccessModal.css";

const SuccessModal = ({ show, onClose, productName }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (show) {
      // delay to trigger tick after spinner
      const timer = setTimeout(() => setAnimate(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className={`checkmark-container ${animate ? "done" : ""}`}>
          {!animate ? (
            <div className="spinner"></div>
          ) : (
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
            </svg>
          )}
        </div>
        <h2>{productName}</h2>
        <p>is added to cart !</p>
        <button className="ok-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default SuccessModal;
