import { SUPPORTED_FILE_TYPES, MAX_FILE_SIZE_MB } from '../constants';

export interface ValidationError {
  code: 'FILE_TYPE' | 'FILE_SIZE' | 'GENERIC' | 'NO_FILE';
  message: string;
}

export const validateFile = (file: File | null): ValidationError | null => {
  if (!file) {
    return {
      code: 'NO_FILE',
      message: 'No file selected. Please try again.'
    };
  }

  if (!Object.values(SUPPORTED_FILE_TYPES).includes(file.type)) {
    return {
      code: 'FILE_TYPE',
      message: 'Please upload a PDF, DOC, DOCX, or TXT file.'
    };
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return {
      code: 'FILE_SIZE',
      message: `File size must not exceed ${MAX_FILE_SIZE_MB}MB.`
    };
  }

  return null;
};