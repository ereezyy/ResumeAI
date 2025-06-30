import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function DownloadButton({ onClick, disabled }: DownloadButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
        disabled
          ? 'bg-navy-200 text-navy-400 cursor-not-allowed'
          : 'bg-navy-600 text-white hover:bg-navy-700'
      }`}
    >
      <Download className="w-5 h-5" />
      Download Optimized Resume
    </button>
  );
}