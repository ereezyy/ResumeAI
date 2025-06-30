import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { validateFile } from '../lib/utils/validation';
import { handleFileSelection } from '../lib/utils/fileHandling';
import { ErrorMessage } from './ErrorMessage';
import { MAX_FILE_SIZE_MB } from '../lib/constants';
import type { ValidationError } from '../lib/utils/validation';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onError?: (error: ValidationError) => void;
}

export function FileUpload({ onFileSelect, onError }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<ValidationError | null>(null);

  const handleFile = useCallback(
    (fileOrNull: File | null) => {
      const result = handleFileSelection(fileOrNull);
      
      if (!result.success || !result.file) {
        const validationError = result.error || {
          code: 'NO_FILE',
          message: 'No file selected. Please try again.'
        };
        setError(validationError);
        onError?.(validationError);
        return;
      }

      const validationError = validateFile(result.file);
      if (validationError) {
        setError(validationError);
        onError?.(validationError);
        return;
      }

      setError(null);
      onFileSelect(result.file);
    },
    [onFileSelect, onError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      
      // Safely access files
      const file = e.dataTransfer?.files?.[0] || null;
      handleFile(file);
    },
    [handleFile]
  );

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Safely access files
      const file = e.target?.files?.[0] || null;
      handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="w-full max-w-xl">
      {error && (
        <ErrorMessage
          message={error.message}
          onDismiss={() => setError(null)}
        />
      )}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full p-8 border-2 border-dashed rounded-lg bg-white/50 backdrop-blur-sm transition-all duration-300 ease-in-out transform ${
          isDragging
            ? 'border-navy-600 scale-102 shadow-lg bg-white/70'
            : 'border-navy-300 hover:border-navy-400 hover:scale-101'
        }`}
      >
        <input
          type="file"
          id="resume-upload"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileInput}
        />
        <label
          htmlFor="resume-upload"
          className="flex flex-col items-center gap-4 cursor-pointer group"
        >
          <div className="relative">
            <Upload className={`w-12 h-12 transition-colors duration-300 ${
              isDragging ? 'text-navy-700' : 'text-navy-600 group-hover:text-navy-700'
            }`} />
            <div className="absolute inset-0 animate-ping opacity-20 bg-navy-400 rounded-full" />
          </div>
          <div className="text-center">
            <p className={`text-lg font-medium transition-colors duration-300 ${
              isDragging ? 'text-navy-900' : 'text-navy-800'
            }`}>
              Drop your resume here or click to upload
            </p>
            <p className="text-sm text-navy-500 mt-2 group-hover:text-navy-600 transition-colors duration-300">
              Supports PDF, DOC, DOCX, and TXT files (max {MAX_FILE_SIZE_MB}MB)
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}