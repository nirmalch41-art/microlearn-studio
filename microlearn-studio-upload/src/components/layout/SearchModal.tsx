import React, { useState, useEffect, useRef } from 'react';
import { useLearning, NavTab } from '../../context/LearningContext';
import { MICROCONTROLLERS } from '../../data/mcus';
import { SENSORS } from '../../data/sensors';
import { EXPERIMENTS } from '../../data/experiments';
import { PROJECTS } from '../../data/projects';
import { PROTOCOLS } from '../../data/protocols';
import { TUTORIALS } from '../../data/tutorials';
import { PINOUT_BOARDS } from '../../data/pins';
import { 
  Search, 
  X, 
  Cpu, 
  Radio, 
  FlaskConical, 
  FolderGit2, 
  Network, 
  Code2, 
  GitBranch,
  ArrowRight
} from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateWithSelection } = useLearning();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  // Search results
  const mcuResults = q ? MICROCONTROLLERS.filter(m => 
    m.name.toLowerCase().includes(q) || 
    m.family.toLowerCase().includes(q) ||
    m.core.toLowerCase().includes(q) ||
    m.applications.some(a => a.toLowerCase().includes(q))
  ) : [];

  const sensorResults = q ? SENSORS.filter(s => 
    s.name.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q) ||
    s.measurement.toLowerCase().includes(q) ||
    s.outputType.toLowerCase().includes(q)
  ) : [];

  const experimentResults = q ? EXPERIMENTS.filter(e => 
    e.title.toLowerCase().includes(q) ||
    e.sensorName.toLowerCase().includes(q) ||
    e.boardName.toLowerCase().includes(q)
  ) : [];

  const projectResults = q ? PROJECTS.filter(p => 
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.difficulty.toLowerCase().includes(q) ||
    p.targetMcu.toLowerCase().includes(q)
  ) : [];

  const protocolResults = q ? PROTOCOLS.filter(pr => 
    pr.name.toLowerCase().includes(q) ||
    pr.fullName.toLowerCase().includes(q) ||
    pr.category.toLowerCase().includes(q)
  ) : [];

  const tutorialResults = q ? TUTORIALS.filter(t => 
    t.title.toLowerCase().includes(q) ||
    t.language.toLowerCase().includes(q) ||
    t.targetPlatform.toLowerCase().includes(q)
  ) : [];

  const boardResults = q ? PINOUT_BOARDS.filter(b =>
    b.name.toLowerCase().includes(q) ||
    b.mcuChip.toLowerCase().includes(q) ||
    b.family.toLowerCase().includes(q)
  ) : [];

  const totalResults = 
    mcuResults.length + 
    sensorResults.length + 
    experimentResults.length + 
    projectResults.length + 
    protocolResults.length + 
    tutorialResults.length +
    boardResults.length;

  const handleSelect = (tab: NavTab, type: string, id: string) => {
    setIsSearchOpen(false);
    navigateWithSelection(tab, type, id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-2xl bg-dark-850 border border-dark-700 shadow-2xl shadow-cyan-950/50 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-dark-700 bg-dark-800/80 gap-3">
          <Search className="h-5 w-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type microcontroller, sensor, pin, protocol, experiment or project..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="rounded px-2 py-1 text-xs text-slate-400 hover:bg-dark-700"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {!q ? (
            <div className="py-8 text-center space-y-3">
              <Cpu className="h-10 w-10 text-slate-600 mx-auto" />
              <p className="text-sm font-medium text-slate-300">Quickly find any ECE topic</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching for <span className="text-cyan-400">"ESP32"</span>, <span className="text-purple-400">"HC-SR04"</span>, <span className="text-emerald-400">"I2C"</span>, <span className="text-amber-400">"Streetlight"</span>, or <span className="text-blue-400">"DMA"</span>.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-400">No matches found for <span className="text-cyan-300">"{query}"</span></p>
              <p className="text-xs text-slate-400 mt-1">Try checking for spelling or using generic terms like "ADC", "Timer", or "Sensor".</p>
            </div>
          ) : (
            <div className="space-y-4">

              {/* Microcontrollers */}
              {mcuResults.length > 0 && (
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5" />
                    <span>Microcontrollers ({mcuResults.length})</span>
                  </div>
                  <div className="space-y-1">
                    {mcuResults.map(m => (
                      <button
                        key={m.id}
                        onClick={() => handleSelect('microcontrollers', 'mcu', m.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-dark-800 text-left transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300">{m.name}</div>
                          <div className="text-xs text-slate-400">{m.core} • {m.clockMHz}MHz • {m.family}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Development Boards */}
              {boardResults.length > 0 && (
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>Pinout Boards ({boardResults.length})</span>
                  </div>
                  <div className="space-y-1">
                    {boardResults.map(b => (
                      <button
                        key={b.id}
                        onClick={() => handleSelect('pin-configuration', 'board', b.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-dark-800 text-left transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200 group-hover:text-purple-300">{b.name}</div>
                          <div className="text-xs text-slate-400">{b.mcuChip} • {b.totalPins} Pins</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sensors */}
              {sensorResults.length > 0 && (
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5" />
                    <span>Sensors ({sensorResults.length})</span>
                  </div>
                  <div className="space-y-1">
                    {sensorResults.map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleSelect('sensors', 'sensor', s.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-dark-800 text-left transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200 group-hover:text-emerald-300">{s.name}</div>
                          <div className="text-xs text-slate-400">{s.category} • {s.outputType} • {s.operatingVoltage}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Virtual Lab Experiments */}
              {experimentResults.length > 0 && (
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <FlaskConical className="h-3.5 w-3.5" />
                    <span>Virtual Lab Experiments ({experimentResults.length})</span>
                  </div>
                  <div className="space-y-1">
                    {experimentResults.map(e => (
                      <button
                        key={e.id}
                        onClick={() => handleSelect('virtual-lab', 'experiment', e.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-dark-800 text-left transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200 group-hover:text-amber-300">Lab {e.experimentNumber}: {e.title}</div>
                          <div className="text-xs text-slate-400">{e.boardName} + {e.sensorName} ({e.difficulty})</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projectResults.length > 0 && (
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                    <FolderGit2 className="h-3.5 w-3.5" />
                    <span>Projects ({projectResults.length})</span>
                  </div>
                  <div className="space-y-1">
                    {projectResults.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSelect('projects', 'project', p.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-dark-800 text-left transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200 group-hover:text-rose-300">{p.title}</div>
                          <div className="text-xs text-slate-400">{p.difficulty} • {p.category} • {p.targetMcu}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Protocols */}
              {protocolResults.length > 0 && (
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5">
                    <Network className="h-3.5 w-3.5" />
                    <span>Communication Protocols ({protocolResults.length})</span>
                  </div>
                  <div className="space-y-1">
                    {protocolResults.map(pr => (
                      <button
                        key={pr.id}
                        onClick={() => handleSelect('protocols', 'protocol', pr.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-dark-800 text-left transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200 group-hover:text-blue-300">{pr.name} - {pr.fullName}</div>
                          <div className="text-xs text-slate-400">{pr.category} • Speed: {pr.maxSpeed}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tutorials */}
              {tutorialResults.length > 0 && (
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Programming Tutorials ({tutorialResults.length})</span>
                  </div>
                  <div className="space-y-1">
                    {tutorialResults.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleSelect('tutorials', 'tutorial', t.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-dark-800 text-left transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300">{t.title}</div>
                          <div className="text-xs text-slate-400">{t.language} • {t.targetPlatform}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-dark-700 bg-dark-900 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search spans MCUs, pin configurations, sensors, and labs</span>
          <span className="font-mono">Press ESC to dismiss</span>
        </div>

      </div>
    </div>
  );
};
