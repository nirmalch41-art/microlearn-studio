import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../types';
import { 
  FolderGit2, 
  Search, 
  Cpu, 
  Layers, 
  Code2, 
  Check, 
  Copy, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Wrench, 
  TrendingUp, 
  AlertCircle,
  ExternalLink,
  Bookmark
} from 'lucide-react';

export const ProjectLibraryView: React.FC = () => {
  const { 
    selectedProjectId, 
    setSelectedProjectId, 
    navigateWithSelection, 
    toggleBookmark, 
    isBookmarked 
  } = useLearning();

  const [activeDifficulty, setActiveDifficulty] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  const filteredProjects = PROJECTS.filter(p => {
    const matchesDiff = activeDifficulty === 'ALL' || p.difficulty.toUpperCase() === activeDifficulty;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.targetMcu.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getDifficultyBadge = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      case 'Intermediate':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/60';
      case 'Advanced':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/60';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <FolderGit2 className="h-4 w-4" />
            <span>Capstone & Lab Engineering Projects</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Real-World Project Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            From beginner IoT sensor nodes to advanced CAN-bus EV battery management and TinyML predictive maintenance architectures.
          </p>
        </div>

        {/* Quick Simulator Jump */}
        <button
          onClick={() => navigateWithSelection('virtual-lab', 'experiment', 'exp-1')}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-cyan-300 border border-cyan-800/60 text-xs font-semibold shadow-sm transition-all"
        >
          <span>Run Lab Simulation</span>
          <ChevronRight className="h-4 w-4 text-cyan-400" />
        </button>
      </div>

      {/* Difficulty Filters & Search */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveDifficulty(lvl)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                activeDifficulty === lvl
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-dark-700'
              }`}
            >
              {lvl} Projects
            </button>
          ))}
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search projects by keyword (e.g. CAN, Irrigation, Streetlight)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-850 border border-dark-700 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Two Column Layout: Left Project Cards + Right Project Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Project Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 px-1">
            Matching Projects ({filteredProjects.length})
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredProjects.map((project) => {
              const isSelected = currentProject.id === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-950/80 to-dark-800 border-purple-500/80 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500/50'
                      : 'bg-dark-850 hover:bg-dark-800 border-dark-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-semibold border ${getDifficultyBadge(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400">{project.category}</span>
                  </div>

                  <h3 className={`font-bold text-sm transition-colors ${isSelected ? 'text-purple-300' : 'text-slate-200'}`}>
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {project.abstract}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-dark-750/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[180px] text-cyan-300 font-mono">{project.targetMcu}</span>
                    <span className="text-purple-400 font-medium">Read Plan &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Project Blueprint & Architecture */}
        <div className="lg:col-span-8 rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-700 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className={`rounded-md px-2 py-0.5 text-xs font-mono font-bold border ${getDifficultyBadge(currentProject.difficulty)}`}>
                  {currentProject.difficulty} Project
                </span>
                <span className="text-xs font-mono text-cyan-400">Target MCU: {currentProject.targetMcu}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
                {currentProject.title}
              </h2>
            </div>

            <button
              onClick={() => toggleBookmark({ id: currentProject.id, type: 'project', title: currentProject.title })}
              className={`self-start sm:self-auto p-2.5 rounded-xl border transition-colors ${
                isBookmarked(currentProject.id)
                  ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                  : 'bg-dark-800 text-slate-400 hover:text-slate-200 border-dark-700'
              }`}
              title="Bookmark Project"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>

          {/* Abstract & Problem Statement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-1.5">
              <span className="font-mono font-bold uppercase text-purple-400 text-[10px] block">
                Project Abstract
              </span>
              <p className="text-slate-300 leading-relaxed">
                {currentProject.abstract}
              </p>
            </div>

            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-1.5">
              <span className="font-mono font-bold uppercase text-rose-400 text-[10px] block">
                Industry Problem Statement
              </span>
              <p className="text-slate-300 leading-relaxed">
                {currentProject.problemStatement}
              </p>
            </div>
          </div>

          {/* Block Diagram Architecture Steps */}
          <div className="rounded-2xl bg-dark-800/70 p-5 border border-dark-700 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              System Architectural Block Diagram
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 overflow-x-auto py-2">
              {currentProject.blockDiagramSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="w-full sm:w-auto flex-1 p-3 rounded-xl bg-dark-900 border border-dark-750 text-center text-xs font-mono text-slate-200 shadow-inner">
                    <span className="block text-[10px] text-cyan-400 font-bold mb-1">Stage {idx + 1}</span>
                    <span className="leading-tight block">{step}</span>
                  </div>
                  {idx < currentProject.blockDiagramSteps.length - 1 && (
                    <span className="hidden sm:inline text-cyan-500 font-bold">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Components & Pin Connections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Bill of Materials */}
            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Required Components (BOM)
              </h4>
              <div className="divide-y divide-dark-750 text-xs">
                {currentProject.components.map((c, i) => (
                  <div key={i} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">{c.name}</div>
                      <div className="text-[10px] text-slate-400">{c.note}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-dark-700 text-cyan-300 font-mono text-[11px] font-bold">
                      x{c.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pin Connections */}
            <div className="rounded-2xl bg-dark-800/60 p-4 border border-dark-700 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Pin Interconnect Matrix
              </h4>
              <div className="divide-y divide-dark-750 text-xs font-mono">
                {currentProject.pinConnections.map((pc, i) => (
                  <div key={i} className="py-2 space-y-0.5">
                    <div className="flex items-center justify-between text-slate-200">
                      <span className="text-emerald-400">{pc.module} ({pc.modulePin})</span>
                      <span className="text-slate-500">&rarr;</span>
                      <span className="text-cyan-400 font-bold">{pc.mcuPin}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans">{pc.notes}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Working Explanation */}
          <div className="rounded-2xl bg-dark-800/50 p-5 border border-dark-700 space-y-2 text-xs">
            <h4 className="font-mono font-bold uppercase tracking-wider text-slate-200 text-xs">
              Engineering Circuit & Algorithm Explanation
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {currentProject.workingExplanation}
            </p>
          </div>

          {/* Source Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <span>Firmware Implementation</span>
              </div>
              <button
                onClick={() => handleCopyCode(currentProject.sourceCode)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-700 text-xs font-mono text-cyan-300 border border-dark-700"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="rounded-2xl bg-dark-900 border border-dark-700 p-4 overflow-x-auto max-h-80">
              <pre className="text-xs font-mono text-cyan-200 leading-relaxed">
                <code>{currentProject.sourceCode}</code>
              </pre>
            </div>
          </div>

          {/* Advantages, Limitations & Future Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
              <span className="font-mono font-bold uppercase text-emerald-400 text-[10px] block">Advantages</span>
              <ul className="space-y-1 text-slate-300">
                {currentProject.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
              <span className="font-mono font-bold uppercase text-rose-400 text-[10px] block">Limitations</span>
              <ul className="space-y-1 text-slate-300">
                {currentProject.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-2">
              <span className="font-mono font-bold uppercase text-purple-400 text-[10px] block">Future Roadmap</span>
              <ul className="space-y-1 text-slate-300">
                {currentProject.futureImprovements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-purple-400">•</span>
                    <span>{imp}</span>
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
