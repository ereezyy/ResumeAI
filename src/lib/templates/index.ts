export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  structure: {
    sections: Array<{
      title: string;
      key: string;
      required: boolean;
      description: string;
    }>;
  };
}

export const templates: ResumeTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, traditional format suitable for most industries',
    structure: {
      sections: [
        {
          title: 'Professional Summary',
          key: 'summary',
          required: true,
          description: 'Brief overview of your professional background and goals'
        },
        {
          title: 'Work Experience',
          key: 'experience',
          required: true,
          description: 'Detailed work history with achievements'
        },
        {
          title: 'Education',
          key: 'education',
          required: true,
          description: 'Academic qualifications and certifications'
        },
        {
          title: 'Skills',
          key: 'skills',
          required: true,
          description: 'Key technical and soft skills'
        }
      ]
    }
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Optimized for technical roles with emphasis on skills',
    structure: {
      sections: [
        {
          title: 'Technical Skills',
          key: 'skills',
          required: true,
          description: 'Comprehensive list of technical competencies'
        },
        {
          title: 'Projects',
          key: 'projects',
          required: true,
          description: 'Highlight significant technical projects'
        },
        {
          title: 'Experience',
          key: 'experience',
          required: true,
          description: 'Relevant work experience'
        },
        {
          title: 'Education',
          key: 'education',
          required: true,
          description: 'Academic background and certifications'
        }
      ]
    }
  }
];