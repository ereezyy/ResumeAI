import { useMemo } from 'react';
import { STEPS } from '../lib/constants';

export function useSteps(currentStep: number) {
  return useMemo(() => 
    STEPS.map((step, index) => ({
      ...step,
      status: currentStep >= index 
        ? (currentStep === index ? 'processing' : 'completed') 
        : 'pending'
    })), 
    [currentStep]
  );
}