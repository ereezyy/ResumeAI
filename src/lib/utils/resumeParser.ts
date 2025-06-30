import { Section } from '../types/resume';

export const parseResumeContent = (content: string): Section[] => {
  const sections: Section[] = [];
  const lines = content.split('\n').filter(line => line.trim());
  
  let currentSection: Section = { title: '', content: [] };
  
  lines.forEach(line => {
    // Detect section headers (all caps or ending with ':')
    if (line.toUpperCase() === line || line.endsWith(':')) {
      if (currentSection.title) {
        sections.push({ ...currentSection });
      }
      currentSection = {
        title: line.replace(':', '').trim(),
        content: []
      };
    } else {
      currentSection.content.push(line.trim());
    }
  });
  
  if (currentSection.title) {
    sections.push(currentSection);
  }
  
  return sections;
};