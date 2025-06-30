import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { OptimizationProgress } from './components/OptimizationProgress';
import { DownloadButton } from './components/DownloadButton';
import { Logo } from './components/Logo';
import { ProcessingAnimation } from './components/ProcessingAnimation';
import { DonationSection } from './components/DonationSection';
import { ATSChecker } from './components/ATSChecker';
import { TemplateSelector } from './components/TemplateSelector';
import { ErrorMessage } from './components/ErrorMessage';
import { ResumeProcessor } from './components/ResumeProcessor';
import { useResumeState } from './hooks/useResumeState';

export function App() {
  const {
    file,
    isOptimizing,
    currentStep,
    optimizedContent,
    selectedTemplate,
    error,
    atsIssues,
    handleFileSelect,
    handleError,
    handleDownload,
    setSelectedTemplate,
    setError
  } = useResumeState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-navy-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <p className="text-lg text-navy-600 mt-4">
              Transform your resume with AI-powered optimization
            </p>
          </div>

          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} onDismiss={() => setError(null)} />
            </div>
          )}

          <ResumeProcessor
            file={file}
            isOptimizing={isOptimizing}
            currentStep={currentStep}
            optimizedContent={optimizedContent}
            selectedTemplate={selectedTemplate}
            atsIssues={atsIssues}
            onFileSelect={handleFileSelect}
            onError={handleError}
            onDownload={handleDownload}
            onTemplateSelect={setSelectedTemplate}
          />

          <DonationSection />
        </div>
      </div>
    </div>
  );
}

export default App;