import React, { useEffect, useRef } from 'react';

export default function FallingPetals({ isEnabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isEnabled) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create Petals and Dust Particles
    const petalCount = window.innerWidth < 640 ? 18 : 32;
    const dustCount = window.innerWidth < 640 ? 15 : 25;

    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 8,
      speedY: Math.random() * 0.9 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.4 + 0.35,
      color: Math.random() > 0.4 ? '#F4C2C2' : '#FADADD', // Sakura / Peach tones
      sway: Math.random() * 1.5 + 0.5,
      swayOffset: Math.random() * Math.PI * 2,
    }));

    const dustMotes = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.02;

      // Draw dust motes (golden sunlight particles)
      dustMotes.forEach((d) => {
        d.y += d.speedY;
        d.x += d.speedX;
        d.angle += d.pulseSpeed;
        const currentOpacity = d.opacity * (0.6 + 0.4 * Math.sin(d.angle));

        if (d.y < 0) d.y = height + 10;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 195, 120, ${Math.max(0, currentOpacity)})`;
        ctx.shadowColor = 'rgba(235, 200, 130, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw sakura petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * p.sway + p.swayOffset) * 0.5;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        // Draw curved petal
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size * 0.5, -p.size * 0.8, -p.size * 0.8, -p.size * 0.2, 0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.2, p.size * 0.5, -p.size * 0.8, 0, 0);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Delicate inner petal line
        ctx.strokeStyle = 'rgba(220, 160, 160, 0.4)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -p.size * 0.7);
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      aria-hidden="true"
    />
  );
}
