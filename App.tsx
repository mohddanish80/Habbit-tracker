
import React, { useState, useEffect } from 'react';
import { ViewType, Habit } from './types';
import { INITIAL_HABITS } from './constants';
import BottomNav from './components/BottomNav';
import AddHabitModal from './components/AddHabitModal';
import HabitHeatmap from './components/HabitHeatmap';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.TODAY);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleHabit = (habitId: string, dayIndex: number) => {
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const newCompleted = [...h.completedDays];
        newCompleted[dayIndex] = !newCompleted[dayIndex];
        return { ...h, completedDays: newCompleted };
      }
      return h;
    }));
  };

  const handleSaveHabit = (name: string, categoryId: string) => {
    if (!name) return;
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      category: categoryId,
      icon: 'star',
      color: '#ff8fa3',
      bgColor: '#ffebef',
      frequency: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      completedDays: [false, false, false, false, false, false, false],
      streak: 0,
      successRate: 0,
    };
    setHabits(prev => [...prev, newHabit]);
    setIsModalOpen(false);
  };

  const renderTodayView = () => (
    <main className="flex-1 px-4 pt-10 pb-32 overflow-y-auto no-scrollbar">
      <header className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
          <span className="material-symbols-outlined text-lg">calendar_today</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight">Statistics</h2>
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
          <span className="material-symbols-outlined text-lg">settings</span>
        </div>
      </header>

      {/* Segmented Control */}
      <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl mb-12">
        <button onClick={() => setActiveView(ViewType.TODAY)} className={`flex-1 py-2 text-sm font-semibold rounded-lg shadow-sm transition-all ${activeView === ViewType.TODAY ? 'bg-white dark:bg-primary text-black dark:text-white' : 'text-gray-500'}`}>Today</button>
        <button onClick={() => setActiveView(ViewType.WEEKLY)} className="flex-1 py-2 text-sm font-medium text-gray-500">Weekly</button>
        <button onClick={() => setActiveView(ViewType.OVERALL)} className="flex-1 py-2 text-sm font-medium text-gray-500">Overall</button>
      </div>

      {/* Central Score Ring */}
      <div className="relative py-8 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[12px] border-gray-50 dark:border-white/5"></div>
          <div className="absolute inset-0 rounded-full border-[12px] border-primary border-r-transparent border-b-transparent rotate-45"></div>
          
          <div className="text-center z-10">
            <span className="text-6xl font-extrabold block">6.4</span>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">Daily Score</span>
          </div>

          {/* Perimeter Icons */}
          <div className="absolute -top-4 bg-[#C084FC] p-2 rounded-full shadow-lg border-2 border-white"><span className="material-symbols-outlined text-white text-sm">water_drop</span></div>
          <div className="absolute top-8 right-0 bg-[#60A5FA] p-2 rounded-full shadow-lg border-2 border-white"><span className="material-symbols-outlined text-white text-sm">fitness_center</span></div>
          <div className="absolute bottom-8 -right-4 bg-[#FDBA74] p-2 rounded-full shadow-lg border-2 border-white"><span className="material-symbols-outlined text-white text-sm">book</span></div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#86EFAC] p-2 rounded-full shadow-lg border-2 border-white"><span className="material-symbols-outlined text-white text-sm">self_improvement</span></div>
          <div className="absolute bottom-8 -left-4 bg-[#FDE047] p-2 rounded-full shadow-lg border-2 border-white"><span className="material-symbols-outlined text-white text-sm">bedtime</span></div>
          <div className="absolute top-8 left-0 bg-[#F472B6] p-2 rounded-full shadow-lg border-2 border-white"><span className="material-symbols-outlined text-white text-sm">nutrition</span></div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 mt-8">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex-1 h-14 bg-[#181012] dark:bg-white text-white dark:text-black font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add Habit
        </button>
        <button className="w-14 h-14 border-2 border-gray-100 dark:border-white/10 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-gray-600 dark:text-white">favorite</span>
        </button>
        <button className="w-14 h-14 border-2 border-gray-100 dark:border-white/10 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-gray-600 dark:text-white">share</span>
        </button>
      </div>

      <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-xl flex items-start gap-3 mb-8">
        <span className="material-symbols-outlined text-primary">warning</span>
        <div>
          <p className="font-bold text-sm">Careful! Your score dropped by 10%.</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Consistency is key to reaching your goals. You got this!</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-6">
        <h3 className="font-bold text-lg mb-4">Last 3 Days</h3>
        <div className="flex items-end justify-between gap-4 h-32">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#E9D5FF] rounded-t-lg" style={{ height: '60%' }}></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Tue</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#86EFAC] rounded-t-lg" style={{ height: '85%' }}></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Wed</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-primary rounded-t-lg" style={{ height: '70%' }}></div>
            <span className="text-[10px] font-bold text-primary uppercase">Thu</span>
          </div>
        </div>
      </div>
    </main>
  );

  const renderWeeklyView = () => (
    <main className="flex-1 px-6 pt-10 pb-32 overflow-y-auto no-scrollbar space-y-6">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">analytics</span>
          <h1 className="text-2xl font-extrabold tracking-tight">Statistics</h1>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/10">
          <span className="material-symbols-outlined text-xl">calendar_month</span>
        </button>
      </header>

      {/* Tab Switcher */}
      <div className="flex rounded-xl bg-gray-100 dark:bg-white/5 p-1">
        <button onClick={() => setActiveView(ViewType.TODAY)} className="flex-1 py-2 text-sm font-bold text-gray-400">Daily</button>
        <button className="flex-1 rounded-lg bg-white dark:bg-[#2d161a] py-2 text-sm font-bold shadow-sm ring-1 ring-black/5">Weekly</button>
        <button onClick={() => setActiveView(ViewType.OVERALL)} className="flex-1 py-2 text-sm font-bold text-gray-400">Monthly</button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-primary p-5 text-white shadow-lg shadow-primary/20">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">Weekly Performance</p>
            <h2 className="mt-1 text-3xl font-extrabold">84%</h2>
          </div>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <span className="material-symbols-outlined text-white">trending_up</span>
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-white/90">You're doing great! You've completed 12 more sessions than last week.</p>
      </div>

      <h3 className="text-lg font-bold">Habits</h3>

      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="rounded-2xl bg-white dark:bg-white/5 p-4 shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: habit.bgColor, color: habit.color }}
                >
                  <span className="material-symbols-outlined">{habit.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-base">{habit.name}</h4>
                  <p className="text-xs text-gray-400 font-medium">Everyday • 7/7 days</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary">more_vert</span>
            </div>
            <div className="flex justify-between gap-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const isCompleted = habit.completedDays[idx];
                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <button 
                      onClick={() => toggleHabit(habit.id, idx)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                        isCompleted ? 'bg-primary border-primary text-white' : 'border-dashed border-gray-200 dark:border-white/10'
                      }`}
                    >
                      {isCompleted && <span className="material-symbols-outlined text-sm">check</span>}
                    </button>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white dark:bg-white/5 p-5 shadow-sm border border-gray-100 dark:border-white/5">
        <h4 className="font-bold text-base mb-4">Total Completion</h4>
        <div className="flex items-end justify-between h-24 gap-2">
          {[40, 65, 55, 90, 45, 30, 60].map((h, i) => (
            <div 
              key={i} 
              className={`w-full rounded-t-lg ${i === 3 ? 'bg-primary' : 'bg-primary/20'}`} 
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </main>
  );

  const renderOverallView = () => (
    <main className="flex-1 px-4 pt-10 pb-32 overflow-y-auto no-scrollbar space-y-6">
      <header className="flex items-center justify-between">
        <button onClick={() => setActiveView(ViewType.TODAY)} className="size-10 flex items-center justify-center">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h1 className="text-lg font-bold">Statistics</h1>
        <button className="size-10 flex items-center justify-center">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>

      <div className="flex border-b border-gray-100 dark:border-white/5 gap-8">
        <button className="border-b-[3px] border-b-primary text-primary pb-3 pt-4 text-sm font-bold">Overall</button>
        <button onClick={() => setActiveView(ViewType.WEEKLY)} className="border-b-[3px] border-b-transparent text-gray-400 pb-3 pt-4 text-sm font-bold">Weekly</button>
        <button className="border-b-[3px] border-b-transparent text-gray-400 pb-3 pt-4 text-sm font-bold">Monthly</button>
      </div>

      <section className="flex gap-4">
        <div className="flex-1 flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="material-symbols-outlined text-primary text-xl">local_fire_department</span>
            <p className="text-xs font-semibold uppercase">Streak</p>
          </div>
          <p className="text-3xl font-extrabold leading-tight">63 days</p>
        </div>
        <div className="flex-1 flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="material-symbols-outlined text-primary text-xl">verified</span>
            <p className="text-xs font-semibold uppercase">Success</p>
          </div>
          <p className="text-3xl font-extrabold leading-tight">92%</p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-bold">Habit Heatmaps</h3>
        {habits.map(habit => (
          <div key={habit.id} className="rounded-xl shadow-sm bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 overflow-hidden">
            <div className="p-4 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${habit.color}22`, color: habit.color }}>
                  <span className="material-symbols-outlined">{habit.icon}</span>
                </div>
                <div>
                  <p className="text-base font-bold leading-tight">{habit.name}</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Health & Wellness</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-100 dark:border-white/5">
                <p className="text-gray-400 text-[10px] font-bold">DAILY</p>
              </div>
            </div>
            <div className="p-4">
              <HabitHeatmap color={habit.color} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );

  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-white dark:bg-background-dark shadow-2xl overflow-hidden flex flex-col font-display">
      {activeView === ViewType.TODAY && renderTodayView()}
      {activeView === ViewType.WEEKLY && renderWeeklyView()}
      {activeView === ViewType.OVERALL && renderOverallView()}

      <BottomNav 
        activeView={activeView} 
        onViewChange={setActiveView} 
        onAddClick={() => setIsModalOpen(true)} 
      />

      <AddHabitModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveHabit}
      />

      {/* iOS Home Indicator Bar */}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/10 dark:bg-white/10 rounded-full z-[60]" />
    </div>
  );
};

export default App;
