import type { ReactNode } from 'react';

import './ModalWindow.scss';

interface props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function ModalWindow({ isOpen, onClose, children }: props) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button type="button" className="close-button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
