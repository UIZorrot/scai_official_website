import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = Math.floor(window.innerWidth / 5);

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
      speed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.1})`;
        this.speed = Math.random() * 0.2 + 0.05;
      }

      update() {
        let dx = mousePos.x - this.x;
        let dy = mousePos.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          this.x -= dx / 20;
          this.y -= dy / 20;
        } else {
          if (this.x !== this.baseX) {
            this.x -= (this.x - this.baseX) / 10;
          }
          if (this.y !== this.baseY) {
            this.y -= (this.y - this.baseY) / 10;
          }
        }

        // Mobile gravity effect
        if (isMobile) {
          this.y += this.speed;
          if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw connections between close particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = this.x - p.x;
          const dy = this.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${1 - distance/100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    init();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mousePos, isMobile]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}