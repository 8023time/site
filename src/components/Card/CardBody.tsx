import { cn } from "../../utils/className.ts";
import type { ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn("flex-1", className)}>{children}</div>;
}
