import React from 'react';
import type { LogoProps } from './type';
import { defaultLogoProps } from './data';
import { cn } from '@utils/className';

const Logo: React.FC<LogoProps> = ({
  src = defaultLogoProps.src,
  name = defaultLogoProps.name,
  className = defaultLogoProps.className,
  hoverColor = defaultLogoProps.hoverColor,
}) => {
  return (
    <div
      className={cn(
        'group relative flex h-30 w-30 items-center justify-center rounded-2xl p-5',
        'border-2 border-slate-200 bg-white/10 backdrop-blur-xl',
        'transform transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105',
        className,
      )}
      style={{
        transition: 'border-color 1s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = hoverColor!;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '';
      }}
    >
      <img src={src} className='h-full w-full object-contain' aria-label={name} loading='lazy' />
    </div>
  );
};

export default Logo;
