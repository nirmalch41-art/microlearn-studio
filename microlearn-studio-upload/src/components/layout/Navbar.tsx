import React from 'react';
import { useLearning, NavTab } from '../../context/LearningContext';
import { 
  Cpu, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Bookmark, 
  Award,
  FlaskConical,
  Activity
} from 'lucide-react';

export const Navbar: React.FC<{ onToggleSidebar: () => void; isSidebarOpen: boolean }> = ({ 
  onToggleSidebar, 
  isSidebarOpen 
}) => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsSearchOpen, 
    isDarkMode, 
    toggleTheme, 
    completedExperiments,
    bookmarks 
  } = useLearning();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-700/80 bg-dark-900/90 backdrop-blur-md transition-colors">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-slate-400 hover:bg-dark-800 hover:text-cyan-400 lg:hidden focus:outline-none"
            aria-label="Toggle navigation sidebar"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <Cpu className="h-5 w-5 text-dark-900 stroke-[2.5]" />
              <div className="absolute inset-0 rounded-xl border border-cyan-300/30"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-100 via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                  MicroLearn
                </span>
                <span className="rounded bg-cyan-950/80 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-400 border border-cyan-800/60">
                  Studio
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-slate-400 font-medium tracking-wide">
                ECE Microcontroller & Simulation Platform
              </p>
            </div>
          </button>
        </div>

        {/* Center: Global Search Trigger Button */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-dark-800/90 border border-dark-700 hover:border-cyan-500/50 text-sm text-slate-400 hover:text-slate-200 shadow-inner transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Search MCUs, pins, sensors, experiments...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-dark-700/80 rounded border border-dark-600">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Quick Stats, Bookmarks, Theme & Lab Shortcut */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mobile search button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-dark-800"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Quick Lab Entry Button */}
          <button
            onClick={() => setActiveTab('virtual-lab')}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
              activeTab === 'virtual-lab'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-900 font-bold shadow-cyan-500/25'
                : 'bg-dark-800 text-cyan-300 hover:bg-cyan-950/40 border border-cyan-800/50'
            }`}
          >
            <FlaskConical className="h-4 w-4" />
            <span>Virtual Lab</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          </button>

          {/* Completed Experiments Pill */}
          <button
            onClick={() => setActiveTab('progress')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 text-xs text-slate-300 hover:text-cyan-300 transition-colors"
            title="Completed Experiments"
          >
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono font-bold text-cyan-400">{completedExperiments.length}</span>
            <span className="hidden md:inline text-slate-400">/8 Labs</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => setActiveTab('progress')}
            className="relative p-2 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-dark-800 transition-colors"
            title="Saved Bookmarks"
          >
            <Bookmark className="h-4 w-4" />
            {bookmarks.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-dark-800 transition-colors"
            aria-label="Toggle color theme"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
