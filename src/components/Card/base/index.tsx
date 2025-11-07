import type { ReactNode, CSSProperties } from 'react';
import { cn } from '../../../common/utils/className.ts';
import { useState } from 'react';

interface CardProps {
  children?: ReactNode;
  /** 背景色 */
  bgColor?: string;
  /** 边框颜色，默认无色 */
  borderColor?: string;
  /** hover 时的边框颜色 */
  hoverBorderColor?: string;
  /** 圆角 */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** 是否显示边框 */
  border?: boolean;
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** Tailwind 类名，可传结构类 */
  className?: string;
  /** 是否显示阴影 */
  shadow?: boolean;
}

const Card = ({
  children,
  bgColor,
  borderColor,
  hoverBorderColor,
  rounded = 'lg',
  border = true,
  width,
  height,
  className,
  shadow = true,
}: CardProps) => {
  const [isHover, setIsHover] = useState(false);

  const style: CSSProperties = {
    backgroundColor: bgColor,
    borderColor: border ? (isHover && hoverBorderColor ? hoverBorderColor : borderColor || 'transparent') : undefined,
    borderStyle: border ? 'solid' : undefined,
    borderWidth: border ? '1px' : undefined,
    borderRadius:
      rounded === 'none'
        ? '0px'
        : rounded === 'sm'
          ? '0.125rem'
          : rounded === 'md'
            ? '0.375rem'
            : rounded === 'lg'
              ? '0.5rem'
              : rounded === 'xl'
                ? '0.75rem'
                : rounded === '2xl'
                  ? '1rem'
                  : '9999px',
    width,
    height,
    transition: 'all 0.2s',
    boxShadow: shadow ? '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)' : undefined,
  };

  return (
    <div
      style={style}
      className={cn(className, 'p-3 transition-all duration-200')}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </div>
  );
};

export default Card;
