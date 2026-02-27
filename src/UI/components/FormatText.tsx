import React from 'react';

export type FormatTextProps = {
  text: string;
  doubleBr?: boolean;
};

export function FormatText({ text, doubleBr = false }: FormatTextProps) {
  const normalized = text.replace(/\\n/g, '\n');
  const lines = normalized.split('\n');

  return (
    <>
      {lines.map((line, lineIndex) => {
        const parts = line.split(/(\*\*.*?\*\*)/);

        return (
          <React.Fragment key={lineIndex}>
            {parts.map((part, i) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <b key={i}>{part.slice(2, -2)}</b>
              ) : (
                part || null
              )
            )}
            {lineIndex < lines.length - 1 && (
              doubleBr ? <><br /><br /></> : <br />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

