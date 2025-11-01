import { cn } from "../../utils/className.ts";
import type { ReactNode } from "react";

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "font-semibold border-b border-inherit pb-3 mb-3",
        className
      )}
    >
      {children}
    </div>
  );
}
