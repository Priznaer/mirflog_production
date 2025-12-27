import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./modals.css";
import { useEffect, useState } from 'react';


export function Modal({ children, close_destination="/" }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [])
    
    const navigate = useNavigate();

    const closeModal = () => {
        navigate(close_destination);
        document.body.style.overflow = "";
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };
    
    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content-container" onClick={handleContentClick}>
                <div className="close-icon-container">
                    <FontAwesomeIcon icon={faX} onClick={closeModal} />
                </div>
                { children }
            </div>
        </div>
    )
}


export function NotificationModal({
  timeout = 5000, children, okHandler, onClose
}) {
    const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
      // Show the modal with a slight delay to trigger CSS transition
      setTimeout(() => setIsVisible(true), 10);
      
      // Setup timeout for closing
    const timer = setTimeout(() => {
      handleClose();
    }, timeout);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Trigger fade-out
    setIsVisible(false);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      if (okHandler && typeof okHandler === "function") {
        okHandler();
      }
      if (onClose) {
        onClose();
      }
    }, 300); // Match the CSS transition duration
  };

  return (
    <div className={`modal-backdrop ${isVisible ? 'show' : 'hide'}`} onClick={handleClose}>
      <div className={`modal-content ${isVisible ? 'show' : 'hide'}`} onClick={e => e.stopPropagation()} >
        { children }
        <button type='button' className='cta' onClick={handleClose} > Okay </button>
      </div>
    </div>
  );
};
