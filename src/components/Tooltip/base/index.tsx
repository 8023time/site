import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { TooltipProps, Placement } from './data';
import { defaultTooltipProps } from './data';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

// 全局单例管理（保持不变）
let currentTooltip: { forceHide: () => void } | null = null;
const registerTooltip = (instance: { forceHide: () => void }) => {
  if (currentTooltip && currentTooltip !== instance) {
    currentTooltip.forceHide();
  }
  currentTooltip = instance;
};
const unregisterTooltip = (instance: { forceHide: () => void }) => {
  if (currentTooltip === instance) {
    currentTooltip = null;
  }
};

// 样式常量（light/dark 保持你原有风格）
interface TooltipStyles {
  light: React.CSSProperties;
  dark: React.CSSProperties;
}
const TOOLTIP_STYLES: TooltipStyles = {
  light: {
    backgroundColor: '#ffffff',
    color: '#1f2937',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    border: '1px solid rgba(0,0,0,0.08)',
  },
  dark: {
    backgroundColor: '#1f2937',
    color: '#f3f4f6',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3), 0 4px 6px -2px rgba(0,0,0,0.2)',
  },
};

const Tooltip: React.FC<
  TooltipProps & {
    children: ReactNode;
    theme?: 'light' | 'dark';
    arrowSize?: number;
  }
