import { useEffect, useState } from 'react';

export function useAbout() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Your logic here
  }, []);

  return { state };
}
