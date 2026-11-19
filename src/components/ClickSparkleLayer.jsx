import React, { useState, useEffect } from 'react';

export default function ClickSparkleLayer() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Don't spawn on form inputs to prevent distraction
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const id = Date.now() + Math.random();
      const x = e.clientX;
      const y = e.clientY;

      // Create a small cluster of 5-8 golden / rose particles
      const count = 6;
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: `${id}_${i}`,
        x,
        y,
        vx: (Math.random() - 0.5) * 60,
        vy: (Math.random() - 0.5) * 60 - 20,
        size: Math.random() * 8 + 4,
        color: ['#F5D061', '#E8B4B8', '#D4AF37', '#FAF7F2'][Math.floor(Math.random() * 4)],
        symbol: ['✦', '★', '•', '✧'][Math.floor(Math.random() * 4)],
      }));

      setSparkles((prev) => [...prev.slice(-25), ...newParticles]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((p) => !p.id.startsWith(String(id))));
      }, 700);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {sparkles.map((sp) => (
        <span
          key={sp.id}
          className="absolute select-none transition-all duration-700 ease-out animate-ping"
          style={{
            left: `${sp.x}px`,
            top: `${sp.y}px`,
            color: sp.color,
            fontSize: `${sp.size}px`,
            transform: `translate(${sp.vx}px, ${sp.vy}px)`,
            opacity: 0.9,
          }}
        >
          {sp.symbol}
        </span>
      ))}
    </div>
  );
}
