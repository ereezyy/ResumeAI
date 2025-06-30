import React from 'react';
import { FileUpload } from './FileUpload';
import { OptimizationProgress } from './OptimizationProgress';
import { FileInfo } from './resume/FileInfo';
import { TemplateSection } from './resume/TemplateSection';
import { ResultSection } from './resume/ResultSection';
import { useSteps } from '../hooks/useSteps';
import type { ATSIssue } from '../lib/utils/atsChecker';
import type { ValidationError } from '../lib/utils/validation';

interface ResumeProcessorProps {
  file: File | null;
  isOptimizing: boolean;
  currentStep: number;
  optimizedContent: string;
  selectedTemplate: string;
  atsIssues: ATSIssue[];
  onFileSelect: (file: File) => void;
  onError: (error: ValidationError) => void;
  onDownload: () => void;
  onTemplateSelect: (templateId: string) => void;
}

export function ResumeProcessor({
  file,
  isOptimizing,
  currentStep,
  selectedTemplate,
  atsIssues,
  onFileSelect,
  onError,
  onDownload,
  onTemplateSelect
}: ResumeProcessorProps) {
  const steps = useSteps(currentStep);

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
      {!file && (
        <div className="space-y-8">
          <FileUpload onFileSelect={onFileSelect} onError={onError} />
          <TemplateSection 
            selectedTemplate={selectedTemplate}
            onTemplateSelect={onTemplateSelect}
          />
        </div>
      )}

      {file && (
        <div className="space-y-8">
          <FileInfo 
            file={file}
            isOptimizing={isOptimizing}
            currentStep={currentStep}
          />

          <OptimizationProgress steps={steps} />

          {currentStep === 3 && (
            <ResultSection 
              issues={atsIssues}
              onDownload={onDownload}
            />
          )}
        </div>
      )}
    </div>
  );
}