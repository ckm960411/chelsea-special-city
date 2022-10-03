import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useBreakpoint = (breakpoint?: number) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const bp = useMediaQuery({ query: `(max-width:${breakpoint ?? '639'}px)` });

  useEffect(() => {
    setIsBreakpoint(bp);
  }, [bp]);

  return isBreakpoint;
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      return;
    }
  };
  return [storedValue, setValue] as const;
}
