
import React from 'react';
import { ViewType } from '../types';

interface BottomNavProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onAddClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange, onAddClick }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1c0c0e]/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/10 px-6 pb-8 pt-4">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        <button 
          onClick={() => onViewChange(ViewType.TODAY)}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === ViewType.TODAY ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined ${activeView === ViewType.TODAY ? 'filled' : ''}`}>home</span>
        </button>
        
        <button 
          onClick={() => onViewChange(ViewType.WEEKLY)}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === ViewType.WEEKLY ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined ${activeView === ViewType.WEEKLY ? 'filled' : ''}`}>equalizer</span>
        </button>

        {/* Central FAB */}
        <div className="relative -top-10">
          <button 
            onClick={onAddClick}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/40 ring-4 ring-white dark:ring-[#1c0c0e] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </div>

        <button 
          onClick={() => onViewChange(ViewType.OVERALL)}
          className={`flex flex-col items-center gap-1 transition-colors ${activeView === ViewType.OVERALL ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined ${activeView === ViewType.OVERALL ? 'filled' : ''}`}>leaderboard</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-gray-400">
          <span className="material-symbols-outlined">person</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
