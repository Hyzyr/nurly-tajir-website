import { useEffect, useState } from 'react';

export function useContact() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Your logic here
  }, []);

  return { state };
}
