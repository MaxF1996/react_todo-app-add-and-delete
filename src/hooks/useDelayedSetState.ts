import { useEffect } from 'react';

export const useDelayedSetState = <T>(
  state: T | null,
  setState: React.Dispatch<React.SetStateAction<T | null>>,
  delay: number = 3000,
): void => {
  return useEffect(() => {
    if (state) {
      setTimeout(() => {
        setState(null);
      }, delay);
    }
  }, [state]);
};
