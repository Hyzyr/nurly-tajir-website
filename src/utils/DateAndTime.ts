export const toLocaleTime = (timestamp: string | number) =>
  new Date(timestamp).toLocaleDateString();
