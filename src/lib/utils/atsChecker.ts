export interface ATSIssue {
  type: 'warning' | 'error';
  message: string;
  section?: string;
}

export const checkATSCompatibility = (content: string): ATSIssue[] => {
  const issues: ATSIssue[] = [];

  // Check for common ATS issues
  if (content.includes('|') || content.includes('•')) {
    issues.push({
      type: 'warning',
      message: 'Special characters may not parse correctly in ATS systems'
    });
  }

  if (content.toLowerCase().includes('image') || content.toLowerCase().includes('photo')) {
    issues.push({
      type: 'warning',
      message: 'Images and photos are not recommended for ATS compatibility'
    });
  }

  const lines = content.split('\n');
  const longLines = lines.filter(line => line.length > 100);
  if (longLines.length > 0) {
    issues.push({
      type: 'warning',
      message: 'Some lines are too long and may be truncated by ATS systems'
    });
  }

  return issues;
};