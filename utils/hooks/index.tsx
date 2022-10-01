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