> = ({
  content = defaultTooltipProps.content,
  placement = defaultTooltipProps.placement,
  enterDelay = defaultTooltipProps.enterDelay,
  leaveDelay = defaultTooltipProps.leaveDelay,
  className = '',
  arrow = defaultTooltipProps.arrow,
  theme = 'light',
  arrowSize = 6,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPlacement, setActualPlacement] = useState<Placement>(placement);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [arrowOffset, setArrowOffset] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  // <-- 关键改动：为每个组件实例维护一个稳定的实例对象引用 -->
  const instanceRef = useRef<{ forceHide: () => void }>({
    forceHide: () => {},
  });

  const isDark = theme === 'dark';

  // 实际的强制隐藏逻辑
  const forceHide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsVisible(false);
    // 注：不在这里 unregister，因为可能由 register 侧触发（也可以双保险）
    if (currentTooltip === instanceRef.current) {
      unregisterTooltip(instanceRef.current);
    }
  }, []);

  // 计算位置（保持原逻辑）
  const calculatePosition = useCallback(() => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const trigger = wrapperRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const gap = 10;
    let newPlacement: Placement = placement;

    const space = {
      top: trigger.top,
      bottom: viewport.height - trigger.bottom,
      left: trigger.left,
      right: viewport.width - trigger.right,
    };

    if (placement.startsWith('top') && space.top < tooltip.height + gap) {
      newPlacement = placement.replace('top', 'bottom') as Placement;
    } else if (placement.startsWith('bottom') && space.bottom < tooltip.height + gap) {
      newPlacement = placement.replace('bottom', 'top') as Placement;
    } else if (placement.startsWith('left') && space.left < tooltip.width + gap) {
      newPlacement = placement.replace('left', 'right') as Placement;
    } else if (placement.startsWith('right') && space.right < tooltip.width + gap) {
      newPlacement = placement.replace('right', 'left') as Placement;
    }

    setActualPlacement(newPlacement);

    const midX = trigger.left + trigger.width / 2;
    const midY = trigger.top + trigger.height / 2;
    let top = 0;
    let left = 0;

    switch (newPlacement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        top = trigger.top - tooltip.height - gap;
        left = midX - tooltip.width / 2;
        break;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        top = trigger.bottom + gap;
        left = midX - tooltip.width / 2;
        break;
      case 'left':
        top = midY - tooltip.height / 2;
        left = trigger.left - tooltip.width - gap;
        break;
      case 'right':
        top = midY - tooltip.height / 2;
        left = trigger.right + gap;
        break;
    }

    // 防止溢出
    left = Math.max(gap, Math.min(left, viewport.width - tooltip.width - gap));
    top = Math.max(gap, Math.min(top, viewport.height - tooltip.height - gap));

    setCoords({ top, left });

    // 计算箭头偏移（相对于 tooltip 左上角）
    const arrowLeft = midX - left - arrowSize;
    setArrowOffset(Math.max(arrowSize, Math.min(arrowLeft, tooltip.width - arrowSize)));
  }, [placement, arrowSize]);

  // 显示（绑定稳定实例并注册单例）
  const show = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 绑定当前实例的 forceHide（保持 instanceRef 不变，更新其方法）
    instanceRef.current.forceHide = forceHide;

    timeoutRef.current = setTimeout(() => {
      // 注册全局单例（会自动隐藏其它 Tooltip）
      registerTooltip(instanceRef.current);

      setIsVisible(true);
      rafRef.current = requestAnimationFrame(calculatePosition);
    }, enterDelay);
  }, [enterDelay, forceHide, calculatePosition]);

  // 延迟隐藏（鼠标离开/失焦）
  const delayedHide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      // 只有当当前全局注册项是自己时才注销，避免误注销别的实例
      unregisterTooltip(instanceRef.current);
    }, leaveDelay);
  }, [leaveDelay]);

  // 响应式（resize / scroll）
  useEffect(() => {
    if (!isVisible) return;

    const handler = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(calculatePosition);
    };

    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler, true);

    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler, true);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isVisible, calculatePosition]);

  // 当 isVisible 由 true -> false 时，确保注销全局单例（双保险）
  useEffect(() => {
    if (!isVisible) {
      unregisterTooltip(instanceRef.current);
    }
  }, [isVisible]);

  // 组件卸载清理
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      unregisterTooltip(instanceRef.current);
    };
  }, []);

  // tooltip element（样式为 light/dark）
  const tooltipElement = isVisible ? (
    <div
      ref={tooltipRef}
      role='tooltip'
      style={{
        position: 'fixed',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out, transform 120ms ease',
        pointerEvents: 'none',
        zIndex: 9999,
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: 500,
        borderRadius: '0.5rem',
        padding: '0.5rem 0.75rem',
        maxWidth: '280px',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        ...TOOLTIP_STYLES[isDark ? 'dark' : 'light'],
      }}
      className={className}
    >
      {content}

      {arrow && (
        <div
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            ...(actualPlacement.startsWith('top') && {
              bottom: -arrowSize,
              left: arrowOffset,
              borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
              borderColor: `${isDark ? '#1f2937' : '#ffffff'} transparent transparent transparent`,
              filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.08))',
            }),
            ...(actualPlacement.startsWith('bottom') && {
              top: -arrowSize,
              left: arrowOffset,
              borderWidth: `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
              borderColor: `transparent transparent ${isDark ? '#1f2937' : '#ffffff'} transparent`,
              filter: 'drop-shadow(0 -2px 2px rgba(0,0,0,0.08))',
            }),
            ...(actualPlacement.startsWith('left') && {
              right: -arrowSize,
              top: arrowOffset,
              borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`,
              borderColor: `transparent transparent transparent ${isDark ? '#1f2937' : '#ffffff'}`,
              filter: 'drop-shadow(2px 0 2px rgba(0,0,0,0.08))',
            }),
            ...(actualPlacement.startsWith('right') && {
              left: -arrowSize,
              top: arrowOffset,
              borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`,
              borderColor: `transparent ${isDark ? '#1f2937' : '#ffffff'} transparent transparent`,
              filter: 'drop-shadow(-2px 0 2px rgba(0,0,0,0.08))',
            }),
          }}
        />
      )}
    </div>
  ) : null;

  return (
    <>
      <div
        ref={wrapperRef}
        className='inline-block'
        style={{ position: 'relative' }}
        onMouseEnter={show}
        onMouseLeave={delayedHide}
        onFocus={show}
        onBlur={delayedHide}
      >
        {children}
      </div>
      {tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
};

export default Tooltip;
