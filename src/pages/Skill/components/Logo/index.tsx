import React from "react";
import type { LogoProps } from "./type";
import { defaultLogoProps } from "./data";
import { cn } from "../../../../utils/className";

const Logo: React.FC<LogoProps> = ({
  src = defaultLogoProps.src,
  name = defaultLogoProps.name,
  className = defaultLogoProps.className,
  hoverColor = defaultLogoProps.hoverColor,
}) => {
  return (
    <div
      className={cn(
        "relative group w-30 h-30 p-5 rounded-2xl flex items-center justify-center",
        "border-2 border-slate-200 bg-white/10 backdrop-blur-xl",
        "transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-105",
        className
      )}
      style={{
        transition: "border-color 1s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = hoverColor!;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
      }}
    >
      <img src={src} className="w-full h-full object-contain" aria-label={name} loading="lazy" />
    </div>
  );
};

export default Logo;
