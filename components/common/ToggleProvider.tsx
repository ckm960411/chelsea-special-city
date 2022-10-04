import React, { FC } from 'react';
import { useToggleShowing } from '../../utils/hooks';

interface ToggleProviderProps {
  duration: string;
  showing: boolean;
  containerClass?: string;
  containerStyle?: React.CSSProperties;
  wrapperClass?: string;
  wrapperStyle?: React.CSSProperties;
  children?: React.ReactNode;
}
const ToggleProvider: FC<ToggleProviderProps> = ({
  duration,
  showing,
  containerClass,
  containerStyle,
  wrapperClass,
  wrapperStyle,
  children,
}) => {
  const { ref, containerHeight } = useToggleShowing(showing);

  return (
    <div
      className={`overflow-hidden ${containerClass}`}
      style={{
        height: containerHeight,
        transitionDuration: duration,
        ...containerStyle,
      }}
    >
      <div
        ref={ref as React.LegacyRef<HTMLDivElement>}
        className={wrapperClass}
        style={wrapperStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default ToggleProvider;
