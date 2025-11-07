import type { TypewriterProps } from './type';
import React, { useState, useEffect, useRef } from 'react';
import { defaultTypewriterProps, gradientColors } from './data';

const Typewriter: React.FC<TypewriterProps> = ({
  texts = defaultTypewriterProps.texts,
  typingSpeed = defaultTypewriterProps.typingSpeed,
  deleteSpeed = defaultTypewriterProps.deleteSpeed,
  pauseTime = defaultTypewriterProps.pauseTime,
  loop = defaultTypewriterProps.loop,
  cursor = defaultTypewriterProps.cursor,
  cursorColor = defaultTypewriterProps.cursorColor,
  className = defaultTypewriterProps.className,
  textColor = defaultTypewriterProps.textColor,
  mask = defaultTypewriterProps.mask,
  maskColor = defaultTypewriterProps.maskColor,
  textSize = defaultTypewriterProps.textSize,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentTextIndex];
    const speed = isDeleting ? deleteSpeed : typingSpeed;

    if (intervalRef.current) clearTimeout(intervalRef.current);

    intervalRef.current = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          if (!loop && currentTextIndex === texts.length - 1) return;

          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [displayedText, currentTextIndex, isDeleting, texts, typingSpeed, deleteSpeed, pauseTime, loop]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentTextIndex(0);
    setIsDeleting(false);
  }, [texts]);

  const gradientStyle =
    textColor === 'auto'
      ? {
          background: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fallbackColor: gradientColors[0],
        }
      : { color: textColor };

  return (
    <div className={`inline-block ${className}`}>
      <span
        className='inline-block overflow-hidden p-3 align-middle text-4xl whitespace-pre-wrap'
        style={{ position: 'relative', ...gradientStyle, fontSize: textSize }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            verticalAlign: 'middle',
          }}
        >
          {displayedText}

          {/* 光标*/}
          {cursor && (
            <span
              className='animate-blink'
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                borderRadius: '1px',
                backgroundColor: cursorColor,
                verticalAlign: 'middle',
              }}
            />
          )}
        </span>

        {/* 遮罩层 */}
        {mask && (
          <span
            className='animate-mask absolute inset-0 rounded-2xl'
            style={{
              background: maskColor,
              opacity: 0.5,
            }}
          />
        )}
      </span>

      <style>{`
          @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
    `}</style>
    </div>
  );
};

export default Typewriter;
