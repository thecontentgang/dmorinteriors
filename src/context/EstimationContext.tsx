/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface EstimationContextType {
  isEstimationOpen: boolean;
  openEstimation: () => void;
  closeEstimation: () => void;
}

const EstimationContext = createContext<EstimationContextType | undefined>(undefined);

export const EstimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEstimationOpen, setIsEstimationOpen] = useState(false);

  const openEstimation = () => setIsEstimationOpen(true);
  const closeEstimation = () => setIsEstimationOpen(false);

  return (
    <EstimationContext.Provider value={{ isEstimationOpen, openEstimation, closeEstimation }}>
      {children}
    </EstimationContext.Provider>
  );
};

export const useEstimation = (): EstimationContextType => {
  const context = useContext(EstimationContext);
  if (context === undefined) {
    throw new Error('useEstimation must be used within an EstimationProvider');
  }
  return context;
};
