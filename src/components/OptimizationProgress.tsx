import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
}

interface OptimizationProgressProps {
  steps: Step[];
}

export function OptimizationProgress({ steps }: OptimizationProgressProps) {
  return (
    <div className="w-full max-w-xl">
      {steps.map((step, index) => (
        <div 
          key={step.title} 
          className={`flex items-start gap-4 mb-6 transition-all duration-500 ease-in-out ${
            step.status === 'pending' ? 'opacity-50' : 'opacity-100'
          }`}
          style={{
            transform: `translateX(${step.status === 'pending' ? '-10px' : '0'})`,
          }}
        >
          <div className="relative">
            {step.status === 'completed' ? (
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1 animate-scale-check" />
            ) : (
              <Circle
                className={`w-6 h-6 flex-shrink-0 mt-1 transition-colors duration-300 ${
                  step.status === 'processing'
                    ? 'text-navy-600 animate-pulse'
                    : 'text-navy-300'
                }`}
              />
            )}
            {index < steps.length - 1 && (
              <div className={`absolute left-3 top-6 w-0.5 h-12 transition-colors duration-300 ${
                step.status === 'completed' ? 'bg-green-500' : 'bg-navy-200'
              }`} />
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-medium transition-colors duration-300 ${
              step.status === 'processing' ? 'text-navy-900' : 'text-navy-800'
            }`}>
              {step.title}
            </h3>
            <p className="text-sm text-navy-500 mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}