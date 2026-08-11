import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'dot' | 'ring' | 'diamond';
}

interface Node {
  x: number;
  y: number;
  label: string;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
}

const COLORS = ['#0ea5e9', '#06b6d4', '#8b5cf6', '#34d399', '#a78bfa', '#38bdf8'];

export default function BackgroundEnvironment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<Node[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(60, Math.floor((w * h) / 25000));
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type: ['dot', 'ring', 'diamond'][Math.floor(Math.random() * 3)] as Particle['type'],
      });
    }
    particlesRef.current = particles;

    const nodeLabels = ['ADS', 'AI', 'CONTENT', 'AUTO', 'TG', 'DATA'];
    const nodes: Node[] = nodeLabels.map((label, i) => {
      const angle = (i / nodeLabels.length) * Math.PI * 2;
      const radius = Math.min(w, h) * 0.25;
      const cx = w / 2;
      const cy = h / 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        baseX: cx + Math.cos(angle) * radius,
        baseY: cy + Math.sin(angle) * radius,
        label,
        size: 20 + Math.random() * 10,
        color: COLORS[i % COLORS.length],
      };
    });
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      initParticles(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll);

    let time = 0;
    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.005;

      const scrollFactor = scrollRef.current / (document.body.scrollHeight || 1);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw connections between nearby particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.04 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(p => {
        // Mouse influence
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const dMouse = Math.sqrt(dmx * dmx + dmy * dmy);
        if (dMouse < 200) {
          const force = (200 - dMouse) / 200 * 0.02;
          p.vx += (dmx / dMouse) * force;
          p.vy += (dmy / dMouse) * force;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const osc = Math.sin(time * 2 + p.x * 0.01) * 0.1;
        const alpha = p.opacity + osc;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = p.color;

        if (p.type === 'dot') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'ring') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + 1, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
      });

      // Draw floating nodes
      const nodes = nodesRef.current;
      nodes.forEach((node, i) => {
        const wobbleX = Math.sin(time + i * 1.5) * 15;
        const wobbleY = Math.cos(time + i * 1.2) * 10;
        node.x = node.baseX + wobbleX - scrollFactor * 30;
        node.y = node.baseY + wobbleY;

        // Node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2);
        gradient.addColorStop(0, node.color + '15');
        gradient.addColorStop(1, node.color + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fill();
        ctx.strokeStyle = node.color + '40';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.fillStyle = node.color + '60';
        ctx.font = '600 8px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 3);
      });

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        const next = nodes[(i + 1) % nodes.length];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(14, 165, 233, 0.06)`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 8]);
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion, initParticles]);

  if (reducedMotion) {
    // Fallback: static gradient
    return (
      <div className="bg-environment">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(14,165,233,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.05) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)',
        }} />
      </div>
    );
  }

  return (
    <div className="bg-environment">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(14,165,233,0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.04) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.03) 0%, transparent 70%)',
      }} />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: 0.7 }}
      />
    </div>
  );
}
