import React from 'react';
import type { ButtonProps } from './data';
import { defaultButtonProps } from './data';

const Button: React.FC<ButtonProps> = ({
  variant = defaultButtonProps.variant,
  color = defaultButtonProps.color,
  size = defaultButtonProps.size,
  onClick = defaultButtonProps.onClick,
  className = defaultButtonProps.className,
  children = defaultButtonProps.children,
}) => {
  // 基础样式
  const baseClasses =
    'font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap';

  // 尺寸映射
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  // 颜色 + 样式组合
  const variantClasses = {
    solid: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400',
      info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
    },
    outlined: {
      primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      danger: 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
      warning: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-400',
      info: 'border border-cyan-600 text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-500',
    },
    filled: {
      primary: 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500',
      danger: 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500',
      warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-yellow-400',
      info: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 focus:ring-cyan-500',
    },
    text: {
      primary: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      danger: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
      warning: 'text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-400',
      info: 'text-cyan-600 hover:bg-cyan-50 focus:ring-cyan-500',
    },
    link: {
      primary: 'text-blue-600 hover:underline focus:ring-blue-500',
      danger: 'text-red-600 hover:underline focus:ring-red-500',
      warning: 'text-yellow-600 hover:underline focus:ring-yellow-400',
      info: 'text-cyan-600 hover:underline focus:ring-cyan-500',
    },
  };

  const classes = `
    ${baseClasses}
    ${sizeClasses[size!]}
    ${variantClasses[variant!][color!]}
    ${className}
  `.trim();

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
