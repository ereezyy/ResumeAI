import { optimizeResume } from '../api/openai';
import mammoth from 'mammoth';
import { pdfjs } from 'react-pdf';
import { SUPPORTED_FILE_TYPES } from '../constants';
import type { ValidationError } from './validation';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export class FileProcessingError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'FileProcessingError';
  }
}

export const extractTextFromFile = async (file: File): Promise<string> => {
  try {
    const fileType = file.type;

    switch (fileType) {
      case SUPPORTED_FILE_TYPES.PDF:
        return extractFromPDF(file);
      case SUPPORTED_FILE_TYPES.DOCX:
        return extractFromDOCX(file);
      case SUPPORTED_FILE_TYPES.DOC:
      case SUPPORTED_FILE_TYPES.TXT:
        return extractFromText(file);
      default:
        throw new FileProcessingError(
          'Unsupported file type',
          'UNSUPPORTED_FILE_TYPE'
        );
    }
  } catch (error) {
    if (error instanceof FileProcessingError) {
      throw error;
    }
    throw new FileProcessingError(
      'Failed to process file. Please try again.',
      'PROCESSING_ERROR'
    );
  }
};

const extractFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ');
    }
    
    return text;
  } catch (error) {
    throw new FileProcessingError(
      'Failed to extract text from PDF',
      'PDF_EXTRACTION_ERROR'
    );
  }
};

const extractFromDOCX = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    throw new FileProcessingError(
      'Failed to extract text from DOCX',
      'DOCX_EXTRACTION_ERROR'
    );
  }
};

const extractFromText = async (file: File): Promise<string> => {
  try {
    return await file.text();
  } catch (error) {
    throw new FileProcessingError(
      'Failed to read text file',
      'TEXT_EXTRACTION_ERROR'
    );
  }
};