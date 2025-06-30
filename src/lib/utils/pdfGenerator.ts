import { jsPDF } from 'jspdf';
import { Section, PDFStyles } from '../types/resume';
import { resumeStyles } from './pdfStyles';
import { parseResumeContent } from './resumeParser';

export const generateResumePDF = (content: string): Blob => {
  const doc = new jsPDF();
  const sections = parseResumeContent(content);
  
  let currentY = resumeStyles.page.margins.top;
  const pageWidth = doc.internal.pageSize.width;
  const maxWidth = pageWidth - resumeStyles.page.margins.left - resumeStyles.page.margins.right;

  const addText = (text: string, y: number, styles: PDFStyles) => {
    doc.setFontSize(styles.fontSize || 11);
    doc.setFont('helvetica', styles.fontStyle || 'normal');
    if (styles.color) {
      doc.setTextColor(styles.color[0], styles.color[1], styles.color[2]);
    }
    
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, resumeStyles.page.margins.left, y);
    
    return y + (lines.length * (styles.lineHeight || 1.2) * (styles.fontSize || 11) / 72 * 25.4);
  };

  sections.forEach((section) => {
    // Check if we need a new page
    if (currentY > doc.internal.pageSize.height - resumeStyles.page.margins.bottom) {
      doc.addPage();
      currentY = resumeStyles.page.margins.top;
    }

    // Add section title
    currentY = addText(section.title, currentY, resumeStyles.section.title);

    // Add section content
    section.content.forEach(line => {
      if (currentY > doc.internal.pageSize.height - resumeStyles.page.margins.bottom) {
        doc.addPage();
        currentY = resumeStyles.page.margins.top;
      }
      currentY = addText(line, currentY, resumeStyles.section.content);
    });
  });

  return doc.output('blob');
};