import { useEffect, useState } from 'react';

export function useProjects() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Your logic here
  }, []);

  return { state };
}
