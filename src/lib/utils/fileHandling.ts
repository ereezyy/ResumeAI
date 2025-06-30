import type { ValidationError } from './validation';

export interface FileHandlerResult {
  success: boolean;
  error?: ValidationError;
  file?: File;
}

export const handleFileSelection = (fileOrNull: File | null): FileHandlerResult => {
  if (!fileOrNull) {
    return {
      success: false,
      error: {
        code: 'FILE_TYPE',
        message: 'No file selected. Please try again.'
      }
    };
  }

  return {
    success: true,
    file: fileOrNull
  };
};