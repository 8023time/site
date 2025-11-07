import type { MouseEvent } from 'react';
import { defaultTagProps } from './data.ts';
import { cn } from '../../../common/utils/className.ts';
import type { TagColor, TagSize, TagProps } from './data.ts';

const colorMap: Record<TagColor, string> = {
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  green: 'bg-green-100 text-green-700 border-green-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

const sizeMap: Record<TagSize, string> = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2.5 py-1 text-sm',
  md: 'px-3 py-1.5 text-base',
};

// 主组件
const Tag = ({
  children = defaultTagProps.children,
  color = defaultTagProps.color,
  size = defaultTagProps.size,
  removable = defaultTagProps.removable,
  onRemove = defaultTagProps.onRemove,
  onClick = defaultTagProps.onClick,
  disabled = defaultTagProps.disabled,
  className = defaultTagProps.className,
  icon = defaultTagProps.icon,
}: TagProps) => {
  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    if (!disabled) onRemove?.();
  };

  const handleClick = () => {
    if (!disabled && onClick) onClick();
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium transition-all',
        'select-none',
        colorMap[color!],
        sizeMap[size!],
        onClick && !disabled && 'cursor-pointer hover:opacity-80',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onClick={handleClick}
    >
      {icon && <span className='flex-shrink-0'>{icon}</span>}
      <span>{children}</span>
      {removable && (
        <button
          onClick={handleRemove}
          className={cn(
            'ml-1 rounded-full p-0.5 transition-colors',
            'hover:bg-black/10 focus:ring-2 focus:ring-current focus:ring-offset-1 focus:outline-none',
          )}
          aria-label='Remove'
          disabled={disabled}
        ></button>
      )}
    </span>
  );
};

export default Tag;
