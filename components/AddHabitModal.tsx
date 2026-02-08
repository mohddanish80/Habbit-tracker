
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, categoryId: string) => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="relative w-full bg-white dark:bg-[#1c0c0e] rounded-t-[32px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Handle */}
        <div className="flex h-8 w-full items-center justify-center sticky top-0 bg-white dark:bg-[#1c0c0e] z-30">
          <div className="h-1.5 w-12 rounded-full bg-gray-200 dark:bg-white/10" />
        </div>

        <div className="overflow-y-auto no-scrollbar px-6 pb-40">
          <div className="flex justify-between items-center py-2 mb-6">
            <h2 className="text-[#181012] dark:text-white text-2xl font-extrabold">Add New Habit</h2>
            <button className="text-primary font-bold text-sm" onClick={() => { setName(''); setSelectedCategory(CATEGORIES[0].id); }}>Reset</button>
          </div>

          {/* Habit Name Input */}
          <div className="mb-8">
            <label className="block text-sm font-bold mb-2 ml-1">Habit Name</label>
            <div className="relative">
              <input 
                className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl h-14 px-4 text-base focus:ring-2 focus:ring-primary/50" 
                placeholder="e.g., Morning Meditation" 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">edit_note</span>
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold mb-4 ml-1">Select Category</label>
            <div className="grid grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-center gap-2 transition-all ${selectedCategory === cat.id ? 'scale-105' : 'opacity-60'}`}
                >
                  <div 
                    className={`w-full aspect-square rounded-2xl flex items-center justify-center border-2 transition-all`}
                    style={{ 
                      backgroundColor: cat.bgColor,
                      borderColor: selectedCategory === cat.id ? cat.color : 'transparent'
                    }}
                  >
                    <span className="material-symbols-outlined text-[28px]" style={{ color: cat.color }}>{cat.icon}</span>
                  </div>
                  <span className="text-[11px] font-bold" style={{ color: selectedCategory === cat.id ? cat.color : undefined }}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Frequency Picker */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 ml-1">
              <label className="text-sm font-bold">Frequency</label>
              <span className="text-xs text-gray-500 font-medium">Every Day</span>
            </div>
            <div className="flex justify-between gap-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <button 
                  key={idx}
                  className="flex-1 aspect-square max-w-[44px] rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center"
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Reminder Toggle */}
          <div className="mb-8">
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-primary">notifications_active</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Daily Reminder</p>
                  <p className="text-xs text-gray-500">Notify me at 08:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-primary font-bold text-lg">08:00</div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-[#1c0c0e]/80 backdrop-blur-md border-t border-gray-100 dark:border-white/5 flex flex-col gap-3">
          <button 
            onClick={() => onSave(name, selectedCategory)}
            className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98]"
          >
            Save Habit
          </button>
          <button 
            onClick={onClose}
            className="w-full py-2 text-gray-500 font-bold text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;
