import { defaultProps } from './data';
import type { GridOffset, Props } from './type';
import React, { useRef, useState, useEffect, useCallback } from 'react';

const FluidGrid: React.FC<Props> = ({
  direction = defaultProps.direction,
  speed = defaultProps.speed,
  borderColor = defaultProps.borderColor,
  squareSize = defaultProps.squareSize,
  hoverFillColor = defaultProps.hoverFillColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  // numSquaresX/Y are not actually used outside of resizeCanvas after initial calculation,
  // but keeping them as refs for potential future use or debugging.
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const [colorMode] = useState<string>('light'); // Removed setter since its logic is external

  // Use useMemo to stabilize the canvas context reference
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // --- Utility Functions ---

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use clientWidth/clientHeight for correct sizing relative to container
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Check if resize is actually necessary to avoid unnecessary re-renders/calculations
    if (canvas.width === width && canvas.height === height) return;

    canvas.width = width;
    canvas.height = height;
    // Calculate required squares (no need to store in ref if not used elsewhere)
    numSquaresX.current = Math.ceil(width / squareSize) + 1;
    numSquaresY.current = Math.ceil(height / squareSize) + 1;
  }, [squareSize]);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { x: offsetX, y: offsetY } = gridOffset.current;

    // Calculate the sub-square offset (0 to squareSize-1)
    const subOffsetX = offsetX % squareSize;
    const subOffsetY = offsetY % squareSize;

    // The logic below can be slightly optimized: instead of calculating `x` and `y` from `startX/Y`
    // and then recalculating the drawing position with `subOffset`, we can iterate
    // from the canvas edge and use the sub-offset directly.

    let gridIndexX = 0;
    for (let x = -subOffsetX; x < canvas.width; x += squareSize) {
      let gridIndexY = 0;
      for (let y = -subOffsetY; y < canvas.height; y += squareSize) {
        // Check for hover
        if (
          hoveredSquareRef.current &&
          hoveredSquareRef.current.x === gridIndexX &&
          hoveredSquareRef.current.y === gridIndexY
        ) {
          ctx.fillStyle = hoverFillColor;
          ctx.fillRect(x, y, squareSize, squareSize);
        }

        // Draw border
        ctx.strokeStyle = borderColor;
        ctx.strokeRect(x, y, squareSize, squareSize);

        gridIndexY++;
      }
      gridIndexX++;
    }

    // Gradient Overlay (kept as is for logic preservation)
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2,
    );
    gradient.addColorStop(0, colorMode === 'dark' ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, colorMode === 'dark' ? '#0b0b0b' : '#fff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [borderColor, hoverFillColor, squareSize, colorMode]);

  const updateAnimation = useCallback(() => {
    const effectiveSpeed = Math.max(speed, 0.1);
    const offset = gridOffset.current;
    const size = squareSize;

    // Use modular arithmetic to keep the offset within [0, squareSize)
    const modulo = (n: number, m: number) => ((n % m) + m) % m;

    switch (direction) {
      case 'right':
        offset.x = modulo(offset.x - effectiveSpeed, size);
        break;
      case 'left':
        offset.x = modulo(offset.x + effectiveSpeed, size);
        break;
      case 'up':
        offset.y = modulo(offset.y + effectiveSpeed, size);
        break;
      case 'down':
        offset.y = modulo(offset.y - effectiveSpeed, size);
        break;
      case 'diagonal':
        offset.x = modulo(offset.x - effectiveSpeed, size);
        offset.y = modulo(offset.y - effectiveSpeed, size);
        break;
      default:
        break;
    }

    drawGrid();
    requestRef.current = requestAnimationFrame(updateAnimation);
  }, [direction, speed, squareSize, drawGrid]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const { x: offsetX, y: offsetY } = gridOffset.current;

      const subOffsetX = offsetX % squareSize;
      const subOffsetY = offsetY % squareSize;

      const finalHoveredSquareX = Math.floor((mouseX + subOffsetX) / squareSize);
      const finalHoveredSquareY = Math.floor((mouseY + subOffsetY) / squareSize);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== finalHoveredSquareX ||
        hoveredSquareRef.current.y !== finalHoveredSquareY
      ) {
        hoveredSquareRef.current = {
          x: finalHoveredSquareX,
          y: finalHoveredSquareY,
        };
        drawGrid();
      }
    },
    [squareSize, drawGrid],
  );

  const handleMouseLeave = useCallback(() => {
    if (hoveredSquareRef.current) {
      hoveredSquareRef.current = null;
      drawGrid(); // Force a redraw to clear the hover
    }
  }, [drawGrid]);

  // Use a stable ref for event handlers to attach/detach efficiently
  const handleMouseMoveRef = useRef(handleMouseMove);
  const handleMouseLeaveRef = useRef(handleMouseLeave);
  handleMouseMoveRef.current = handleMouseMove;
  handleMouseLeaveRef.current = handleMouseLeave;

  // --- Initialization and Cleanup ---

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctxRef.current = canvas.getContext('2d');
    resizeCanvas();

    // Attach stable event listeners on the canvas DOM element
    const currentHandleMouseMove = (e: MouseEvent) => handleMouseMoveRef.current(e);
    const currentHandleMouseLeave = () => handleMouseLeaveRef.current();

    canvas.addEventListener('mousemove', currentHandleMouseMove);
    canvas.addEventListener('mouseleave', currentHandleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    requestRef.current = requestAnimationFrame(updateAnimation);

    // Return cleanup function directly
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }

      canvas.removeEventListener('mousemove', currentHandleMouseMove);
      canvas.removeEventListener('mouseleave', currentHandleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas, updateAnimation]);

  useEffect(() => {
    // The initializeCanvas function now returns the cleanup function
    const cleanup = initializeCanvas();
    return cleanup;
  }, [direction, speed, borderColor, hoverFillColor, squareSize, initializeCanvas]); // Dependencies drive re-initialization

  return (
    <div className='pointer-events-none fixed inset-0 z-50 h-full w-full'>
      <canvas ref={canvasRef} className='block h-full w-full border-none' />
    </div>
  );
};

export default FluidGrid;
