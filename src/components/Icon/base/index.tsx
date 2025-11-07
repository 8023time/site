import type { IconProps } from './data';
import { defaultIconProps } from './data';
import { cn } from '../../../common/utils/className';

export const Icon = ({
  icon = defaultIconProps.icon,
  alt = defaultIconProps.alt,
  size = defaultIconProps.size,
  round = defaultIconProps.round,
  className = defaultIconProps.className,
  color = defaultIconProps.color,
}: IconProps) => {
  const isString = typeof icon === 'string';

  return (
    <div
      className={cn(
        'relative inline-block rounded-xl p-1.5 transition-colors duration-200 ease-in-out hover:bg-stone-100/50 dark:hover:bg-stone-700/50',
        className,
      )}
      style={{
        width: size,
        height: size,
        color,
      }}
      aria-label={alt}
      role={alt ? 'img' : undefined}
    >
      {isString ? (
        <img
          src={icon}
          alt={alt}
          className={cn(
            'h-full w-full object-contain transition-transform duration-200 ease-in-out',
            round && 'overflow-hidden rounded-full',
          )}
          loading='lazy'
        />
      ) : (
        icon
      )}
    </div>
  );
};
