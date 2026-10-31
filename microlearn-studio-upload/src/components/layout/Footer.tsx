import React from 'react';
import { Cpu, Github, ExternalLink, BookOpen, ShieldCheck, Zap } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useLearning();

  return (
    <footer className="border-t border-dark-800 bg-dark-900/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-sm text-slate-200">MicroLearn Studio</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Premium ECE engineering learning portal, interactive electronics simulation lab, and technical documentation platform.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Datasheet-Grounded Part Accuracy</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-3 text-xs uppercase tracking-wider font-mono">Curriculum</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('microcontrollers')} className="hover:text-cyan-400 transition-colors">
                  7 Microcontroller Families
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pin-configuration')} className="hover:text-cyan-400 transition-colors">
                  Interactive Pinout Explorer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sensors')} className="hover:text-cyan-400 transition-colors">
                  Sensor Library (23 Categories)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('virtual-lab')} className="hover:text-cyan-400 transition-colors">
                  Virtual Electronics Simulation Lab
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-cyan-400 transition-colors">
                  Real-World Engineering Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Tools */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-3 text-xs uppercase tracking-wider font-mono">Tools & Analysis</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('datasets')} className="hover:text-cyan-400 transition-colors">
                  Sensor Dataset Explorer & CSV
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('protocols')} className="hover:text-cyan-400 transition-colors">
                  Communication Protocols (UART, SPI, CAN)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tutorials')} className="hover:text-cyan-400 transition-colors">
                  Embedded C & HAL Code Editor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quizzes')} className="hover:text-cyan-400 transition-colors">
                  MCQs & ECE Interview Prep
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('progress')} className="hover:text-cyan-400 transition-colors">
                  Learning Progress & Certificate
                </button>
              </li>
            </ul>
          </div>

          {/* Reference Datasheets & Simulator */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-3 text-xs uppercase tracking-wider font-mono">External Simulator</h4>
            <p className="text-slate-400 text-xs mb-3 leading-relaxed">
              Integrated with Wokwi browser simulation engine for AVR, ESP32, and RP2040 circuit verification.
            </p>
            <div className="flex flex-col gap-2">
              <a 
                href="https://wokwi.com" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300"
              >
                <span>Wokwi Simulator Engine</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a 
                href="https://www.espressif.com" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200"
              >
                <span>Espressif Technical Docs</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a 
                href="https://www.st.com" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200"
              >
                <span>STMicroelectronics Reference Manuals</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} MicroLearn Studio. Built for Electronics & Communication Engineering (ECE) Students.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Strictly Manufacturer Datasheet Verified</span>
            <span>•</span>
            <span className="text-slate-400">Simulated vs Measured Data Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
