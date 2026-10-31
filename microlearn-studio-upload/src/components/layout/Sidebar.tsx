import React from 'react';
import { useLearning, NavTab } from '../../context/LearningContext';
import { 
  LayoutDashboard, 
  Cpu, 
  GitBranch, 
  Radio, 
  FlaskConical, 
  FolderGit2, 
  Database, 
  Network, 
  Code2, 
  CheckSquare, 
  LineChart,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SidebarItem {
  id: NavTab;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & metrics' },
  { id: 'microcontrollers', label: 'Microcontrollers', badge: '7 Families', icon: Cpu, description: 'ESP32, STM32, AVR...' },
  { id: 'pin-configuration', label: 'Pin Configuration', badge: 'Interactive', icon: GitBranch, description: 'Pinout explorer & guides' },
  { id: 'sensors', label: 'Sensor Library', badge: '23 Types', icon: Radio, description: '50+ sensors & wiring' },
  { id: 'virtual-lab', label: 'Virtual Lab', badge: 'Live Sim', icon: FlaskConical, description: 'Schematics & serial logs' },
  { id: 'projects', label: 'Projects', badge: '16 Projs', icon: FolderGit2, description: 'Beginner to advanced' },
  { id: 'datasets', label: 'Dataset Explorer', badge: 'CSV/JSON', icon: Database, description: 'Telemetry charts & export' },
  { id: 'protocols', label: 'Communication Protocols', icon: Network, description: 'UART, SPI, I2C, CAN...' },
  { id: 'tutorials', label: 'Programming Tutorials', icon: Code2, description: 'Embedded C, HAL, IDF' },
  { id: 'quizzes', label: 'Quizzes', badge: 'MCQs', icon: CheckSquare, description: 'Assessments & interviews' },
  { id: 'progress', label: 'My Learning Progress', icon: LineChart, description: 'Badges & certificates' },
];

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab } = useLearning();

  const handleNavClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 border-r border-dark-700/80 bg-dark-900/95 lg:bg-dark-900/60 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-6">
          
          {/* Platform category title */}
          <div className="px-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Engineering Curriculum
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/80 to-purple-950/40 text-cyan-300 font-semibold border border-cyan-800/60 shadow-lg shadow-cyan-950/30'
                      : 'text-slate-300 hover:text-white hover:bg-dark-800/80 border border-transparent'
                  }`}
                >
                  {/* Left indicator glow bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-purple-500 shadow-sm shadow-cyan-400" />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-cyan-500/20 text-cyan-300' 
                        : 'bg-dark-800 text-slate-400 group-hover:text-cyan-400 group-hover:bg-dark-750'
                    }`}>
                      <Icon className="h-4 w-4 shrink-0" />
                    </div>
                    <div className="truncate">
                      <div className="truncate leading-tight">{item.label}</div>
                      <div className="text-[11px] text-slate-400 truncate font-normal">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`shrink-0 ml-2 rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-dark-800 text-slate-400 border border-dark-700 group-hover:border-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Hardware Compatibility Banner */}
          <div className="rounded-xl p-3.5 bg-gradient-to-br from-dark-800 to-dark-750 border border-cyan-900/40 shadow-inner">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold mb-1">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Part-Specific ECE Specs</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Datasheet grounded specifications for ESP32, STM32, AVR, RP2040, 8051, MSP430, and PIC.
            </p>
          </div>

        </div>

        {/* Sidebar Footer info */}
        <div className="p-4 border-t border-dark-800 bg-dark-900/50">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>ECE Hub v2.5</span>
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Simulation Ready
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
