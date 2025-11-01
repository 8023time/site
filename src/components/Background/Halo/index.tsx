import React, { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min.js";

export interface HaloBackgroundProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  amplitudeFactor?: number;
  size?: number;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
}

function HaloBackground({
  children,
  backgroundColor = "#0f172a",
  amplitudeFactor = 3.0,
  size = 1.5,
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
}: HaloBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<any>(null);
  const timer = useRef<number | null>(null);

  const init = useCallback(() => {
    if (haloRef.current) {
      haloRef.current.destroy();
      haloRef.current = null;
    }
    if (!containerRef.current) return;

    // 关键：backgroundAlpha = 0 让 canvas 透明
    haloRef.current = HALO({
      el: containerRef.current,
      THREE,
      backgroundColor,
      mouseControls,
      touchControls,
      gyroControls,
      minHeight: 200,
      minWidth: 200,
      amplitudeFactor,
      size,
    });
  }, [
    size,
    mouseControls,
    touchControls,
    gyroControls,
    amplitudeFactor,
    backgroundColor,
  ]);

  useEffect(() => {
    init();

    const onResize = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        init();
      }, 300);
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener("resize", onResize);
      if (haloRef.current) {
        haloRef.current.destroy();
        haloRef.current = null;
      }
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none  flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default HaloBackground;
