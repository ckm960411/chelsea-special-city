import React from 'react';

const src =
  'https://user-images.githubusercontent.com/78003237/193411655-aae5cfb8-5c23-44d6-a40d-325a0fb6acda.png';

interface ChelseaLogoProps {
  className?: string;
  style?: React.CSSProperties;
}
export const ChelseaLogo = ({ className, style }: ChelseaLogoProps) => {
  return <img src={src} alt="CHELSEA CHAMPION" className={className} style={style} />;
};
