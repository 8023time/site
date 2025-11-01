import type { TypewriterProps } from "./data";
import { defaultTypewriterProps } from "./data";
import React, { useState, useEffect, useRef } from "react";

// 渐变颜色数组
const gradientColors = [
  "rgb(243, 112, 85)",
  "rgb(239, 78, 123)",
  "rgb(161, 102, 171)",
  "rgb(80, 115, 184)",
  "rgb(16, 152, 173)",
  "rgb(7, 179, 155)",
  "rgb(111, 186, 130)",
];

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
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentTextIndex];
    const speed = isDeleting ? deleteSpeed : typingSpeed;

    // 清理旧的定时器
    if (intervalRef.current) clearTimeout(intervalRef.current);

    intervalRef.current = setTimeout(() => {
      if (!isDeleting) {
        // 打字中
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          // 打完一段，暂停后开始删除（除非是最后一段且不循环）
          if (!loop && currentTextIndex === texts.length - 1) return;

          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // 删除中
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          // 删除完毕，切换到下一段
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [
    displayedText,
    currentTextIndex,
    isDeleting,
    texts,
    typingSpeed,
    deleteSpeed,
    pauseTime,
    loop,
  ]);

  // 重置动画（当 texts 变化时）
  useEffect(() => {
    setDisplayedText("");
    setCurrentTextIndex(0);
    setIsDeleting(false);
  }, [texts]);

  // 构造渐变 CSS 字符串
  const gradientStyle =
    textColor === "auto"
      ? {
          background: `linear-gradient(90deg, ${gradientColors.join(", ")})`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          // 回退颜色，针对不支持 -webkit-background-clip 的浏览器
          fallbackColor: gradientColors[0],
        }
      : { color: textColor };

  return (
    <div className={`inline-block  ${className}`}>
      <span
        className="whitespace-pre-wrap overflow-hidden inline-block align-middle p-3 text-4xl"
        style={{ position: "relative", ...gradientStyle }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            verticalAlign: "middle",
          }}
        >
          {displayedText}

          {/* 光标*/}
          {cursor && (
            <span
              className="animate-blink"
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                borderRadius: "1px",
                backgroundColor: cursorColor,
                verticalAlign: "middle",
              }}
            />
          )}
        </span>

        {/* 遮罩层 */}
        {mask && (
          <span
            className="absolute inset-0 rounded-2xl animate-mask"
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
