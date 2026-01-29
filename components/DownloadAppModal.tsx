'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  appStoreUrl: string;
  playStoreUrl: string;
  modalTitle: string;
  downloadAppStoreLabel: string;
  downloadPlayStoreLabel: string;
}

export default function DownloadAppModal({
  isOpen,
  onClose,
  appStoreUrl,
  playStoreUrl,
  modalTitle,
  downloadAppStoreLabel,
  downloadPlayStoreLabel,
}: DownloadAppModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !mounted || typeof document === 'undefined') return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100]" aria-hidden={!isOpen}>
      {/* Backdrop - covers full viewport */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Dialog - centered on screen */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
        className="absolute left-1/2 top-1/2 z-[101] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="download-modal-title" className="text-xl font-bold text-gray-900">
            {modalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-200"
            aria-label="Close"
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3.5 text-white hover:bg-gray-800 transition-colors font-medium"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <span>{downloadAppStoreLabel}</span>
          </a>
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3.5 text-white hover:bg-gray-800 transition-colors font-medium"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.12L14.54,12.85L17.19,10.58L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
            <span>{downloadPlayStoreLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
