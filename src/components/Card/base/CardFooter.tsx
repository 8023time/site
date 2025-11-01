import { cn } from "../../../utils/className.ts";
import type { ReactNode } from "react";

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn("mt-4 pt-3 border-t border-inherit flex gap-2", className)}
    >
      {children}
    </div>
  );
}
