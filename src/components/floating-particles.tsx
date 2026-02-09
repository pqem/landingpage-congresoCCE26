"use client";

import { useMemo } from "react";

export function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      size: 2 + Math.random() * 3,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-particle rounded-full bg-dorado"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
