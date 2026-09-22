import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepContact, StepService, StepDetails, StepResult } from './Steps';
import { calculateEstimate, submitEstimationLead, type EstimationLead } from '../../utils/calculateEstimate';
import { estimationServices } from './estimationConfig';

interface EstimationFormProps {
  onClose: () => void;
}

export const EstimationForm: React.FC<EstimationFormProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<EstimationLead>>({
    projectDetails: {},
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (stepIndex === 0) {
      if (!formData.name?.trim()) {
        newErrors.name = 'Please enter your name.';
        isValid = false;
      }
      const phoneRegex = /^[0-9]{10}$/;
      if (!formData.phone || !phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number.';
        isValid = false;
      }
    } else if (stepIndex === 1) {
      if (!formData.service) {
        newErrors.service = 'Please select a service.';
        isValid = false;
      }
    } else if (stepIndex === 2) {
      const details = formData.projectDetails || {};
      const service = formData.service;
      if (service === 'kitchen' || service === 'wardrobe') {
        if (!details.type) {
           newErrors.type = 'Please select a type.';
           isValid = false;
        }
      }
      if (service === 'full-home') {
        if (!details.bedrooms) {
           newErrors.bedrooms = 'Please select the number of bedrooms.';
           isValid = false;
        }
        if (!details.area) {
           newErrors.area = 'Please provide the approximate area.';
           isValid = false;
        }
      }
      if (service !== 'full-home') {
         if (!details.width && !details.length && !details.height) {
            newErrors.width = 'Dimensions are required.';
            newErrors.length = 'Dimensions are required.';
            isValid = false;
         }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        setIsSubmitting(true);
        const calcResult = calculateEstimate(formData.service!, formData.projectDetails!);
        setEstimate(calcResult);
        
        const lead: EstimationLead = {
          name: formData.name!,
          phone: formData.phone!,
          email: formData.email,
          service: formData.service!,
          projectDetails: formData.projectDetails!,
          estimate: calcResult || undefined,
        };
        await submitEstimationLead(lead);
        setIsSubmitting(false);
        setCurrentStep((prev) => prev + 1);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
    }
  };

  // Fixed: Added `|| ''` to ensure it always evaluates to a string, satisfying StepResult's props
  const serviceName = formData.service 
    ? estimationServices.find((s) => s.id === formData.service)?.title || ''
    : '';

  return (
    <div className="flex flex-col h-full">
      {/* Header / Progress */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-primary text-3xl md:text-4xl text-navy">
            {currentStep === 0 && "Let's plan your space."}
            {currentStep === 1 && "What do you need?"}
            {currentStep === 2 && "Project Details"}
            {currentStep === 3 && "Your Estimate"}
          </h2>
          {currentStep < 3 && (
            <span className="font-body text-navy/60 text-sm mt-1 block">
              Step {currentStep + 1} of 3
            </span>
          )}
        </div>
        {currentStep < 3 && (
          <button 
            onClick={onClose}
            aria-label="Close estimation calculator"
            className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center hover:bg-navy/10 transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Form Content Wrapper */}
      <div className="flex-grow overflow-y-auto overflow-x-hidden px-1 -mx-1 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {currentStep === 0 && <StepContact formData={formData} setFormData={setFormData} errors={errors} />}
            {currentStep === 1 && <StepService formData={formData} setFormData={setFormData} errors={errors} />}
            {currentStep === 2 && <StepDetails formData={formData} setFormData={setFormData} errors={errors} />}
            {currentStep === 3 && <StepResult estimate={estimate} serviceName={serviceName} onClose={onClose} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      {currentStep < 3 && (
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-navy/10">
          <button
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            className={`font-body text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
              currentStep === 0 ? 'text-transparent cursor-default' : 'text-navy hover:bg-navy/5 cursor-pointer'
            }`}
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className={`font-body text-sm font-semibold px-8 py-3 rounded-full transition-all flex items-center justify-center min-w-[120px] ${
              isSubmitting 
                ? 'bg-brand/50 text-navy cursor-wait'
                : 'bg-brand text-navy hover:bg-brand-dark hover:text-white cursor-pointer shadow-md hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : currentStep === 2 ? 'Calculate' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};