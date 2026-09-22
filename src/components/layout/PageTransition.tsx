import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    enter: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] } 
    },
    exit: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -10, 
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] } 
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
