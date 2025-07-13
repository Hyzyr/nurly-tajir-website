import { useEffect, useState } from 'react';

export function usePartners() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Your logic here
  }, []);

  return { state };
}
