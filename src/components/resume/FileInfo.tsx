import React from 'react';
import { ProcessingAnimation } from '../ProcessingAnimation';

interface FileInfoProps {
  file: File;
  isOptimizing: boolean;
  currentStep: number;
}

export function FileInfo({ file, isOptimizing, currentStep }: FileInfoProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-navy-50 rounded-lg">
      <div className="flex-1">
        <p className="font-medium text-navy-800">{file.name}</p>
        <p className="text-sm text-navy-500">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
      {isOptimizing && currentStep < 3 && <ProcessingAnimation />}
    </div>
  );
}