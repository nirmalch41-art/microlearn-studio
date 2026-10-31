import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { TUTORIALS } from '../../data/tutorials';
import { ProgrammingTutorial } from '../../types';
import { 
  Code2, 
  Play, 
  Copy, 
  Check, 
  Terminal, 
  AlertTriangle, 
  HelpCircle, 
  Bug, 
  Cpu, 
  ChevronRight, 
  Sparkles,
  FileCode2,
  HardDrive
} from 'lucide-react';

export const ProgrammingTutorialsView: React.FC = () => {
  const { selectedTutorialId, setSelectedTutorialId } = useLearning();

  const [activeTutId, setActiveTutId] = useState<string>(selectedTutorialId || TUTORIALS[0].id);
  const [copied, setCopied] = useState(false);
  const [simulatedCompilerRunning, setSimulatedCompilerRunning] = useState(false);
  const [compilerOutput, setCompilerOutput] = useState<string | null>(null);

  const currentTut = TUTORIALS.find(t => t.id === activeTutId) || TUTORIALS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTut.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCompiler = () => {
    setSimulatedCompilerRunning(true);
    setCompilerOutput('Invoking target cross-compiler toolchain (arm-none-eabi-gcc / xtensa-esp32-elf-gcc / sdcc)...');

    setTimeout(() => {
      setCompilerOutput(
        `[BUILD SUCCESS]\r\nTarget Architecture: ${currentTut.targetPlatform}\r\nOptimization: -O2 (Size & Performance)\r\nProgram Size: .text: 1420 bytes, .data: 48 bytes, .bss: 16 bytes\r\nFlash Usage: 1.43 KB / Flash Budget: OK\r\nSRAM Usage: 64 bytes / Stack Allocation: OK\r\n0 Errors, 0 Warnings.\r\nFirmware HEX / ELF generated successfully!`
      );
      setSimulatedCompilerRunning(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Code2 className="h-4 w-4" />
            <span>Embedded Software Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Programming Tutorials & Code Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Hands-on tutorials for Embedded C, STM32 HAL, FreeRTOS ESP-IDF, and MicroPython. Master memory-mapped registers, non-blocking DMA streams, and multi-core task scheduling.
          </p>
        </div>

        {/* Compiler Action Button */}
        <button
          onClick={handleRunCompiler}
          disabled={simulatedCompilerRunning}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
        >
          <Play className="h-4 w-4 fill-white" />
          <span>{simulatedCompilerRunning ? 'Building Target...' : 'Validate & Compile Code'}</span>
        </button>
      </div>

      {/* Tutorial Selection Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {TUTORIALS.map((tut) => (
          <button
            key={tut.id}
            onClick={() => {
              setActiveTutId(tut.id);
              setSelectedTutorialId(tut.id);
              setCompilerOutput(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeTutId === tut.id
                ? 'bg-gradient-to-r from-indigo-950/80 to-dark-800 text-indigo-300 border-indigo-500/80 shadow-md shadow-indigo-950/40'
                : 'bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-slate-200 border-dark-700'
            }`}
          >
            <span className="font-bold">{tut.title.split(':')[0]}</span>
            <span className="ml-2 font-mono text-[10px] text-slate-400">({tut.language})</span>
          </button>
        ))}
      </div>

      {/* Main Study Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Code Editor & Compiler Terminal */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="rounded-3xl bg-dark-850 border border-dark-700/80 p-6 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-dark-700 pb-3">
              <div className="flex items-center gap-2">
                <FileCode2 className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-mono font-bold text-slate-200 uppercase">
                  {currentTut.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-800 text-indigo-300 border border-dark-700">
                  {currentTut.targetPlatform}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 text-xs font-mono text-indigo-300 border border-dark-700"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="rounded-2xl bg-dark-900 border border-dark-700 p-4 font-mono text-xs text-indigo-200 leading-relaxed overflow-x-auto max-h-[480px]">
              <pre>
                <code>{currentTut.code}</code>
              </pre>
            </div>

            {/* Compiler Diagnostic Output Console */}
            <div className="rounded-2xl bg-dark-950 border border-dark-700 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700 text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="font-mono font-bold text-slate-200">Cross-Compiler Diagnostic Output</span>
                </div>
                {compilerOutput && (
                  <button onClick={() => setCompilerOutput(null)} className="text-[10px] text-slate-400 font-mono">
                    Clear
                  </button>
                )}
              </div>
              <div className="p-4 font-mono text-xs text-emerald-400 bg-dark-950/80 min-h-24 leading-relaxed">
                {compilerOutput ? (
                  <pre className="whitespace-pre-wrap">{compilerOutput}</pre>
                ) : (
                  <span className="text-slate-500 italic">
                    Click "Validate & Compile Code" to test firmware against cross-compilation toolchain.
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Code Section Breakdown, Expected Output & Pitfalls */}
        <div className="lg:col-span-5 rounded-3xl bg-dark-850 border border-dark-700/80 p-6 shadow-xl space-y-6">
          
          <div className="border-b border-dark-700 pb-4">
            <h3 className="text-lg font-bold text-white">Engineering Tutorial Breakdown</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {currentTut.description}
            </p>
          </div>

          {/* Section by Section Explanation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Code Segment Dissection
            </h4>
            <div className="space-y-2.5">
              {currentTut.codeBreakdown.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-dark-800 border border-dark-750 space-y-1.5 text-xs">
                  <div className="font-mono font-bold text-indigo-300 bg-dark-900/80 px-2 py-1 rounded border border-dark-700 text-[11px] truncate">
                    {item.section}
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Output */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Expected Target Terminal Output
            </h4>
            <div className="p-3.5 rounded-xl bg-dark-900 border border-dark-700 font-mono text-xs text-emerald-300 leading-relaxed">
              <pre>{currentTut.expectedOutput}</pre>
            </div>
          </div>

          {/* Common Errors & Fixes */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Common Pitfalls & HardFault Fixes</span>
            </h4>
            <div className="space-y-2 text-xs">
              {currentTut.commonErrors.map((err, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
                  <div className="font-bold text-rose-300">
                    <span className="text-[10px] uppercase font-mono block text-rose-400">Symptom</span>
                    {err.error}
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-400 font-semibold">Root Cause: </span>
                    {err.cause}
                  </div>
                  <div className="text-emerald-400 font-semibold pt-1 border-t border-rose-950">
                    Fix: {err.fix}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Debugging Tips */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Bug className="h-4 w-4" />
              <span>Embedded Hardware Debugging Tips</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {currentTut.debuggingTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
