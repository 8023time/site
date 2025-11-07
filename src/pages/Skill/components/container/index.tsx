import React, { useRef, useEffect, useCallback } from 'react';

interface ContainerProps {
  speed?: number; // 像素/秒
  gap?: number; // 水平间距
  direction?: 'left' | 'right'; // 方向（左边，右边）
  className?: string;
  children: React.ReactNode[];
}

const InfiniteLoopContainer: React.FC<ContainerProps> = ({
  children,
  speed = 50,
  gap = 40,
  direction = 'left', // 默认向左滚动
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<number | null>(null);

  // 动画核心：整体轨道根据方向滚动
  const animate = useCallback(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2; // 因为我们复制了一份
    let offset = parseFloat(track.dataset.offset || '0');

    // 根据方向调整偏移量
    offset += direction === 'left' ? -speed / 60 : speed / 60; // 60fps

    // 循环重置
    if (direction === 'left' && Math.abs(offset) >= totalWidth) {
      offset += totalWidth;
    } else if (direction === 'right' && offset >= 0) {
      offset -= totalWidth;
    }

    track.style.transform = `translateX(${offset}px)`;
    track.dataset.offset = offset.toString();

    animationId.current = requestAnimationFrame(animate);
  }, [speed, direction]);

  useEffect(() => {
    animationId.current = requestAnimationFrame(animate);
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [animate]);

  const items = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${className} py-5`}>
      {/* 左右渐隐遮罩 */}
      <div className='pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent' />
      <div className='pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-white to-transparent' />

      <div className='relative'>
        <div
          ref={trackRef}
          data-offset='0'
          className='inline-flex flex-wrap'
          style={{
            gap: `${gap}px`,
            willChange: 'transform',
            width: 'max-content',
          }}
        >
          {/* 内容复制两份，实现无缝循环 */}
          {items.map((child, i) => (
            <div
              key={`a-${i}`}
              style={{
                flex: '0 0 auto',
                width: 'auto',
                height: 'auto',
              }}
            >
              {child}
            </div>
          ))}
          {items.map((child, i) => (
            <div
              key={`b-${i}`}
              style={{
                flex: '0 0 auto',
                width: 'auto',
                height: 'auto',
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteLoopContainer;
