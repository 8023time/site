import React from "react";
import { cn } from "../../../../utils/className";

interface LogoProps {
  src: string;
  name: string;
  className?: string;
  hoverColor?: string;
}

const Logo: React.FC<LogoProps> = ({ src = "", name = "", className = "", hoverColor = "" }) => {
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
        (e.currentTarget as HTMLDivElement).style.borderColor = hoverColor;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
      }}
    >
      <object type="image/svg+xml" data={src} className="w-full h-full object-contain" aria-label={name} />
    </div>
  );
};

export default Logo;
