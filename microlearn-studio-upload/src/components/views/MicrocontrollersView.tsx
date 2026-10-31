import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { MICROCONTROLLERS, MICROCONTROLLER_FAMILIES } from '../../data/mcus';
import { Microcontroller, MicrocontrollerFamily } from '../../types';
import { 
  Cpu, 
  Search, 
  Zap, 
  Clock, 
  HardDrive, 
  Radio, 
  Battery, 
  ShieldCheck, 
  Code2, 
  ExternalLink, 
  Check, 
  X, 
  Sparkles, 
  Layers, 
  FolderGit2, 
  ChevronRight,
  Bookmark,
  Share2,
  Copy
} from 'lucide-react';

export const MicrocontrollersView: React.FC = () => {
  const { 
    selectedMcuId, 
    setSelectedMcuId, 
    navigateWithSelection, 
    bookmarks, 
    toggleBookmark, 
    isBookmarked 
  } = useLearning();

  const [activeFamilyFilter, setActiveFamilyFilter] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Active MCU state (defaults to selectedMcuId or first MCU)
  const currentMcu = MICROCONTROLLERS.find(m => m.id === selectedMcuId) || MICROCONTROLLERS[0];

  const filteredMcus = MICROCONTROLLERS.filter(m => {
    const matchesFamily = activeFamilyFilter === 'ALL' || m.family === activeFamilyFilter;
    const matchesSearch = 
      m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.core.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.architecture.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Cpu className="h-4 w-4" />
            <span>Hardware Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Microcontroller Architecture & Learning Module
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Technical specifications, register-level hardware peripherals, memory maps, power consumption figures, and code samples for 7 major embedded families.
          </p>
        </div>

        {/* Quick Board Pinout Link */}
        <button
          onClick={() => navigateWithSelection('pin-configuration', 'board', 'esp32-devkit-v1')}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-cyan-300 border border-cyan-800/60 text-xs font-semibold shadow-sm transition-all"
        >
          <span>Open Pinout Explorer</span>
          <ChevronRight className="h-4 w-4 text-cyan-400" />
        </button>
      </div>

      {/* Filter and Selection Tabs */}
      <div className="space-y-4">
        
        {/* Family Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveFamilyFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFamilyFilter === 'ALL'
                ? 'bg-cyan-500 text-dark-900 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-dark-800 text-slate-400 hover:text-slate-200 border border-dark-700'
            }`}
          >
            All Families ({MICROCONTROLLERS.length})
          </button>

          {MICROCONTROLLER_FAMILIES.map((fam) => (
            <button
              key={fam.id}
              onClick={() => setActiveFamilyFilter(fam.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFamilyFilter === fam.id
                  ? 'bg-cyan-500 text-dark-900 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-dark-800 text-slate-400 hover:text-slate-200 border border-dark-700'
              }`}
            >
              {fam.name}
            </button>
          ))}
        </div>

        {/* Search within controllers */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter by chip name, core (e.g. Cortex-M4, RISC-V)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-850 border border-dark-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

      </div>

      {/* Two Column Layout: Left List Selector + Right 20-Point Detailed Study Page */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Chip Cards Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
            Available Microcontrollers ({filteredMcus.length})
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredMcus.map((mcu) => {
              const isSelected = currentMcu.id === mcu.id;
              return (
                <div
                  key={mcu.id}
                  onClick={() => setSelectedMcuId(mcu.id)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/80 to-dark-800 border-cyan-500/80 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                      : 'bg-dark-850 hover:bg-dark-800 border-dark-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="rounded-md bg-dark-750 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-400 border border-dark-600">
                      {mcu.family}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-400">{mcu.clockMHz} MHz</span>
                  </div>

                  <h3 className={`font-bold text-sm transition-colors ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {mcu.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{mcu.core}</p>

                  <div className="mt-3 pt-2.5 border-t border-dark-750/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{mcu.flashKB} KB Flash • {mcu.sramKB} KB RAM</span>
                    <span className="text-cyan-400 font-medium">Select &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 20-Point Detailed Specification Page */}
        <div className="lg:col-span-8 space-y-6 rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 shadow-xl">
          
          {/* Header of Detailed View */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-cyan-950/80 px-2 py-0.5 text-xs font-mono font-bold text-cyan-400 border border-cyan-800/60">
                  {currentMcu.family}
                </span>
                <span className="text-xs text-slate-400 font-medium">{currentMcu.manufacturer}</span>
                {currentMcu.badge && (
                  <span className="rounded-full bg-purple-950/80 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-purple-300 border border-purple-800/40">
                    {currentMcu.badge}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
                {currentMcu.name}
              </h2>
              <p className="text-xs sm:text-sm text-cyan-300 font-mono mt-0.5">
                {currentMcu.core} • {currentMcu.architecture}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark({ id: currentMcu.id, type: 'mcu', title: currentMcu.name })}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isBookmarked(currentMcu.id)
                    ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                    : 'bg-dark-800 text-slate-400 hover:text-slate-200 border-dark-700'
                }`}
                title="Bookmark Controller"
              >
                <Bookmark className="h-4 w-4" />
              </button>

              {currentMcu.datasheetUrl && (
                <a
                  href={currentMcu.datasheetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-300 hover:text-white border border-dark-700 text-xs font-semibold transition-all"
                >
                  <span>Official Datasheet</span>
                  <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Hardware Spec Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl bg-dark-800/80 p-3.5 border border-dark-700">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                <span>Clock Speed</span>
              </div>
              <div className="text-lg font-bold text-white font-mono">{currentMcu.clockMHz} MHz</div>
            </div>

            <div className="rounded-xl bg-dark-800/80 p-3.5 border border-dark-700">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <HardDrive className="h-3.5 w-3.5 text-purple-400" />
                <span>Flash Memory</span>
              </div>
              <div className="text-lg font-bold text-white font-mono">{currentMcu.flashKB} KB</div>
            </div>

            <div className="rounded-xl bg-dark-800/80 p-3.5 border border-dark-700">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span>SRAM Memory</span>
              </div>
              <div className="text-lg font-bold text-white font-mono">{currentMcu.sramKB} KB</div>
            </div>

            <div className="rounded-xl bg-dark-800/80 p-3.5 border border-dark-700">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Battery className="h-3.5 w-3.5 text-amber-400" />
                <span>Operating Voltage</span>
              </div>
              <div className="text-sm font-bold text-white line-clamp-1">{currentMcu.operatingVoltage.split(' ')[0]}</div>
            </div>
          </div>

          {/* Detailed 20-Point Technical Guide Sections */}
          <div className="space-y-6 pt-2">
            
            {/* 1 & 2: Architecture & Memory Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Architecture & Pipeline</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Core:</strong> {currentMcu.core}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Architecture:</strong> {currentMcu.architecture}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Maximum Clock:</strong> {currentMcu.clockMHz} MHz
                </p>
              </div>

              <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <HardDrive className="h-3.5 w-3.5" />
                  <span>Memory Hierarchy</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Program Flash ROM:</strong> {currentMcu.flashKB} KB
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Static RAM (SRAM):</strong> {currentMcu.sramKB} KB
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Non-Volatile EEPROM:</strong> {currentMcu.eepromKB ? `${currentMcu.eepromKB} KB Genuine EEPROM` : 'Emulated in Flash / NVS'}
                </p>
              </div>
            </div>

            {/* Peripheral Breakdown Table (GPIO, ADC, DAC, PWM, Timers, Interrupts) */}
            <div className="rounded-2xl bg-dark-800/60 border border-dark-700 overflow-hidden">
              <div className="px-4 py-3 bg-dark-800 border-b border-dark-700 text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Integrated On-Chip Peripherals
              </div>
              <div className="divide-y divide-dark-700 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 gap-2">
                  <span className="font-semibold text-slate-400">GPIO Capabilities:</span>
                  <span className="sm:col-span-2 text-slate-200">{currentMcu.gpioCount} Programmable General Purpose I/O Pins</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 gap-2">
                  <span className="font-semibold text-slate-400">ADC & DAC Conversion:</span>
                  <span className="sm:col-span-2 text-slate-200">
                    <strong>ADC:</strong> {currentMcu.adcChannels} <br />
                    <strong>DAC:</strong> {currentMcu.dacChannels}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 gap-2">
                  <span className="font-semibold text-slate-400">PWM Channels:</span>
                  <span className="sm:col-span-2 text-slate-200">{currentMcu.pwmChannels}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 gap-2">
                  <span className="font-semibold text-slate-400">Timers & Counters:</span>
                  <span className="sm:col-span-2 text-slate-200">{currentMcu.timers}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 gap-2">
                  <span className="font-semibold text-slate-400">Interrupt Controller:</span>
                  <span className="sm:col-span-2 text-slate-200">{currentMcu.interrupts}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 gap-2">
                  <span className="font-semibold text-slate-400">Communication Busses:</span>
                  <span className="sm:col-span-2 text-slate-200">
                    UART: {currentMcu.uartCount} • SPI: {currentMcu.spiCount} • I2C: {currentMcu.i2cCount} <br />
                    CAN Bus: {currentMcu.canSupport} <br />
                    USB: {currentMcu.usbSupport}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 p-3.5 gap-2">
                  <span className="font-semibold text-slate-400">Power Consumption Profile:</span>
                  <span className="sm:col-span-2 text-slate-200 font-mono text-[11px] leading-relaxed">
                    {currentMcu.powerConsumption}
                  </span>
                </div>

              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-emerald-950/20 border border-emerald-900/40 p-4 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Check className="h-4 w-4" />
                  <span>Key Advantages</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {currentMcu.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-rose-950/20 border border-rose-900/40 p-4 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <X className="h-4 w-4" />
                  <span>Hardware Limitations / Watchouts</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {currentMcu.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Applications & Dev Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Real-World Industrial Applications
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {currentMcu.applications.map((app, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                  Recommended Development Toolchains
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {currentMcu.devTools.map((tool, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                      <span>{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Embedded Programming Example */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  <Code2 className="h-4 w-4 text-cyan-400" />
                  <span>Validated Peripheral Code Example</span>
                </div>
                <button
                  onClick={() => handleCopyCode(currentMcu.codeSnippet)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-xs font-mono text-cyan-300 border border-dark-700 transition-colors"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="rounded-2xl bg-dark-900 border border-dark-700 p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-cyan-200 leading-relaxed">
                  <code>{currentMcu.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Beginner & Advanced Projects */}
            <div className="rounded-2xl bg-dark-800/70 p-4 border border-dark-700 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <FolderGit2 className="h-4 w-4" />
                <span>Capstone Engineering Project Ideas</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-dark-850 border border-dark-700">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Beginner Project
                  </span>
                  <p className="mt-2 text-slate-200 leading-relaxed font-medium">
                    {currentMcu.beginnerProject}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-dark-850 border border-dark-700">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                    Advanced Project
                  </span>
                  <p className="mt-2 text-slate-200 leading-relaxed font-medium">
                    {currentMcu.advancedProject}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
