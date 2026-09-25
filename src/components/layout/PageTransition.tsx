import React, { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useOutlet } from 'react-router-dom';
import SliceTransition from '../animations/SliceTransition';

const PageTransition: React.FC = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <AnimatePresence 
      mode="wait" 
      initial={false}
      onExitComplete={() => {
        // Scroll to top automatically on route change after the old page exits
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }}
    >
      <SliceTransition key={location.pathname}>
        <main className="flex-grow flex flex-col w-full">
          <Suspense fallback={<div className="w-full min-h-screen bg-navy z-0" />}>
            {outlet}
          </Suspense>
        </main>
      </SliceTransition>
    </AnimatePresence>
  );
};

export default PageTransition;