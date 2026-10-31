import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { PINOUT_BOARDS, PIN_CONNECTION_TUTORIALS } from '../../data/pins';
import { BoardPin, PinCategory } from '../../types';
import { 
  GitBranch, 
  Zap, 
  AlertTriangle, 
  Info, 
  HelpCircle, 
  CheckCircle2, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Filter, 
  BookOpen,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const PinConfigurationView: React.FC = () => {
  const { selectedBoardId, setSelectedBoardId } = useLearning();

  const [activeBoardId, setActiveBoardId] = useState<string>(selectedBoardId || 'esp32-devkit-v1');
  const [selectedPin, setSelectedPin] = useState<BoardPin | null>(null);
  const [activeTab, setActiveTab] = useState<'explorer' | 'tutorials' | 'filter-tool'>('explorer');
  const [selectedPeripheralFilter, setSelectedPeripheralFilter] = useState<string>('ALL');
  const [selectedTutorialId, setSelectedTutorialId] = useState<string>('led');

  const currentBoard = PINOUT_BOARDS.find(b => b.id === activeBoardId) || PINOUT_BOARDS[0];

  // Set default selected pin if none is selected
  React.useEffect(() => {
    if (!selectedPin || !currentBoard.headerLeft.concat(currentBoard.headerRight).some(p => p.pinNumber === selectedPin.pinNumber)) {
      setSelectedPin(currentBoard.headerLeft[0] || null);
    }
  }, [currentBoard]);

  // Color mappings for pin categories
  const getPinColor = (category: PinCategory, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-cyan-400 text-dark-900 ring-4 ring-cyan-400/50 scale-105 shadow-lg shadow-cyan-400/50 font-bold z-10';
    }
    switch (category) {
      case 'power':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/50 hover:bg-rose-500/30';
      case 'ground':
        return 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700';
      case 'adc':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30';
      case 'dac':
        return 'bg-lime-500/20 text-lime-300 border-lime-500/50 hover:bg-lime-500/30';
      case 'pwm':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30';
      case 'uart':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50 hover:bg-blue-500/30';
      case 'spi':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/30';
      case 'i2c':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 hover:bg-indigo-500/30';
      case 'control':
      case 'special':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/50 hover:bg-orange-500/30';
      default:
        return 'bg-dark-800 text-slate-200 border-dark-600 hover:bg-dark-750';
    }
  };

  const currentTutorial = PIN_CONNECTION_TUTORIALS.find(t => t.id === selectedTutorialId) || PIN_CONNECTION_TUTORIALS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <GitBranch className="h-4 w-4" />
            <span>Hardware Pinout Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interactive Pin Configuration Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Click pins to inspect voltage tolerance, peripheral mappings (ADC, PWM, I2C, SPI, UART), strapping boot restrictions, and step-by-step wiring tutorials.
          </p>
        </div>

        {/* Tab Switcher: Explorer vs Connection Tutorials vs Peripheral Filter */}
        <div className="flex items-center gap-2 bg-dark-850 p-1.5 rounded-2xl border border-dark-700">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'explorer'
                ? 'bg-cyan-500 text-dark-900 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pinout Explorer
          </button>
          <button
            onClick={() => setActiveTab('tutorials')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'tutorials'
                ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Wiring Guides ({PIN_CONNECTION_TUTORIALS.length})
          </button>
          <button
            onClick={() => setActiveTab('filter-tool')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'filter-tool'
                ? 'bg-emerald-500 text-dark-900 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Peripheral Tool
          </button>
        </div>
      </div>

      {/* Board Selector Pills */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Select Target Development Board
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PINOUT_BOARDS.map((board) => (
            <button
              key={board.id}
              onClick={() => {
                setActiveBoardId(board.id);
                setSelectedBoardId(board.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                activeBoardId === board.id
                  ? 'bg-gradient-to-r from-cyan-950/80 to-purple-950/80 text-cyan-300 border-cyan-500/80 shadow-md shadow-cyan-950/50'
                  : 'bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-slate-200 border-dark-700'
              }`}
            >
              <span className="font-bold">{board.name}</span>
              <span className="ml-2 font-mono text-[10px] text-slate-400">({board.totalPins}p)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Voltage Warning Banner if Present */}
      {currentBoard.voltageWarning && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-950/30 border border-amber-800/50 text-amber-300 text-xs leading-relaxed">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <span className="font-bold">ELECTRICAL SPECIFICATION ALERT: </span>
            <span>{currentBoard.voltageWarning}</span>
          </div>
        </div>
      )}

      {/* Main View Mode: Pinout Explorer */}
      {activeTab === 'explorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Interactive Board Pinout (SVG / Component Diagram) */}
          <div className="lg:col-span-7 rounded-3xl bg-dark-850 border border-dark-700/80 p-6 shadow-xl space-y-6">
            
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono pb-4 border-b border-dark-750">
              <span className="flex items-center gap-1 text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500"></span> Power
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="h-2 w-2 rounded-full bg-slate-600"></span> GND
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span> ADC
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span> PWM
              </span>
              <span className="flex items-center gap-1 text-blue-400">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span> UART
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="h-2 w-2 rounded-full bg-purple-500"></span> SPI
              </span>
              <span className="flex items-center gap-1 text-indigo-400">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span> I2C
              </span>
            </div>

            {/* Development Board Outline Graphic with Dual In-line Pin Headers */}
            <div className="relative mx-auto max-w-md rounded-2xl bg-gradient-to-b from-dark-800 to-dark-900 border-2 border-dark-700 p-4 shadow-2xl">
              
              {/* Board Silkscreen Graphic Branding */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                <div className="w-10 h-3 rounded-b-md bg-dark-700/80 border border-slate-600"></div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 mt-1 uppercase">
                  {currentBoard.name}
                </span>
              </div>

              {/* Central Microcontroller IC Package Visual */}
              <div className="my-8 mx-auto w-32 h-32 rounded-xl bg-dark-900/90 border border-dark-600/80 shadow-inner flex flex-col items-center justify-center p-3 text-center pointer-events-none">
                <Cpu className="h-8 w-8 text-cyan-400/80 mb-1" />
                <span className="text-[10px] font-mono font-bold text-slate-300 leading-tight">
                  {currentBoard.mcuChip.split(' ')[0]}
                </span>
                <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                  {currentBoard.family}
                </span>
              </div>

              {/* Pin Headers Grid: Left Header vs Right Header */}
              <div className="grid grid-cols-2 gap-8 items-start">
                
                {/* Left Header Pins */}
                <div className="space-y-1.5">
                  {currentBoard.headerLeft.map((pin) => {
                    const isSelected = selectedPin?.pinNumber === pin.pinNumber;
                    return (
                      <button
                        key={pin.pinNumber}
                        onClick={() => setSelectedPin(pin)}
                        className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all text-left ${getPinColor(
                          pin.category,
                          isSelected
                        )}`}
                      >
                        <span className="text-[10px] opacity-75 font-semibold">#{pin.pinNumber}</span>
                        <span className="font-bold truncate max-w-[100px]">{pin.pinName}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Header Pins */}
                <div className="space-y-1.5">
                  {currentBoard.headerRight.map((pin) => {
                    const isSelected = selectedPin?.pinNumber === pin.pinNumber;
                    return (
                      <button
                        key={pin.pinNumber}
                        onClick={() => setSelectedPin(pin)}
                        className={`w-full group flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all text-right ${getPinColor(
                          pin.category,
                          isSelected
                        )}`}
                      >
                        <span className="font-bold truncate max-w-[100px]">{pin.pinName}</span>
                        <span className="text-[10px] opacity-75 font-semibold">#{pin.pinNumber}</span>
                      </button>
                    );
                  })}
                </div>

              </div>

              <div className="mt-6 pt-3 border-t border-dark-750 text-center text-[10px] font-mono text-slate-400">
                Click any pin above to inspect electrical specs & peripherals
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed text-center">
              {currentBoard.notes}
            </p>

          </div>

          {/* Right Column: Pin Information Panel (Section 5.B) */}
          <div className="lg:col-span-5 rounded-3xl bg-dark-850 border border-dark-700/80 p-6 shadow-xl space-y-6">
            
            {selectedPin ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                
                {/* Pin Header & Name */}
                <div className="border-b border-dark-700 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-cyan-950/80 px-2 py-0.5 text-xs font-mono font-bold text-cyan-400 border border-cyan-800/60">
                      Physical Header Pin #{selectedPin.pinNumber}
                    </span>
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-dark-800 text-slate-300 border border-dark-700">
                      {selectedPin.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mt-2 font-mono tracking-tight">
                    {selectedPin.pinName}
                  </h3>

                  {selectedPin.gpioNumber !== undefined && (
                    <div className="text-xs text-cyan-300 font-mono mt-0.5 font-medium">
                      Silicon GPIO Identifier: GPIO {selectedPin.gpioNumber}
                    </div>
                  )}
                </div>

                {/* Primary Electrical Specs */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-dark-800 border border-dark-700">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Voltage Rating</span>
                    <span className="font-bold text-slate-100 font-mono mt-0.5 block">{selectedPin.voltageLevel}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-dark-800 border border-dark-700">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">I/O Capability</span>
                    <span className="font-bold text-slate-100 mt-0.5 block line-clamp-1">{selectedPin.ioCapability}</span>
                  </div>
                </div>

                {/* Peripherals Supported by this Pin */}
                <div className="rounded-2xl bg-dark-800/80 p-4 border border-dark-700 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Peripheral Functionalities
                  </h4>
                  <div className="space-y-2 text-xs">
                    
                    <div className="flex items-center justify-between py-1 border-b border-dark-750">
                      <span className="text-slate-400">Analog ADC:</span>
                      <span className="font-mono text-slate-200 font-semibold">{selectedPin.adc || '—'}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-dark-750">
                      <span className="text-slate-400">True DAC Out:</span>
                      <span className="font-mono text-slate-200 font-semibold">{selectedPin.dac || '—'}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-dark-750">
                      <span className="text-slate-400">PWM Channel:</span>
                      <span className="font-mono text-slate-200 font-semibold">{selectedPin.pwm || '—'}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-dark-750">
                      <span className="text-slate-400">UART Serial:</span>
                      <span className="font-mono text-slate-200 font-semibold">{selectedPin.uart || '—'}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-dark-750">
                      <span className="text-slate-400">SPI Bus:</span>
                      <span className="font-mono text-slate-200 font-semibold">{selectedPin.spi || '—'}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-dark-750">
                      <span className="text-slate-400">I2C Two-Wire:</span>
                      <span className="font-mono text-slate-200 font-semibold">{selectedPin.i2c || '—'}</span>
                    </div>

                    {selectedPin.alternateFunctions && selectedPin.alternateFunctions.length > 0 && (
                      <div className="py-1">
                        <span className="text-slate-400 block mb-1">Alternate Functions:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedPin.alternateFunctions.map((fn, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-dark-700 text-slate-200 text-[10px] font-mono">
                              {fn}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Restrictions and Boot Strapping */}
                {selectedPin.restrictions && (
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs space-y-1">
                    <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] font-mono block">
                      Hardware Caution & Boot Limitations
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedPin.restrictions}
                    </p>
                  </div>
                )}

                {/* Practical Recommended Applications */}
                {selectedPin.practicalApplications && (
                  <div className="p-4 rounded-2xl bg-dark-800/60 border border-dark-700 text-xs space-y-1">
                    <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] font-mono block">
                      Recommended Practical Connections
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedPin.practicalApplications}
                    </p>
                  </div>
                )}

              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 text-xs">
                Select a pin on the left board graphic to inspect its pinout characteristics.
              </div>
            )}

          </div>

        </div>
      )}

      {/* Tab Mode: Pin Connection Tutorials (Section 5.C) */}
      {activeTab === 'tutorials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tutorial List */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Hardware Component Guides
            </div>
            {PIN_CONNECTION_TUTORIALS.map((tut) => (
              <button
                key={tut.id}
                onClick={() => setSelectedTutorialId(tut.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left border transition-all ${
                  selectedTutorialId === tut.id
                    ? 'bg-gradient-to-r from-purple-950/80 to-dark-800 border-purple-500/80 shadow-lg shadow-purple-950/40'
                    : 'bg-dark-850 hover:bg-dark-800 border-dark-700'
                }`}
              >
                <div>
                  <div className={`text-sm font-bold ${selectedTutorialId === tut.id ? 'text-purple-300' : 'text-slate-200'}`}>
                    {tut.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{tut.difficulty}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </button>
            ))}
          </div>

          {/* Tutorial Content Detail */}
          <div className="lg:col-span-8 rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-dark-700 pb-4">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-950 text-purple-400 border border-purple-800">
                {currentTutorial.difficulty} Wiring Tutorial
              </span>
              <h2 className="text-2xl font-black text-white mt-2">
                How to Wire: {currentTutorial.name}
              </h2>
            </div>

            {/* Circuit ASCII Snippet */}
            <div className="p-4 rounded-2xl bg-dark-900 border border-dark-700 font-mono text-xs text-cyan-300 overflow-x-auto">
              <code>{currentTutorial.circuitSnippet}</code>
            </div>

            {/* Working Explanation */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Engineering Explanation
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentTutorial.explanation}
              </p>
            </div>

            {/* Step-by-Step Wiring Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Step-by-Step Connection Procedure
              </h4>
              <div className="space-y-2">
                {currentTutorial.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-dark-800 border border-dark-750 text-xs text-slate-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Voltage & Logic Warnings */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300">
              <span className="font-bold font-mono uppercase text-[10px] block mb-1">
                Voltage & Protection Notice:
              </span>
              <span>{currentTutorial.voltageNote}</span>
            </div>

          </div>

        </div>
      )}

      {/* Tab Mode: Pin Selection Tool (Section 5.D) */}
      {activeTab === 'filter-tool' && (
        <div className="rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-dark-700 pb-4">
            <h2 className="text-xl font-bold text-white">Peripheral Pin Selection Tool</h2>
            <p className="text-xs text-slate-400 mt-1">
              Filter pins on {currentBoard.name} by peripheral type to find which hardware pins can be assigned to ADC, PWM, I2C, SPI, or UART.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['ALL', 'adc', 'pwm', 'uart', 'spi', 'i2c', 'power', 'ground'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPeripheralFilter(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase font-bold transition-all ${
                  selectedPeripheralFilter === type
                    ? 'bg-cyan-500 text-dark-900 shadow-md shadow-cyan-500/20'
                    : 'bg-dark-800 text-slate-400 hover:text-white border border-dark-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Filtered Pins Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
            {currentBoard.headerLeft.concat(currentBoard.headerRight)
              .filter(p => selectedPeripheralFilter === 'ALL' || p.category === selectedPeripheralFilter || (selectedPeripheralFilter === 'adc' && p.adc) || (selectedPeripheralFilter === 'pwm' && p.pwm) || (selectedPeripheralFilter === 'uart' && p.uart) || (selectedPeripheralFilter === 'spi' && p.spi) || (selectedPeripheralFilter === 'i2c' && p.i2c))
              .map(pin => (
                <div
                  key={pin.pinNumber}
                  onClick={() => {
                    setSelectedPin(pin);
                    setActiveTab('explorer');
                  }}
                  className="cursor-pointer p-3.5 rounded-2xl bg-dark-800 hover:bg-dark-750 border border-dark-700 hover:border-cyan-500/50 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">Pin #{pin.pinNumber}</span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-dark-700 text-slate-300">{pin.category}</span>
                  </div>
                  <div className="font-bold text-sm text-slate-200 font-mono">{pin.pinName}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">
                    {pin.adc ? `ADC: ${pin.adc} • ` : ''}
                    {pin.pwm ? `PWM: ${pin.pwm} • ` : ''}
                    {pin.voltageLevel}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

    </div>
  );
};
