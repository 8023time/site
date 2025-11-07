import { useState, useEffect } from 'react';

interface InfiniteViewProps {
  src: string[];
  interval?: number;
  direction?: 'up' | 'down';
  className?: string;
}

export default function InfiniteView({ src, interval = 10000, direction = 'up', className = '' }: InfiniteViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (animating) return;
      triggerScroll(direction);
    }, interval);
    return () => clearInterval(timer);
  }, [animating, currentIndex, direction, interval]);

  function triggerScroll(dir: 'up' | 'down') {
    setAnimating(true);
    setNextIndex(
      dir === 'down'
        ? currentIndex === src.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex === 0
          ? src.length - 1
          : currentIndex - 1,
    );

    setTimeout(() => {
      setCurrentIndex((prev) =>
        dir === 'down' ? (prev === src.length - 1 ? 0 : prev + 1) : prev === 0 ? src.length - 1 : prev - 1,
      );
      setNextIndex(null);
      setAnimating(false);
    }, 1000);
  }

  return (
    <div className={`absolute inset-0 z-[-1] h-full w-full ${className}`}>
      {/* 当前层 */}
      <div className='absolute inset-0'>
        <img
          src={src[currentIndex]}
          alt='current'
          className='h-full w-full object-fill transition-transform duration-1000'
        />
      </div>

      {/* 下一层 */}
      {nextIndex !== null && (
        <div
          className={`absolute inset-0 z-[-1] ${
            direction === 'up' ? 'animate-scrollUp' : direction === 'down' ? 'animate-scrollDown' : ''
          }`}
        >
          <img src={src[nextIndex]} alt='transition' className='h-full w-full object-fill' />
        </div>
      )}

      {/* 图片下面的固定水波纹 */}

      <style>{`
        @keyframes scrollUp {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes scrollDown {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-scrollUp {
          animation: scrollUp 1s ease-in-out forwards;
        }
        .animate-scrollDown {
          animation: scrollDown 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
