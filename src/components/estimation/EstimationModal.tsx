import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEstimation } from '../../context/EstimationContext';
import { EstimationForm } from './EstimationForm';

export const EstimationModal: React.FC = () => {
  const { isEstimationOpen, closeEstimation } = useEstimation();

  // Prevent background scrolling when open
  useEffect(() => {
    if (isEstimationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isEstimationOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEstimationOpen) {
        closeEstimation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEstimationOpen, closeEstimation]);

  return (
    <AnimatePresence>
      {isEstimationOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeEstimation}
            className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-sm flex justify-center items-center p-4 md:p-6"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex justify-center items-center p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-cream rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-brand/20 p-6 md:p-10 pointer-events-auto max-h-full overflow-hidden flex flex-col"
            >
              <EstimationForm onClose={closeEstimation} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
