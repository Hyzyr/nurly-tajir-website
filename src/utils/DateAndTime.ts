export const toLocaleTime = (timestamp: string | number) =>
  new Date(timestamp).toLocaleDateString();

/**
 * Formats a date string into a human-readable format.
 * @example formatDate('2024-03-15') → 'Mar 15, 2024'
 * @example formatDate('2024-03-15', { month: 'long' }) → 'March 15, 2024'
 */
export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', options);
};
