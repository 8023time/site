import { cn } from "../../utils/className.ts";
import type { ReactNode } from "react";
import { CardFooter } from "./CardFooter.tsx";
import { CardBody } from "./CardBody.tsx";
import { CardHeader } from "./CardHeader.tsx";

type Shape = "square" | "rounded" | "pill" | "circle";
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Color =
  | "white"
  | "gray"
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "indigo";

interface CardProps {
  children?: ReactNode;
  shape?: Shape;
  size?: Size;
  color?: Color;
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  border?: boolean;
  hover?: boolean;
  className?: string;
}

const shapeMap: Record<Shape, string> = {
  square: "rounded-none",
  rounded: "rounded-lg",
  pill: "rounded-full",
  circle: "rounded-full",
};

const sizeMap: Record<Size, string> = {
  xs: "p-2 text-xs",
  sm: "p-3 text-sm",
  md: "p-4 text-base",
  lg: "p-6 text-lg",
  xl: "p-8 text-xl",
};

const colorMap: Record<Color, { bg: string; border: string; text: string }> = {
  white: { bg: "bg-white", border: "border-gray-200", text: "text-gray-900" },
  gray: { bg: "bg-gray-100", border: "border-gray-300", text: "text-gray-800" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900" },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-900",
  },
  red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-900" },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-900",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-900",
  },
  indigo: {
    bg: "bg-indigo-50",  
    border: "border-indigo-200",
    text: "text-indigo-900",
  },
};

const Card = ({
  children,
  shape = "rounded",
  size = "md",
  color = "white",
  shadow = "md",
  border = true,
  hover = true,
  className,
}: CardProps) => {
  const { bg, border: borderColor, text } = colorMap[color];

  return (
    <div
      className={cn(
        "w-full block transition-all duration-200",
        bg,
        text,
        shapeMap[shape],
        sizeMap[size],
        shadow !== "none" && `shadow-${shadow}`,
        border && `border ${borderColor}`,
        hover && "hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
};

const CardGroup = Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export default CardGroup;
export { Card, CardHeader, CardBody, CardFooter };
