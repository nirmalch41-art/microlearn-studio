import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { PROTOCOLS } from '../../data/protocols';
import { Protocol } from '../../types';
import { 
  Network, 
  Search, 
  Clock, 
  Zap, 
  Code2, 
  Check, 
  Copy, 
  ChevronRight, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Cpu, 
  Activity,
  Bookmark
} from 'lucide-react';

export const CommunicationProtocolsView: React.FC = () => {
  const { 
    selectedProtocolId, 
    setSelectedProtocolId, 
    toggleBookmark, 
    isBookmarked 
  } = useLearning();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [copiedCode, setCopiedCode] = useState(false);

  const currentProtocol = PROTOCOLS.find(p => p.id === selectedProtocolId) || PROTOCOLS[0];

  const filteredProtocols = PROTOCOLS.filter(p => {
    return activeCategory === 'ALL' || p.category === activeCategory;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Network className="h-4 w-4" />
            <span>Digital Communications & Core Peripherals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Communication Protocol Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            In-depth guides on UART, SPI, I2C, CAN, DMA, ADC, and PWM. Understand clock polarity, arbitration, packet framing, and timing diagrams.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['ALL', 'Bus', 'Serial', 'Peripheral', 'Hardware Core'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
              activeCategory === cat
                ? 'bg-blue-500 text-dark-900 shadow-md shadow-blue-500/20'
                : 'bg-dark-850 text-slate-400 hover:text-white border border-dark-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Left List + Right Detailed Protocol Study */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Protocols Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
            Available Protocols ({filteredProtocols.length})
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredProtocols.map((protocol) => {
              const isSelected = currentProtocol.id === protocol.id;
              return (
                <div
                  key={protocol.id}
                  onClick={() => setSelectedProtocolId(protocol.id)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-950/80 to-dark-800 border-blue-500/80 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/50'
                      : 'bg-dark-850 hover:bg-dark-800 border-dark-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="rounded-md bg-dark-750 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-400 border border-dark-600">
                      {protocol.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{protocol.maxSpeed}</span>
                  </div>

                  <h3 className={`font-bold text-sm transition-colors ${isSelected ? 'text-blue-300' : 'text-slate-200'}`}>
                    {protocol.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{protocol.fullName}</p>

                  <div className="mt-3 pt-2.5 border-t border-dark-750/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{protocol.signalPins.length} Signal Pins</span>
                    <span className="text-blue-400 font-medium">Study &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Complete Protocol Deep Dive */}
        <div className="lg:col-span-8 rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-blue-950/80 px-2 py-0.5 text-xs font-mono font-bold text-blue-400 border border-blue-800/60">
                  {currentProtocol.category}
                </span>
                <span className="text-xs font-mono text-slate-400">Max Speed: {currentProtocol.maxSpeed}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
                {currentProtocol.name} ({currentProtocol.fullName})
              </h2>
            </div>

            <button
              onClick={() => toggleBookmark({ id: currentProtocol.id, type: 'protocol', title: currentProtocol.name })}
              className={`self-start sm:self-auto p-2.5 rounded-xl border transition-colors ${
                isBookmarked(currentProtocol.id)
                  ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                  : 'bg-dark-800 text-slate-400 hover:text-slate-200 border-dark-700'
              }`}
              title="Bookmark Protocol"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>

          {/* Definition & Working Principle */}
          <div className="space-y-4 text-xs">
            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-1.5">
              <span className="font-mono font-bold uppercase text-blue-400 text-[10px] block">
                Formal Protocol Definition
              </span>
              <p className="text-slate-200 leading-relaxed text-sm">
                {currentProtocol.definition}
              </p>
            </div>

            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-1.5">
              <span className="font-mono font-bold uppercase text-cyan-400 text-[10px] block">
                Detailed Working Principle & Framing
              </span>
              <p className="text-slate-300 leading-relaxed">
                {currentProtocol.workingPrinciple}
              </p>
            </div>
          </div>

          {/* Signal Pins Table */}
          <div className="rounded-2xl bg-dark-800/60 border border-dark-700 overflow-hidden">
            <div className="px-4 py-3 bg-dark-800 border-b border-dark-700 text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Hardware Bus Physical Signal Lines
            </div>
            <div className="divide-y divide-dark-700 text-xs">
              {currentProtocol.signalPins.map((pin, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-3 gap-2">
                  <span className="font-mono font-bold text-cyan-400">{pin.pin}</span>
                  <span className="text-slate-300">{pin.description}</span>
                  <span className="text-slate-400 font-mono text-[10px] uppercase text-right sm:text-left">{pin.direction}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timing Diagram Explanation Banner */}
          <div className="rounded-2xl bg-dark-900 border border-dark-700 p-5 space-y-2 font-mono text-xs shadow-inner">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-[10px]">
              <Clock className="h-4 w-4" />
              <span>Timing & Clock Synchronization Mechanics</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              {currentProtocol.timingExplanation}
            </p>
            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Max Standard Distance: {currentProtocol.maxDistance}</span>
              <span>Max Channel Throughput: {currentProtocol.maxSpeed}</span>
            </div>
          </div>

          {/* Practical Application & Supported MCUs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
              <span className="font-mono font-bold uppercase text-emerald-400 text-[10px] block">
                Practical Real-World Use Case
              </span>
              <p className="text-slate-300 leading-relaxed">
                {currentProtocol.practicalExample}
              </p>
            </div>

            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
              <span className="font-mono font-bold uppercase text-purple-400 text-[10px] block">
                Supported Microcontrollers
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProtocol.supportedMcus.map((mcu, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-dark-700 text-slate-200 font-mono text-[11px]">
                    {mcu}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Firmware Code Example */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <span>Firmware Bus Implementation</span>
              </div>
              <button
                onClick={() => handleCopyCode(currentProtocol.codeSnippet)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-xs font-mono text-cyan-300 border border-dark-700"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="rounded-2xl bg-dark-900 border border-dark-700 p-4 overflow-x-auto max-h-80">
              <pre className="text-xs font-mono text-cyan-200 leading-relaxed">
                <code>{currentProtocol.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Advantages vs Disadvantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
              <span className="font-mono font-bold uppercase text-emerald-400 text-[10px] block">Key Advantages</span>
              <ul className="space-y-1 text-slate-300">
                {currentProtocol.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="font-mono font-bold uppercase text-rose-400 text-[10px] block">Disadvantages & Trade-offs</span>
              <ul className="space-y-1 text-slate-300">
                {currentProtocol.disadvantages.map((dis, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400">•</span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
