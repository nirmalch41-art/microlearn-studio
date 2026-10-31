import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { QUIZ_QUESTIONS } from '../../data/tutorials';
import { QuizQuestion } from '../../types';
import { 
  CheckSquare, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const QuizzesView: React.FC = () => {
  const { quizScores, saveQuizScore, setActiveTab } = useLearning();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const filteredQuestions = QUIZ_QUESTIONS.filter(q => {
    return activeCategory === 'ALL' || q.category === activeCategory;
  });

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (isSubmitted) return; // Prevent changing after submit
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: filteredQuestions.length,
      percentage: Math.round((correct / filteredQuestions.length) * 100)
    };
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    saveQuizScore(activeCategory, score.percentage);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <CheckSquare className="h-4 w-4" />
            <span>Technical Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Microcontroller & ECE Engineering Quizzes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Test your understanding across silicon architectures, pinout electrical rules, sensor voltage level shifting, and technical job interview questions.
          </p>
        </div>

        {/* Progress Link */}
        <button
          onClick={() => setActiveTab('progress')}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-cyan-300 border border-cyan-800/60 text-xs font-semibold shadow-sm transition-all"
        >
          <span>View Achievements & Badges</span>
          <Award className="h-4 w-4 text-cyan-400" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'ALL', label: 'All Assessments' },
          { id: 'mcu', label: 'MCU Architectures' },
          { id: 'pins', label: 'Pin Configurations' },
          { id: 'sensors', label: 'Sensors & Transducers' },
          { id: 'protocols', label: 'Bus Protocols' },
          { id: 'embedded-c', label: 'Embedded C' },
          { id: 'interview', label: 'ECE Interview Prep' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setIsSubmitted(false);
              setSelectedAnswers({});
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-cyan-500 text-dark-900 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-dark-850 text-slate-400 hover:text-white border border-dark-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Score Result Card when Submitted */}
      {isSubmitted && (
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/80 via-dark-800 to-purple-950/80 border border-cyan-500/50 p-6 sm:p-8 shadow-2xl space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider">
                Assessment Results
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                You scored {score.correct} out of {score.total} ({score.percentage}%)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {score.percentage >= 80 
                  ? 'Outstanding! You have mastered these hardware and firmware principles.' 
                  : 'Good effort! Review the detailed answer explanations below to solidify your understanding.'}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 border border-dark-700 text-xs font-semibold"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* Quiz Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const hasAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 shadow-xl space-y-5"
            >
              
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-dark-800 text-cyan-400 text-xs font-mono font-bold border border-dark-700">
                  Question {idx + 1} of {filteredQuestions.length} • {q.difficulty}
                </span>

                {isSubmitted && (
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <span>{isCorrect ? 'Correct (+1)' : 'Incorrect'}</span>
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  const isTheCorrectAnswer = isSubmitted && optIdx === q.correctIndex;
                  const isTheWrongChoice = isSubmitted && isSelected && !isCorrect;

                  let optionStyle = 'bg-dark-800 hover:bg-dark-750 border-dark-700 text-slate-300';
                  if (isSelected && !isSubmitted) {
                    optionStyle = 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500 font-semibold';
                  } else if (isTheCorrectAnswer) {
                    optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500 font-semibold';
                  } else if (isTheWrongChoice) {
                    optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500 line-through';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dark-700 text-slate-300 font-mono text-xs font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isTheCorrectAnswer && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Detailed Explanation on Submit */}
              {isSubmitted && (
                <div className="p-4 rounded-2xl bg-dark-900 border border-dark-750 text-xs text-slate-300 space-y-1">
                  <span className="font-bold font-mono text-[10px] uppercase text-cyan-400 block">
                    Technical Explanation:
                  </span>
                  <p className="leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="text-center pt-4">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length === 0}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-900 font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Assessment & Review Answers
          </button>
        </div>
      )}

    </div>
  );
};
