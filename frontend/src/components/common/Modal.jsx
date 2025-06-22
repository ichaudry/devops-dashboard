// src/components/common/Modal.jsx
import { useEffect, useRef } from 'react';

export default function Modal({ show, onClose, title, children }) {
  const modalRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (show) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [show]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-[#1e293b] text-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative animate-fadeIn"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <div className="max-h-[70vh] overflow-y-auto pr-2">{children}</div>
      </div>
    </div>
  );
}
