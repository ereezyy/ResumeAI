import React from 'react';
import { Sparkles, FileText } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <FileText className="w-10 h-10 text-navy-600" />
        <Sparkles className="w-5 h-5 text-navy-400 absolute -top-2 -right-2 animate-pulse" />
      </div>
      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-navy-600 to-navy-800">
        ResumeAI
      </div>
    </div>
  );
}