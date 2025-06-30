import React from 'react';
import { templates } from '../lib/templates';
import { Layout, Code } from 'lucide-react';

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
  selectedId?: string;
}

export function TemplateSelector({ onSelect, selectedId }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
            selectedId === template.id
              ? 'border-navy-600 bg-navy-50'
              : 'border-navy-200 hover:border-navy-300 hover:bg-navy-50/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            {template.id === 'technical' ? (
              <Code className="w-6 h-6 text-navy-600" />
            ) : (
              <Layout className="w-6 h-6 text-navy-600" />
            )}
            <h3 className="font-medium text-navy-800">{template.name}</h3>
          </div>
          <p className="text-sm text-navy-600 mb-4">{template.description}</p>
          <div className="text-xs text-navy-500">
            {template.structure.sections.map((section) => (
              <span
                key={section.key}
                className="inline-block px-2 py-1 bg-white rounded mr-2 mb-2 border border-navy-200"
              >
                {section.title}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}