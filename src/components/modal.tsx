'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  //   const [showModal, setShowModal] = useState(false);
  if (!isOpen) return null;
  console.log('isOpen', isOpen);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
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
