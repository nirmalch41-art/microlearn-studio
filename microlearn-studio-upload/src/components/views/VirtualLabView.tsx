import React, { useState, useEffect, useRef } from 'react';
import { useLearning } from '../../context/LearningContext';
import { EXPERIMENTS } from '../../data/experiments';
import { Experiment } from '../../types';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Sliders, 
  Terminal, 
  Activity, 
  Code2, 
  Cpu, 
  Radio, 
  Copy, 
  Check, 
  BookOpen, 
  ExternalLink,
  Zap,
  Info,
  Maximize2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

export const VirtualLabView: React.FC = () => {
  const { 
    selectedExperimentId, 
    setSelectedExperimentId, 
    completedExperiments, 
    toggleExperimentCompleted 
  } = useLearning();

  const [activeExpId, setActiveExpId] = useState<string>(selectedExperimentId || 'exp-1');
  const currentExp = EXPERIMENTS.find(e => e.id === activeExpId) || EXPERIMENTS[0];

  // Simulation State
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [stimulusValue, setStimulusValue] = useState<number>(currentExp.simulationConfig.defaultStimulus);
  const [serialLogs, setSerialLogs] = useState<Array<{ id: number; time: string; text: string }>>([]);
  const [baudRate, setBaudRate] = useState<number>(115200);
  const [activeDetailTab, setActiveDetailTab] = useState<'simulation' | 'schematic' | 'code' | 'procedure' | 'wokwi'>('simulation');
  const [chartData, setChartData] = useState<Array<{ time: string; value: number; rawAdc: number }>>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Reset stimulus and logs when experiment switches
  useEffect(() => {
    setStimulusValue(currentExp.simulationConfig.defaultStimulus);
    setChartData([]);
    setSerialLogs([
      { id: Date.now(), time: '00:00:00.000', text: `[SYSTEM] Loaded Experiment ${currentExp.experimentNumber}: ${currentExp.title}` },
      { id: Date.now() + 1, time: '00:00:00.010', text: `[KERNEL] Board: ${currentExp.boardName} | Sensor: ${currentExp.sensorName} initialized.` }
    ]);
  }, [currentExp]);

  // Simulation tick loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const reading = currentExp.simulationConfig.computeReading(stimulusValue);
      const now = new Date();
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;

      // Append serial message
      setSerialLogs(prev => {
        const next = [...prev, { id: Date.now(), time: timeStr, text: reading.logMessage }];
        return next.slice(-40); // Keep last 40 logs
      });

      // Append chart data
      setChartData(prev => {
        const numericVal = typeof reading.processedValue === 'number' 
          ? reading.processedValue 
          : parseFloat(String(reading.processedValue)) || stimulusValue;
        const next = [...prev, { time: timeStr.slice(3, 8), value: numericVal, rawAdc: reading.rawAdc }];
        return next.slice(-20); // Keep last 20 points
      });

    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning, stimulusValue, currentExp]);

  // Auto scroll serial monitor
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [serialLogs]);

  const currentReading = currentExp.simulationConfig.computeReading(stimulusValue);
  const isExperimentDone = completedExperiments.includes(currentExp.id);

  const handleCopyCode = () => {
    const code = currentExp.sourceCode.esp32 || currentExp.sourceCode.arduino || currentExp.sourceCode.stm32 || currentExp.sourceCode.c51 || '';
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <FlaskConical className="h-4 w-4" />
            <span>Interactive Electronics Laboratory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Virtual Circuit Simulation Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Simulate microcontroller input stimuli, observe real-time serial monitor baud communication, inspect pin waveforms, and verify step-by-step procedures.
          </p>
        </div>

        {/* Mark Completed Toggle */}
        <button
          onClick={() => toggleExperimentCompleted(currentExp.id)}
          className={`self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs shadow-md transition-all ${
            isExperimentDone
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/80 hover:bg-emerald-900/80'
              : 'bg-dark-800 hover:bg-dark-750 text-slate-300 border-dark-700'
          }`}
        >
          <CheckCircle2 className={`h-4 w-4 ${isExperimentDone ? 'text-emerald-400' : 'text-slate-400'}`} />
          <span>{isExperimentDone ? 'Experiment Completed' : 'Mark as Completed'}</span>
        </button>
      </div>

      {/* Experiment Selector Carousel / Horizontal List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Select Lab Experiment (8 Total Initial Labs)
          </span>
          <span className="text-xs text-cyan-400 font-mono">
            {completedExperiments.length}/{EXPERIMENTS.length} Completed
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {EXPERIMENTS.map((exp) => {
            const isSelected = currentExp.id === exp.id;
            const isDone = completedExperiments.includes(exp.id);
            return (
              <button
                key={exp.id}
                onClick={() => {
                  setActiveExpId(exp.id);
                  setSelectedExperimentId(exp.id);
                }}
                className={`p-3 rounded-2xl border text-left min-w-[240px] transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/90 to-purple-950/80 border-cyan-500/80 shadow-lg shadow-cyan-950/50'
                    : 'bg-dark-850 hover:bg-dark-800 border-dark-700/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-dark-750 text-cyan-400 border border-dark-600">
                    Lab #{exp.experimentNumber}
                  </span>
                  {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                </div>
                <div className={`font-bold text-xs line-clamp-1 ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                  {exp.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                  {exp.boardName} • {exp.sensorName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Simulation Control Panel & Live Serial Monitor */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Simulation Header & Run Controls */}
          <div className="rounded-3xl bg-dark-850 border border-dark-700/80 p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-purple-400 tracking-wider">
                  Live Browser Model (Clearly Labeled Behavioral Simulation)
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {currentExp.title}
                </h3>
              </div>

              {/* Simulation Engine Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all shadow-md ${
                    isRunning
                      ? 'bg-amber-500 hover:bg-amber-400 text-dark-900'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-dark-900'
                  }`}
                >
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-dark-900" />}
                  <span>{isRunning ? 'Pause Sim' : 'Run Sim'}</span>
                </button>

                <button
                  onClick={() => {
                    setStimulusValue(currentExp.simulationConfig.defaultStimulus);
                    setSerialLogs([]);
                    setChartData([]);
                  }}
                  className="p-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-300 border border-dark-700 text-xs"
                  title="Reset Experiment"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Interactive Physical Stimulus Slider Control */}
            <div className="rounded-2xl bg-dark-800/80 p-5 border border-dark-700 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                    Stimulus Input: {currentExp.simulationConfig.stimulusName}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-cyan-950/80 text-cyan-300 font-mono font-extrabold text-sm border border-cyan-700/60 shadow-inner">
                  {stimulusValue} {currentExp.simulationConfig.stimulusUnit}
                </span>
              </div>

              {/* Slider Component */}
              <input
                type="range"
                min={currentExp.simulationConfig.stimulusMin}
                max={currentExp.simulationConfig.stimulusMax}
                step={currentExp.simulationConfig.stimulusStep}
                value={stimulusValue}
                onChange={(e) => setStimulusValue(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg bg-dark-700 accent-cyan-400 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Min: {currentExp.simulationConfig.stimulusMin} {currentExp.simulationConfig.stimulusUnit}</span>
                <span>Default: {currentExp.simulationConfig.defaultStimulus}</span>
                <span>Max: {currentExp.simulationConfig.stimulusMax} {currentExp.simulationConfig.stimulusUnit}</span>
              </div>
            </div>

            {/* Real-Time Sensor Telemetry Output Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-dark-800 border border-dark-700">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Raw ADC</span>
                <span className="font-mono text-base font-bold text-cyan-400 mt-0.5 block">{currentReading.rawAdc}</span>
              </div>

              <div className="p-3 rounded-xl bg-dark-800 border border-dark-700">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Pin Voltage</span>
                <span className="font-mono text-base font-bold text-purple-400 mt-0.5 block">{currentReading.pinVoltage.toFixed(2)} V</span>
              </div>

              <div className="p-3 rounded-xl bg-dark-800 border border-dark-700">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Status</span>
                <span className={`text-xs font-bold mt-1 block ${
                  currentReading.status === 'Alert' ? 'text-rose-400 font-bold animate-pulse' :
                  currentReading.status === 'Warning' ? 'text-amber-400' :
                  currentReading.status === 'Triggered' ? 'text-emerald-400 font-bold' :
                  'text-slate-200'
                }`}>
                  {currentReading.status}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-dark-800 border border-dark-700 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Indicator Pin</span>
                <span className={`flex items-center gap-1.5 text-xs font-bold ${
                  currentReading.indicatorActive ? 'text-emerald-400' : 'text-slate-500'
                }`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${
                    currentReading.indicatorActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-700'
                  }`}></span>
                  <span>{currentReading.indicatorActive ? 'HIGH (1)' : 'LOW (0)'}</span>
                </span>
              </div>
            </div>

            {/* Real-time Simulated Waveform Chart */}
            <div className="rounded-2xl bg-dark-800/80 p-4 border border-dark-700 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <span>Real-Time Waveform & ADC Tracking</span>
                </span>
                <span className="text-cyan-400 text-[10px]">{isRunning ? 'Streaming at 0.67 Hz' : 'Simulation Paused'}</span>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Line type="monotone" dataKey="rawAdc" stroke="#06b6d4" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Virtual Serial Monitor Terminal */}
            <div className="rounded-2xl bg-dark-900 border border-dark-700 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-dark-800 border-b border-dark-700 text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="font-mono font-bold text-slate-200">UART Serial Monitor Output</span>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={baudRate}
                    onChange={(e) => setBaudRate(Number(e.target.value))}
                    className="bg-dark-900 text-cyan-300 font-mono text-[10px] px-2 py-1 rounded border border-dark-600 focus:outline-none"
                  >
                    <option value={9600}>9600 baud</option>
                    <option value={115200}>115200 baud</option>
                  </select>
                  <button
                    onClick={() => setSerialLogs([])}
                    className="text-[10px] text-slate-400 hover:text-slate-200 font-mono"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div 
                ref={terminalRef}
                className="h-40 overflow-y-auto p-3 font-mono text-xs text-slate-300 space-y-1 bg-dark-950/80"
              >
                {serialLogs.map((log) => (
                  <div key={log.id} className="leading-tight">
                    <span className="text-slate-400 select-none">[{log.time}] </span>
                    <span className="text-cyan-300">{log.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Pin Connections, Circuit Schematic & Experiment Tabs */}
        <div className="lg:col-span-5 rounded-3xl bg-dark-850 border border-dark-700/80 p-6 shadow-xl space-y-6">
          
          {/* Navigation Detail Tabs */}
          <div className="flex items-center gap-1 border-b border-dark-700 pb-3 overflow-x-auto text-xs font-semibold scrollbar-none">
            <button
              onClick={() => setActiveDetailTab('simulation')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeDetailTab === 'simulation'
                  ? 'bg-cyan-500 text-dark-900 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pin Wiring
            </button>
            <button
              onClick={() => setActiveDetailTab('schematic')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeDetailTab === 'schematic'
                  ? 'bg-cyan-500 text-dark-900 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Circuit ASCII
            </button>
            <button
              onClick={() => setActiveDetailTab('code')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeDetailTab === 'code'
                  ? 'bg-cyan-500 text-dark-900 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Source Code
            </button>
            <button
              onClick={() => setActiveDetailTab('procedure')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeDetailTab === 'procedure'
                  ? 'bg-cyan-500 text-dark-900 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Lab Manual
            </button>
            {currentExp.wokwiId && (
              <button
                onClick={() => setActiveDetailTab('wokwi')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  activeDetailTab === 'wokwi'
                    ? 'bg-purple-500 text-white font-bold'
                    : 'text-purple-400 hover:text-purple-300'
                }`}
              >
                Wokwi Embed
              </button>
            )}
          </div>

          {/* Tab 1: Pin Connections Table */}
          {activeDetailTab === 'simulation' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white">Hardware Pin Connections</h4>
                <p className="text-xs text-slate-400 mt-0.5">Physical jumper wire connections between sensor and development board</p>
              </div>

              <div className="divide-y divide-dark-700 rounded-2xl bg-dark-800/80 border border-dark-700 text-xs overflow-hidden">
                {currentExp.pinConnections.map((conn, idx) => (
                  <div key={idx} className="p-3.5 space-y-1">
                    <div className="flex items-center justify-between font-mono font-bold">
                      <span className="text-emerald-400">{conn.sensorPin}</span>
                      <span className="text-slate-500">&rarr;</span>
                      <span className="text-cyan-400">{conn.mcuPin}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{conn.functionDesc}</span>
                      <span className="flex items-center gap-1 font-mono text-[10px]">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: conn.wireColor }} />
                        <span>Wire</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Aim & Required Components */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 block">
                  Aim of the Experiment
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-dark-800/40 p-3 rounded-xl border border-dark-750">
                  {currentExp.aim}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-400 block">
                  Required Bill of Materials (BOM)
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {currentExp.requiredComponents.map((comp, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Schematic ASCII */}
          {activeDetailTab === 'schematic' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">Circuit Schematic Diagram</h4>
              <div className="p-4 rounded-2xl bg-dark-900 border border-dark-700 overflow-x-auto font-mono text-xs text-cyan-300 leading-relaxed">
                <pre>{currentExp.circuitDiagramText}</pre>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect the sensor exactly as shown above. Pay careful attention to voltage rails (3.3V vs 5.0V) to avoid damage.
              </p>
            </div>
          )}

          {/* Tab 3: Source Code */}
          {activeDetailTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Validated Firmware Code</h4>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-xs font-mono text-cyan-300 border border-dark-700"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-dark-900 border border-dark-700 overflow-x-auto max-h-[420px] font-mono text-xs text-cyan-200 leading-relaxed">
                <pre>
                  <code>
                    {currentExp.sourceCode.esp32 || currentExp.sourceCode.arduino || currentExp.sourceCode.stm32 || currentExp.sourceCode.c51 || currentExp.sourceCode.pic || currentExp.sourceCode.msp430}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {/* Tab 4: Step-by-Step Procedure & Manual */}
          {activeDetailTab === 'procedure' && (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              <div>
                <h4 className="text-sm font-bold text-white">Step-by-Step Procedure</h4>
                <div className="space-y-2 mt-2">
                  {currentExp.stepByStepProcedure.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-dark-800 border border-dark-750 text-xs text-slate-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Engineering Observations
                </h4>
                <ul className="space-y-1 text-xs text-slate-300 mt-1">
                  {currentExp.observations.map((obs, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-800 border border-dark-700 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-purple-400 block">Conclusion</span>
                <p className="text-xs text-slate-300 leading-relaxed">{currentExp.conclusion}</p>
              </div>
            </div>
          )}

          {/* Tab 5: Wokwi External Simulator Integration */}
          {activeDetailTab === 'wokwi' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Wokwi Browser Simulator Engine</h4>
                <a
                  href="https://wokwi.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                >
                  <span>Open in Wokwi</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="rounded-2xl bg-dark-900 border border-dark-700 p-6 text-center space-y-3">
                <FlaskConical className="h-10 w-10 text-purple-400 mx-auto" />
                <p className="text-sm font-bold text-slate-200">
                  Full Browser-Based Cycle-Accurate Simulator
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  For deeper electrical verification including real assembly cycle execution, click below to open the dedicated Wokwi simulation sandbox with virtual breadboard and logic analyzer.
                </p>
                <a
                  href="https://wokwi.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  <span>Launch Wokwi Simulation Harness</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
