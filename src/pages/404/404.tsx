import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

export default function NotFound404() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 颜色池
  const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];

  // 初始化粒子
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    const count = 160;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 25 + 25,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
      });
    }
    return particles;
  };

  // 动画循环
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // 清屏（留尾巴效果）
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0, 0, width, height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    particles.forEach((p) => {
      // 鼠标交互
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 300;

      let targetRadius = p.radius;
      if (isHovering && distance < maxDistance) {
        const factor = 1 - distance / maxDistance;
        targetRadius = p.radius + factor * 50;
      }

      // 平滑过渡
      p.radius += (targetRadius - p.radius) * 0.1;

      // 移动
      p.x += p.vx;
      p.y += p.vy;

      // 边界反弹
      if (p.x - p.radius < 0 || p.x + p.radius > width) p.vx *= -1;
      if (p.y - p.radius < 0 || p.y + p.radius > height) p.vy *= -1;

      // 限制边界
      p.x = Math.max(p.radius, Math.min(width - p.radius, p.x));
      p.y = Math.max(p.radius, Math.min(height - p.radius, p.y));

      // 绘制
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    animationIdRef.current = requestAnimationFrame(animate);
  };

  // 鼠标移动
  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // 调整画布大小
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesRef.current = initParticles(canvas.width, canvas.height);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', () => setIsHovering(true));
      canvas.addEventListener('mouseleave', () => setIsHovering(false));
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [canvasRef, mouseRef, particlesRef, isHovering]);

  return (
    <div className='relative h-full w-full overflow-hidden'>
      {/* 手写粒子画布 */}
      <canvas ref={canvasRef} className='fixed inset-0 -z-10 blur-xl' style={{ background: '#fff' }} />

      {/* 404 文字 */}
      <div className='fixed inset-0 z-10 flex items-center justify-center bg-white mix-blend-screen'>
        <h1 className='font-nerko m-0 overflow-hidden p-0 text-center text-black'>404</h1>
      </div>

      {/* 内联样式 */}
      <style>{`
        /* latin-ext */
        @font-face {
          font-family: "Nerko One";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/nerkoone/v17/m8JQjfZSc7OXlB3ZMOjDeZRAVmo.woff2)
            format("woff2");
          unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7,
            U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F,
            U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
            U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: "Nerko One";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(https://fonts.gstatic.com/s/nerkoone/v17/m8JQjfZSc7OXlB3ZMOjDd5RA.woff2)
            format("woff2");
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
            U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
            U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        .font-nerko {
          font-family: "Nerko One", cursive;
        }

        h1 {
          width: 90%;
          text-align: center;
          position: relative;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: white;
        }

        @media (max-aspect-ratio: 10/5) {
          h1 {
            font-size: 20vw !important;
            letter-spacing: 10px !important;
          }
        }

        @media (min-aspect-ratio: 10/5) {
          h1 {
            font-size: 100vh !important;
            letter-spacing: 100px !important;
          }
        }
      `}</style>
    </div>
  );
}
