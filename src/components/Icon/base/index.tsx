import type { IconProps } from "./data";
import { defaultIconProps } from "./data";
import { cn } from "../../../utils/className";

export const Icon = ({
  icon = defaultIconProps.icon,
  alt = defaultIconProps.alt,
  size = defaultIconProps.size,
  round = defaultIconProps.round,
  className = defaultIconProps.className,
  color = defaultIconProps.color,
}: IconProps) => {
  const isString = typeof icon === "string";

  return (
    <div
      className={cn(
        "relative inline-block p-1.5 transition-colors duration-200 ease-in-out hover:bg-stone-100/50 dark:hover:bg-stone-700/50 rounded-xl",
        className
      )}
      style={{
        width: size,
        height: size,
        color,
      }}
      aria-label={alt}
      role={alt ? "img" : undefined}
    >
      {isString ? (
        <img
          src={icon}
          alt={alt}
          className={cn(
            "w-full h-full object-contain transition-transform duration-200 ease-in-out",
            round && "rounded-full overflow-hidden"
          )}
          loading="lazy"
        />
      ) : (
        icon
      )}
    </div>
  );
};
