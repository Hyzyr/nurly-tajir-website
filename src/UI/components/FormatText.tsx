import React from 'react';

export type FormatTextProps = {
  text: string;
};

export function FormatText({ text }: FormatTextProps) {
  const elements: React.ReactNode[] = [];

  // Split by newline first
  const normalized = text.replace(/\\n/g, '\n');
  const lines = normalized.split('\n');

  lines.forEach((line, lineIndex) => {
    const parts = line.split(/(\*\*.*?\*\*)/); // Split by bold markers

    parts.forEach((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        elements.push(
          <b key={`bold-${lineIndex}-${i}`}>{part.slice(2, -2)}</b>
        );
      } else {
        elements.push(<span key={`text-${lineIndex}-${i}`}>{part}</span>);
      }
    });

    // Add <br /> after each line except the last
    if (lineIndex < lines.length - 1) {
      elements.push(<br key={`br-${lineIndex}`} />);
    }
  });

  return <>{elements}</>;
}
