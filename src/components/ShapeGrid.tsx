import { useEffect, useRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'diagonal';
type Shape = 'square' | 'hexagon' | 'circle' | 'triangle';

interface ShapeGridProps {
  speed?: number;
  squareSize?: number;
  direction?: Direction;
  borderColor?: string;
  hoverFillColor?: string;
  shape?: Shape;
  hoverTrailAmount?: number;
  className?: string;
}

interface TrailCell {
  x: number;
  y: number;
  age: number;
}

export default function ShapeGrid({
  speed = 0.5,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = '#0d0a0a',
  hoverFillColor = '#7a1128',
  shape = 'square',
  hoverTrailAmount = 5,
  className,
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailCell[]>([]);
  const offsetRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawShape = (cx: number, cy: number, size: number, fill: string | null) => {
      const r = size / 2;
      ctx.beginPath();
      switch (shape) {
        case 'circle':
          ctx.arc(cx, cy, r * 0.72, 0, Math.PI * 2);
          break;
        case 'triangle': {
          const h = r * 1.25;
          ctx.moveTo(cx, cy - h * 0.62);
          ctx.lineTo(cx + h * 0.62, cy + h * 0.5);
          ctx.lineTo(cx - h * 0.62, cy + h * 0.5);
          ctx.closePath();
          break;
        }
        case 'hexagon': {
          const hr = r * 0.82;
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const px = cx + hr * Math.cos(angle);
            const py = cy + hr * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          break;
        }
        case 'square':
        default:
          ctx.rect(cx - r * 0.78, cy - r * 0.78, r * 1.56, r * 1.56);
          break;
      }
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      } else {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.18;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };

    const step = () => {
      const dx =
        direction === 'left' ? -speed : direction === 'right' || direction === 'diagonal' ? speed : 0;
      const dy =
        direction === 'up' ? -speed : direction === 'down' || direction === 'diagonal' ? speed : 0;

      offsetRef.current.x = (offsetRef.current.x + dx + squareSize) % squareSize;
      offsetRef.current.y = (offsetRef.current.y + dy + squareSize) % squareSize;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / squareSize) + 2;
      const rows = Math.ceil(height / squareSize) + 2;
      const startX = -squareSize + offsetRef.current.x;
      const startY = -squareSize + offsetRef.current.y;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cx = startX + i * squareSize + squareSize / 2;
          const cy = startY + j * squareSize + squareSize / 2;
          drawShape(cx, cy, squareSize, null);
        }
      }

      trailRef.current.forEach((cell) => {
        const alpha = Math.max(0, 1 - cell.age / (hoverTrailAmount + 1));
        ctx.globalAlpha = alpha;
        drawShape(cell.x, cell.y, squareSize, hoverFillColor);
        ctx.globalAlpha = 1;
        cell.age += 1;
      });
      trailRef.current = trailRef.current.filter((c) => c.age <= hoverTrailAmount);

      raf = requestAnimationFrame(step);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my };

      const startX = -squareSize + offsetRef.current.x;
      const startY = -squareSize + offsetRef.current.y;
      const col = Math.floor((mx - startX) / squareSize);
      const row = Math.floor((my - startY) / squareSize);
      const cx = startX + col * squareSize + squareSize / 2;
      const cy = startY + row * squareSize + squareSize / 2;

      const last = trailRef.current[trailRef.current.length - 1];
      if (!last || last.x !== cx || last.y !== cy) {
        trailRef.current.push({ x: cx, y: cy, age: 0 });
        if (hoverTrailAmount <= 0) {
          trailRef.current = trailRef.current.slice(-1);
        }
      }
    };

    const handleLeave = () => {
      mouseRef.current = null;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, [speed, squareSize, direction, borderColor, hoverFillColor, shape, hoverTrailAmount]);

  return <canvas ref={canvasRef} className={className} style={{ display: 'block', width: '100%', height: '100%' }} />;
}
