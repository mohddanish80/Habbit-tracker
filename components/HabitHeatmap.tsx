
import React from 'react';

interface HabitHeatmapProps {
  color: string;
}

const HabitHeatmap: React.FC<HabitHeatmapProps> = ({ color }) => {
  // Generate random completion pattern for demo
  const cells = Array.from({ length: 78 }).map(() => Math.random() > 0.3);

  return (
    <div className="grid grid-cols-[repeat(26,1fr)] gap-1 w-full overflow-hidden">
      {cells.map((active, i) => (
        <div
          key={i}
          className={`aspect-square rounded-[2px] ${active ? '' : 'bg-gray-100 dark:bg-white/5'}`}
          style={{ backgroundColor: active ? color : undefined, opacity: active ? (Math.random() * 0.6 + 0.4) : 1 }}
        />
      ))}
    </div>
  );
};

export default HabitHeatmap;
