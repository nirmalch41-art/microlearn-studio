import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { SENSORS, SENSOR_CATEGORIES } from '../../data/sensors';
import { Sensor } from '../../types';
import { 
  Radio, 
  Search, 
  Zap, 
  Battery, 
  Cpu, 
  Code2, 
  AlertTriangle, 
  Wrench, 
  FolderGit2, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronRight, 
  Activity,
  ArrowRight,
  Bookmark
} from 'lucide-react';

export const SensorLibraryView: React.FC = () => {
  const { 
    selectedSensorId, 
    setSelectedSensorId, 
    navigateWithSelection, 
    toggleBookmark, 
    isBookmarked 
  } = useLearning();

  const [activeCategory, setActiveCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCodeTab, setActiveCodeTab] = useState<'arduino' | 'esp32' | 'stm32'>('arduino');
  const [copiedCode, setCopiedCode] = useState(false);

  const currentSensor = SENSORS.find(s => s.id === selectedSensorId) || SENSORS[0];

  const filteredSensors = SENSORS.filter(s => {
    const matchesCategory = activeCategory === 'All Categories' || s.category === activeCategory;
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.measurement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.outputType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Radio className="h-4 w-4" />
            <span>Transducers & Sensors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Complete Sensor Library & Interface Guides
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Detailed datasheets, internal transducer physics, pin-by-pin connections, voltage tolerance, validated microcontroller driver code, and mini projects across 23 categories.
          </p>
        </div>

        {/* Quick Launch Simulation Lab */}
        <button
          onClick={() => navigateWithSelection('virtual-lab', 'sensor', currentSensor.id)}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-cyan-300 border border-cyan-800/60 text-xs font-semibold shadow-sm transition-all"
        >
          <span>Test in Virtual Lab</span>
          <ChevronRight className="h-4 w-4 text-cyan-400" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SENSOR_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-dark-900 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-dark-850 text-slate-400 hover:text-slate-200 border border-dark-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sensor (e.g. DHT11, HC-SR04, MQ-135, MPU6050)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-850 border border-dark-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

      </div>

      {/* Two Column Layout: Left Sensor Cards + Right 20-Point Detailed Specification Page */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sensor Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
            Matching Sensors ({filteredSensors.length})
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredSensors.map((sensor) => {
              const isSelected = currentSensor.id === sensor.id;
              return (
                <div
                  key={sensor.id}
                  onClick={() => setSelectedSensorId(sensor.id)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-950/80 to-dark-800 border-emerald-500/80 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'bg-dark-850 hover:bg-dark-800 border-dark-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="rounded-md bg-dark-750 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400 border border-dark-600">
                      {sensor.outputType}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{sensor.operatingVoltage}</span>
                  </div>

                  <h3 className={`font-bold text-sm transition-colors ${isSelected ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {sensor.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{sensor.category}</p>

                  <div className="mt-3 pt-2.5 border-t border-dark-750/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[180px]">{sensor.communicationProtocol}</span>
                    <span className="text-emerald-400 font-medium">Inspect &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Complete 20-Point Sensor Page */}
        <div className="lg:col-span-8 rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-emerald-950/80 px-2 py-0.5 text-xs font-mono font-bold text-emerald-400 border border-emerald-800/60">
                  {currentSensor.category}
                </span>
                <span className="text-xs font-mono text-slate-400">Output: {currentSensor.outputType}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
                {currentSensor.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-300 font-mono mt-0.5">
                Protocol: {currentSensor.communicationProtocol}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark({ id: currentSensor.id, type: 'sensor', title: currentSensor.name })}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isBookmarked(currentSensor.id)
                    ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                    : 'bg-dark-800 text-slate-400 hover:text-slate-200 border-dark-700'
                }`}
                title="Bookmark Sensor"
              >
                <Bookmark className="h-4 w-4" />
              </button>

              <button
                onClick={() => navigateWithSelection('virtual-lab', 'sensor', currentSensor.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-900 font-bold text-xs shadow-md transition-all"
              >
                <Activity className="h-4 w-4" />
                <span>Simulate Sensor</span>
              </button>
            </div>
          </div>

          {/* Voltage Caution if Present */}
          {currentSensor.voltageWarning && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-950/30 border border-rose-800/50 text-rose-300 text-xs">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              <div>
                <strong className="font-mono">LOGIC LEVEL WARNING: </strong>
                <span>{currentSensor.voltageWarning}</span>
              </div>
            </div>
          )}

          {/* 1 & 2: What it Measures & Operating Voltage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block">
                Target Physical Measurement
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {currentSensor.measurement}
              </p>
            </div>

            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 block">
                Operating Voltage & Power
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-mono">
                {currentSensor.operatingVoltage} ({currentSensor.outputType})
              </p>
            </div>
          </div>

          {/* 3 & 4: Working Principle & Internal Mechanism */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-dark-800/50 p-4 border border-dark-700 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Working Principle
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentSensor.workingPrinciple}
              </p>
            </div>

            <div className="rounded-2xl bg-dark-800/50 p-4 border border-dark-700 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                Internal Physics & Transducer Electronics
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentSensor.internalExplanation}
              </p>
            </div>
          </div>

          {/* 6 & 7: Pin Configuration Table */}
          <div className="rounded-2xl bg-dark-800/60 border border-dark-700 overflow-hidden">
            <div className="px-4 py-3 bg-dark-800 border-b border-dark-700 text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Pin-by-Pin Hardware Configuration
            </div>
            <div className="divide-y divide-dark-700 text-xs">
              {currentSensor.pinConfiguration.map((pin, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-3 gap-2">
                  <span className="font-mono font-bold text-cyan-400">{pin.pin}</span>
                  <span className="text-slate-300">{pin.function}</span>
                  <span className="text-slate-400 font-mono text-[10px] uppercase text-right sm:text-left">{pin.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wiring Description & Supported MCUs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Circuit Wiring Description
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentSensor.wiringDescription}
              </p>
            </div>

            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Supported Microcontrollers
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentSensor.supportedMcus.map((mcu, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-dark-700 text-slate-200 text-xs font-mono font-medium">
                    {mcu}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 14, 15, 16: Microcontroller Code Implementations */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCodeTab('arduino')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeCodeTab === 'arduino'
                      ? 'bg-cyan-500 text-dark-900'
                      : 'bg-dark-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Arduino C++
                </button>
                <button
                  onClick={() => setActiveCodeTab('esp32')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeCodeTab === 'esp32'
                      ? 'bg-cyan-500 text-dark-900'
                      : 'bg-dark-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ESP32 (FreeRTOS/IDF)
                </button>
                {currentSensor.stm32Code && (
                  <button
                    onClick={() => setActiveCodeTab('stm32')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      activeCodeTab === 'stm32'
                        ? 'bg-cyan-500 text-dark-900'
                        : 'bg-dark-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    STM32 HAL
                  </button>
                )}
              </div>

              <button
                onClick={() => handleCopy(activeCodeTab === 'arduino' ? currentSensor.arduinoCode : activeCodeTab === 'esp32' ? currentSensor.esp32Code : currentSensor.stm32Code || '')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-xs font-mono text-cyan-300 border border-dark-700"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="rounded-2xl bg-dark-900 border border-dark-700 p-4 overflow-x-auto max-h-80">
              <pre className="text-xs font-mono text-cyan-200 leading-relaxed">
                <code>
                  {activeCodeTab === 'arduino' && currentSensor.arduinoCode}
                  {activeCodeTab === 'esp32' && currentSensor.esp32Code}
                  {activeCodeTab === 'stm32' && currentSensor.stm32Code}
                </code>
              </pre>
            </div>
          </div>

          {/* 19: Troubleshooting Guide */}
          <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Wrench className="h-4 w-4" />
              <span>Bench Troubleshooting Guide</span>
            </h4>
            <div className="space-y-2 text-xs">
              {currentSensor.troubleshooting.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-dark-850 border border-dark-750 space-y-1">
                  <div className="font-bold text-rose-300 flex items-center gap-1.5">
                    <span>Problem:</span>
                    <span>{item.problem}</span>
                  </div>
                  <div className="text-slate-300 pl-4 border-l-2 border-emerald-500">
                    <strong className="text-emerald-400">Fix: </strong>
                    {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 20: Mini Project */}
          <div className="rounded-2xl bg-gradient-to-br from-dark-800 to-dark-750 p-5 border border-cyan-800/50 space-y-2 shadow-inner">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              Suggested Mini Project
            </span>
            <h3 className="text-base font-bold text-white">
              {currentSensor.miniProject.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentSensor.miniProject.description}
            </p>
            <div className="pt-2 text-xs text-cyan-300 font-mono">
              <strong>Schematic Tip: </strong>
              {currentSensor.miniProject.schematicTip}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
