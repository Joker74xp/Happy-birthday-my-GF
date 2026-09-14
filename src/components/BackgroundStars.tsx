import React, { useMemo } from 'react';

export const BackgroundStars: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      color: ['#f472b6', '#c084fc', '#fde047', '#60a5fa', '#ffffff'][Math.floor(Math.random() * 5)]
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full twinkle-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      
      {/* Soft ambient gradient orbs */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
    </div>
  );
};
