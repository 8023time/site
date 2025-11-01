import { cn } from "../../utils/className.ts";
import type { ReactNode } from "react";

interface TagIconProps {
  children: ReactNode;
  className?: string;
}
export function TagIcon({ children, className = "" }: TagIconProps) {
  return <>{children}</>;
}
