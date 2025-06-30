import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import type { ATSIssue } from '../lib/utils/atsChecker';

interface ATSCheckerProps {
  issues: ATSIssue[];
}

export function ATSChecker({ issues }: ATSCheckerProps) {
  if (issues.length === 0) {
    return (
      <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
        <CheckCircle className="w-5 h-5" />
        <p className="text-sm">Your resume is ATS-friendly!</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-amber-600" />
        <h3 className="font-medium text-amber-800">ATS Compatibility Issues</h3>
      </div>
      <ul className="space-y-2">
        {issues.map((issue, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
            <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-amber-500" />
            <span>{issue.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}