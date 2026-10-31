import React from 'react';
import { useLearning } from '../../context/LearningContext';
import { EXPERIMENTS } from '../../data/experiments';
import { 
  Award, 
  CheckCircle2, 
  FlaskConical, 
  Bookmark, 
  Download, 
  FileCheck, 
  ExternalLink, 
  Sparkles, 
  Trash2,
  Cpu,
  Radio,
  ArrowRight
} from 'lucide-react';

export const LearningProgressView: React.FC = () => {
  const { 
    completedExperiments, 
    quizScores, 
    bookmarks, 
    toggleBookmark, 
    badges, 
    navigateWithSelection,
    setActiveTab 
  } = useLearning();

  const totalExperiments = EXPERIMENTS.length;
  const progressPercent = Math.min(100, Math.round(((completedExperiments.length + Object.keys(quizScores).length) / (totalExperiments + 6)) * 100));

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Award className="h-4 w-4" />
            <span>Student Portfolio & Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Learning Progress & ECE Credentials
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Track your simulation experiment completions, technical quiz scores, saved component bookmarks, and printable certificate of completion.
          </p>
        </div>

        <button
          onClick={handlePrintCertificate}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-dark-900 font-extrabold text-xs shadow-md transition-all"
        >
          <Download className="h-4 w-4" />
          <span>Export / Print Certificate</span>
        </button>
      </div>

      {/* High-Level Progress Statistics Card */}
      <div className="rounded-3xl bg-gradient-to-br from-dark-850 via-dark-800 to-dark-900 border border-dark-700/80 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-cyan-400">Curriculum Completion</span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {progressPercent}% Mastery Level
            </div>
          </div>
          <div className="text-xs font-mono text-slate-400 text-right">
            <span>{completedExperiments.length} of {totalExperiments} Virtual Labs Logged</span>
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-dark-700 overflow-hidden relative">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 transition-all duration-700"
            style={{ width: `${Math.max(8, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <span>Achievements & Badges</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => {
            const isUnlocked = 
              (b.id === 'first-lab' && completedExperiments.length > 0) ||
              (b.id === 'pinout-explorer') ||
              (b.id === 'quiz-ace' && Object.values(quizScores).some(s => s >= 80)) ||
              (b.id === 'iot-architect' && completedExperiments.length >= 3) ||
              (b.id === 'data-scientist' && completedExperiments.length >= 2);

            return (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-dark-850 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                    : 'bg-dark-900/60 border-dark-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isUnlocked ? 'bg-cyan-500/10 text-cyan-400' : 'bg-dark-800 text-slate-500'}`}>
                    <Award className="h-5 w-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isUnlocked ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-dark-800 text-slate-500'
                  }`}>
                    {isUnlocked ? 'Unlocked' : 'In Progress'}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-200">{b.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Experiments Checklist */}
      <div className="rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-dark-700 pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Completed Virtual Lab Experiments</h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">{completedExperiments.length}/{totalExperiments} Done</span>
        </div>

        <div className="divide-y divide-dark-750 text-xs">
          {EXPERIMENTS.map((exp) => {
            const isCompleted = completedExperiments.includes(exp.id);
            return (
              <div key={exp.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                    isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-dark-800 text-slate-500'
                  }`}>
                    {exp.experimentNumber}
                  </span>
                  <div>
                    <div className="font-bold text-slate-200">{exp.title}</div>
                    <div className="text-[11px] text-slate-400">{exp.boardName} • {exp.sensorName}</div>
                  </div>
                </div>

                <button
                  onClick={() => navigateWithSelection('virtual-lab', 'experiment', exp.id)}
                  className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-cyan-300 font-mono text-xs border border-dark-700 hover:border-cyan-500/50 flex items-center gap-1.5 transition-colors"
                >
                  <span>Launch</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Bookmarks List */}
      <div className="rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-dark-700 pb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-purple-400" />
            <h3 className="text-base font-bold text-white">Saved Topics & Quick Bookmarks</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">{bookmarks.length} Saved</span>
        </div>

        {bookmarks.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            No bookmarks saved yet. Click the bookmark icon on any microcontroller, sensor, or project to save it here for fast revision!
          </p>
        ) : (
          <div className="divide-y divide-dark-750 text-xs">
            {bookmarks.map((bm) => (
              <div key={bm.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-slate-200">{bm.title}</div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase">{bm.type}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (bm.type === 'mcu') navigateWithSelection('microcontrollers', 'mcu', bm.id);
                      else if (bm.type === 'sensor') navigateWithSelection('sensors', 'sensor', bm.id);
                      else if (bm.type === 'project') navigateWithSelection('projects', 'project', bm.id);
                      else if (bm.type === 'protocol') navigateWithSelection('protocols', 'protocol', bm.id);
                    }}
                    className="px-3 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 text-cyan-300 text-xs font-mono"
                  >
                    Open &rarr;
                  </button>

                  <button
                    onClick={() => toggleBookmark(bm)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Printable Certificate Template Section */}
      <div className="rounded-3xl bg-gradient-to-b from-dark-800 to-dark-900 border-2 border-cyan-500/40 p-8 text-center space-y-4 shadow-2xl">
        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          <Award className="h-6 w-6" />
        </div>
        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block">
          Official Engineering Certificate of Completion
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          MicroLearn Studio Embedded Systems Competency
        </h2>
        <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
          This certifies that the bearer has completed technical study across the 7 Microcontroller Families, verified hardware pin configurations, completed virtual sensor simulations, and validated embedded firmware.
        </p>
        <div className="pt-4 border-t border-dark-700/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 font-mono">
          <span>Verification Hash: MLS-ECE-{Date.now().toString(16).toUpperCase()}</span>
          <span>Date: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

    </div>
  );
};
