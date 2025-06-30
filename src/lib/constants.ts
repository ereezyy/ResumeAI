export const MAX_FILE_SIZE_MB = 5;

export const SUPPORTED_FILE_TYPES = {
  PDF: 'application/pdf',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  DOC: 'application/msword',
  TXT: 'text/plain'
} as const;

export const STEPS = [
  {
    title: 'Analyzing Resume Structure',
    description: 'Examining document format and content organization'
  },
  {
    title: 'Optimizing Content',
    description: 'Enhancing language and formatting for better readability'
  },
  {
    title: 'ATS Optimization',
    description: 'Ensuring compatibility with applicant tracking systems'
  }
] as const;