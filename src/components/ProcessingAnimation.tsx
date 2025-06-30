import React from 'react';

export function ProcessingAnimation() {
  return (
    <div className="flex justify-center items-center gap-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 bg-navy-600 rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
}