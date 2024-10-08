'use client';

import { createPortal } from 'react-dom';
import { MouseEvent, useEffect, useState } from 'react';
type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  const [render, setRender] = useState(false);
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  // if (!isOpen) return null;
  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  if (!render || !isOpen) return null;

  const modalContainer = document.querySelector('#modal-container');

  if (!modalContainer) return null;

  return createPortal(
    isOpen && (
      <div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="relative rounded-lg bg-white p-6 shadow-lg">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    ),
    // document.body
    modalContainer
  );
}

// ('use client');

// import React from 'react';
// import ReactDOM from 'react-dom';

// type ModalProps = {
//   children: React.ReactNode;
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function Modal({ children, isOpen, onClose }: ModalProps) {
//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="relative rounded-lg bg-white p-6 shadow-lg">
//         <button
//           onClick={onClose}
//           className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
//         >
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// }
