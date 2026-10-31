import React from 'react';
import { useLearning } from '../../context/LearningContext';
import { MICROCONTROLLERS, MICROCONTROLLER_FAMILIES } from '../../data/mcus';
import { SENSORS, SENSOR_CATEGORIES } from '../../data/sensors';
import { EXPERIMENTS } from '../../data/experiments';
import { PROJECTS } from '../../data/projects';
import { PINOUT_BOARDS } from '../../data/pins';
import { 
  Cpu, 
  Radio, 
  FlaskConical, 
  GitBranch, 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
  Activity,
  Play
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    setActiveTab, 
    setIsSearchOpen, 
    navigateWithSelection, 
    completedExperiments,
    quizScores
  } = useLearning();

  const totalFamilies = MICROCONTROLLER_FAMILIES.length;
  const totalSensors = SENSORS.length;
  const totalExperiments = EXPERIMENTS.length;
  const totalProjects = PROJECTS.length;
  const progressPercent = Math.min(100, Math.round(((completedExperiments.length + Object.keys(quizScores).length) / (totalExperiments + 6)) * 100));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-850 via-dark-800 to-dark-900 border border-dark-700/80 p-6 sm:p-10 shadow-2xl">
        {/* Background circuit grid graphic */}
        <div className="absolute inset-0 circuit-grid opacity-30 pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Interactive Microcontroller Engineering Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Master Embedded Hardware from <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Silicon Registers to Cloud Telemetry</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Designed specifically for Electronics and Communication Engineering (ECE) students. Explore interactive pin configurations, datasheet-accurate specifications, 23 sensor families, and real-time virtual laboratory simulations.
          </p>

          {/* Quick Hero Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('virtual-lab')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-900 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
            >
              <FlaskConical className="h-4 w-4 stroke-[2.5]" />
              <span>Launch Virtual Lab</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            </button>

            <button
              onClick={() => setActiveTab('pin-configuration')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-750 hover:bg-dark-700 text-slate-200 border border-dark-600 font-semibold text-sm transition-all"
            >
              <GitBranch className="h-4 w-4 text-purple-400" />
              <span>Interactive Pin Explorer</span>
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-800/80 hover:bg-dark-750 text-slate-400 hover:text-slate-200 border border-dark-700 text-sm transition-all"
            >
              <Search className="h-4 w-4 text-cyan-400" />
              <span>Quick Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: MCU Families */}
        <div 
          onClick={() => setActiveTab('microcontrollers')}
          className="group cursor-pointer rounded-2xl bg-dark-850 p-5 border border-dark-700/80 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-950/20 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <Cpu className="h-6 w-6" />
            </div>
            <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">
              Explore &rarr;
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalFamilies} Families</div>
          <div className="text-xs text-slate-400 mt-1 font-medium">ESP32, STM32, AVR, RP2040, 8051, PIC, MSP430</div>
        </div>

        {/* Metric 2: Available Sensors */}
        <div 
          onClick={() => setActiveTab('sensors')}
          className="group cursor-pointer rounded-2xl bg-dark-850 p-5 border border-dark-700/80 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-950/20 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Radio className="h-6 w-6" />
            </div>
            <span className="text-xs font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              Catalog &rarr;
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">23 Categories</div>
          <div className="text-xs text-slate-400 mt-1 font-medium">50+ Sensors with wiring & part code</div>
        </div>

        {/* Metric 3: Virtual Lab Experiments */}
        <div 
          onClick={() => setActiveTab('virtual-lab')}
          className="group cursor-pointer rounded-2xl bg-dark-850 p-5 border border-dark-700/80 hover:border-purple-500/50 shadow-lg hover:shadow-purple-950/20 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <FlaskConical className="h-6 w-6" />
            </div>
            <span className="text-xs font-mono text-purple-400 group-hover:translate-x-0.5 transition-transform">
              Simulate &rarr;
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalExperiments} Experiments</div>
          <div className="text-xs text-slate-400 mt-1 font-medium">Interactive breadboards & serial monitor</div>
        </div>

        {/* Metric 4: Real-World Projects */}
        <div 
          onClick={() => setActiveTab('projects')}
          className="group cursor-pointer rounded-2xl bg-dark-850 p-5 border border-dark-700/80 hover:border-amber-500/50 shadow-lg hover:shadow-amber-950/20 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Layers className="h-6 w-6" />
            </div>
            <span className="text-xs font-mono text-amber-400 group-hover:translate-x-0.5 transition-transform">
              Schematics &rarr;
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalProjects} Projects</div>
          <div className="text-xs text-slate-400 mt-1 font-medium">Beginner, Intermediate & Advanced</div>
        </div>

      </div>

      {/* Progress & Quick Continue Section */}
      <div className="rounded-2xl bg-dark-850 border border-dark-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-bold text-slate-200">Your ECE Learning Progress</span>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400">{progressPercent}% Completed</span>
          </div>
          <div className="w-full h-3 rounded-full bg-dark-700 overflow-hidden relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">
            {completedExperiments.length} of {totalExperiments} simulation experiments completed. Test your understanding with technical quizzes!
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('quizzes')}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 border border-dark-700 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <span>Take Quick Assessment</span>
            <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 border border-cyan-800/60 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <span>View Badges & Certificate</span>
          </button>
        </div>
      </div>

      {/* Popular Microcontroller Boards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Popular Microcontroller Boards</h2>
            <p className="text-xs text-slate-400">Click any board to inspect its complete interactive pin configuration diagram</p>
          </div>
          <button
            onClick={() => setActiveTab('pin-configuration')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>All 10 Boards</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PINOUT_BOARDS.slice(0, 4).map((board) => (
            <div
              key={board.id}
              onClick={() => navigateWithSelection('pin-configuration', 'board', board.id)}
              className="group cursor-pointer rounded-2xl bg-dark-850 hover:bg-dark-800 border border-dark-700/80 hover:border-cyan-500/40 p-4 transition-all shadow-md hover:shadow-cyan-950/20"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-md bg-dark-750 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-400 border border-dark-600">
                  {board.family}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{board.totalPins} Pins</span>
              </div>
              <h3 className="font-bold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                {board.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">{board.mcuChip}</p>
              
              <div className="mt-4 pt-3 border-t border-dark-750 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400">
                <span>View Pinout</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Experiments Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Recommended Simulation Labs</h2>
            <p className="text-xs text-slate-400">Step-by-step circuit wiring and live interactive sensor simulation</p>
          </div>
          <button
            onClick={() => setActiveTab('virtual-lab')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Open All Labs</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIMENTS.slice(0, 4).map((exp) => {
            const isCompleted = completedExperiments.includes(exp.id);
            return (
              <div
                key={exp.id}
                onClick={() => navigateWithSelection('virtual-lab', 'experiment', exp.id)}
                className="group cursor-pointer rounded-2xl bg-dark-850 hover:bg-dark-800 border border-dark-700/80 hover:border-purple-500/40 p-4 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-md bg-purple-950/60 px-2 py-0.5 text-[10px] font-mono font-semibold text-purple-300 border border-purple-800/40">
                      Lab {exp.experimentNumber}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Ready</span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-slate-200 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {exp.aim}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-dark-700 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <div className="flex items-center gap-1.5">
                    <Play className="h-3 w-3 fill-cyan-400" />
                    <span>Run Lab</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal">{exp.difficulty}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Microcontroller Family Overview Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">The 7 Microcontroller Families</h2>
            <p className="text-xs text-slate-400">Comprehensive architectures from 8-bit Harvard to 32-bit RISC-V and ARM</p>
          </div>
          <button
            onClick={() => setActiveTab('microcontrollers')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Architecture Matrix</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MICROCONTROLLER_FAMILIES.map((family) => (
            <div
              key={family.id}
              onClick={() => {
                setActiveTab('microcontrollers');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer rounded-2xl bg-dark-850 hover:bg-dark-800 border border-dark-700/80 hover:border-cyan-500/40 p-4 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {family.name}
                </h3>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  {family.count} Chip Profiles
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {family.desc}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-dark-750 text-xs text-slate-400 group-hover:text-cyan-300">
                <span>View Full Specs</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
