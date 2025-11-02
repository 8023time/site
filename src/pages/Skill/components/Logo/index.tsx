import React from "react";
import { cn } from "../../../../utils/className";

interface LogoProps {
  src: string;
  name: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ src = "", name = "", className = "" }) => {
  return (
    <div
      className={cn(
        "relative group w-30 h-30 p-5 rounded-2xl flex items-center justify-center",
        "border-2 border-slate-200 bg-white/10 backdrop-blur-xl",
        "transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-105",
        className
      )}
    >
      {/* 光晕层，只在 hover 显示 */}
      <div className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

      {/* 边框阴影，只在 hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          border: "2px solid transparent",
        }}
      />

      {/* Logo 图片 */}
      <img
        src={src}
        alt={name}
        width={60}
        height={60}
        loading="lazy"
        className="relative z-10 transform transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[3deg]"
      />
    </div>
  );
};

export default Logo;
