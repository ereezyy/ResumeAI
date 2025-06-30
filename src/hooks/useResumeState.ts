import { useState, useCallback } from 'react';
import { extractTextFromFile } from '../lib/utils/fileProcessing';
import { optimizeResume } from '../lib/api/openai';
import { checkATSCompatibility } from '../lib/utils/atsChecker';
import { generateResumePDF } from '../lib/utils/pdfGenerator';
import { saveAs } from 'file-saver';
import type { ValidationError } from '../lib/utils/validation';
import type { ATSIssue } from '../lib/utils/atsChecker';

export function useResumeState() {
  const [file, setFile] = useState<File | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [optimizedContent, setOptimizedContent] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional');
  const [error, setError] = useState<string | null>(null);
  const [atsIssues, setAtsIssues] = useState<ATSIssue[]>([]);

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    try {
      setFile(selectedFile);
      setIsOptimizing(true);
      setCurrentStep(0);
      setError(null);

      const content = await extractTextFromFile(selectedFile);
      setCurrentStep(1);

      const optimized = await optimizeResume(content);
      setOptimizedContent(optimized);
      setCurrentStep(2);

      const issues = checkATSCompatibility(optimized);
      setAtsIssues(issues);

      setTimeout(() => setCurrentStep(3), 1000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsOptimizing(false);
    }
  }, []);

  const handleError = useCallback((error: ValidationError) => {
    setError(error.message);
  }, []);

  const handleDownload = useCallback(() => {
    try {
      const pdfBlob = generateResumePDF(optimizedContent);
      saveAs(pdfBlob, 'optimized-resume.pdf');
    } catch (error) {
      setError('Failed to generate PDF. Please try again.');
    }
  }, [optimizedContent]);

  return {
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
  };
}