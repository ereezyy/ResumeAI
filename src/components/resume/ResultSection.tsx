import React from 'react';
import { ATSChecker } from '../ATSChecker';
import { DownloadButton } from '../DownloadButton';
import type { ATSIssue } from '../../lib/utils/atsChecker';

interface ResultSectionProps {
  issues: ATSIssue[];
  onDownload: () => void;
}

export function ResultSection({ issues, onDownload }: ResultSectionProps) {
  return (
    <div className="space-y-6">
      <ATSChecker issues={issues} />
      <div className="flex justify-center">
        <DownloadButton onClick={onDownload} />
      </div>
    </div>
  );
}