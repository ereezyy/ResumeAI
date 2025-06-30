import React from 'react';
import { TemplateSelector } from '../TemplateSelector';

interface TemplateSectionProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export function TemplateSection({ selectedTemplate, onTemplateSelect }: TemplateSectionProps) {
  return (
    <div className="border-t border-navy-100 pt-8">
      <h2 className="text-xl font-semibold text-navy-800 mb-4">
        Choose a Template
      </h2>
      <TemplateSelector
        onSelect={onTemplateSelect}
        selectedId={selectedTemplate}
      />
    </div>
  );
}