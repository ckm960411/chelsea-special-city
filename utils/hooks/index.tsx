import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

export const useClickOutside = (onClick: () => void, condition = true) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!condition) return;
      if (ref.current?.contains(e.target as Node)) {
        return;
      }
      onClick();
    };
    window.addEventListener('click', handleOutsideClick);

    return () => window.removeEventListener('click', handleOutsideClick);
  }, [onClick, condition]);

  return ref;
};

/**
 * @param condition ref element 를 보일 조건
 * containerHeight 는 ref 를 감싸는 부모요소에 주어야 한다
 */
export const useToggleShowing = (condition: boolean) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const refHeight = ref.current?.clientHeight;
    if (condition) {
      refHeight && setContainerHeight(refHeight);
    } else {
      setContainerHeight(0);
    }
  }, [condition]);

  return { ref, containerHeight, setContainerHeight };
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize);
  }, []);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
};

export const usePreventBodyScroll = (condition = true) => {
  useEffect(() => {
    if (condition) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    } else {
      return;
    }
  }, [condition]);
};
