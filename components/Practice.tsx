
import React, { useState, useEffect } from "react";
import { PROBLEMS } from '../constants';
import { Problem, TechType, Level } from '../types';

interface PracticeProps {
  onBack: () => void;
}

const Practice: React.FC<PracticeProps> = ({ onBack }) => {
  const [step, setStep] = useState<'SETUP' | 'SESSION'>('SETUP');
  const [selectedTech, setSelectedTech] = useState<TechType | 'TR'>('SB');
  const [selectedLevel, setSelectedLevel] = useState<Level>('D');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mode, setMode] = useState<'R' | 'C'>('R');
  
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [hintLevel, setHintLevel] = useState<number>(0); // 0 to 4. 5 = solution
  const [showSolution, setShowSolution] = useState(false);

  // Trigger MathJax when problem or hints change
  useEffect(() => {
    setTimeout(() => {
      // Cast to any to access MathJax property on window
      (window as any).MathJax?.typesetPromise?.();
    }, 100);
  }, [currentProblem, hintLevel, showSolution, step]);

  // Filter problems based on selection
  const getFilteredProblems = () => {
    let pool = PROBLEMS;
    
    if (selectedTech !== 'TR') {
      pool = pool.filter(p => p.type === selectedTech);
    }
    
    // For level, we try to match exactly, but if empty fallback
    const levelPool = pool.filter(p => p.level === selectedLevel);
    return levelPool.length > 0 ? levelPool : pool;
  };

  const startSession = () => {
    const pool = getFilteredProblems();
    if (pool.length === 0) {
      alert("Không tìm thấy bài tập phù hợp! Vui lòng chọn lại.");
      return;
    }
    const randomProblem = pool[Math.floor(Math.random() * pool.length)];
    setCurrentProblem(randomProblem);
    setHintLevel(0);
    setShowSolution(false);
    setStep('SESSION');
  };

  const nextHint = () => {
    if (hintLevel < 4) setHintLevel(prev => prev + 1);
  };

  const revealSolution = () => {
    setShowSolution(true);
    setHintLevel(4);
  };

  if (step === 'SETUP') {
    return (
      <div className="max-w-xl mx-auto space-y-8 animate-fadeIn">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border-4 border-white shadow-lg">🧩</div>
          <h2 className="text-3xl font-extrabold text-slate-800">Cấu hình Luyện Tập</h2>
          <p className="text-slate-500">Chọn chủ đề và độ khó bạn muốn thử sức</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white space-y-8">
          
          {/* Tech Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Chọn Kỹ thuật</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'SB', label: 'Stars & Bars', icon: '⭐', color: 'blue' },
                { id: 'KT', label: 'Khoảng trống', icon: '🧠', color: 'green' },
                { id: 'TR', label: 'Trộn đề', icon: '🔀', color: 'purple' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTech(opt.id as any)}
                  className={`
                    p-4 rounded-2xl border-2 text-sm font-bold transition-all duration-200 transform hover:scale-105
                    flex flex-col items-center gap-2
                    ${selectedTech === opt.id 
                      ? `bg-${opt.color}-50 border-${opt.color}-500 text-${opt.color}-700 shadow-md` 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}
                  `}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Level Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Chọn Mức độ</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'D', label: 'Dễ', color: 'green' },
                { id: 'TB', label: 'Trung Bình', color: 'yellow' },
                { id: 'K', label: 'Khó', color: 'red' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedLevel(opt.id as any)}
                  className={`
                    p-3 rounded-2xl border-2 text-sm font-bold transition-all duration-200
                    ${selectedLevel === opt.id 
                      ? `bg-${opt.color}-50 border-${opt.color}-500 text-${opt.color}-700 shadow-md` 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'}
                  `}
                >
                  <div className={`w-3 h-3 rounded-full bg-${opt.color}-500 mx-auto mb-2 shadow-sm`}></div>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startSession}
            className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:from-slate-700 hover:to-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Bắt đầu ngay 🚀
          </button>
        </div>
      </div>
    );
  }

  // Session View
  if (!currentProblem) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-24">
      <div className="flex justify-between items-center bg-white p-4 rounded-full shadow-sm border border-slate-100">
        <span className="font-bold text-slate-400 text-sm uppercase tracking-wide px-2">Bài tập #{currentProblem.id}</span>
        <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
          currentProblem.level === 'D' ? 'bg-green-100 text-green-700' :
          currentProblem.level === 'TB' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
        }`}>
          {currentProblem.level === 'D' ? 'Mức: Dễ' : currentProblem.level === 'TB' ? 'Mức: Trung Bình' : 'Mức: Khó'}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-indigo-600"></div>
        <p className="text-xl text-slate-800 leading-relaxed font-medium">{currentProblem.question}</p>
      </div>

      {/* Hints Section */}
      <div className="space-y-4">
        {currentProblem.hints.slice(0, hintLevel).map((hint, idx) => (
          <div key={idx} className="flex gap-4 animate-slideInLeft">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-sm shrink-0 border border-orange-200">💡</div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-md text-slate-700 max-w-[85%]">
               <span className="block text-xs font-bold text-orange-600 uppercase mb-1">Gợi ý {idx + 1}</span>
               {hint}
            </div>
          </div>
        ))}
        
        {showSolution && (
           <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-3xl border border-green-200 animate-fadeIn mt-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎉</span>
              <span className="font-bold text-green-800 text-xl">Lời giải đầy đủ</span>
            </div>
            <div className="bg-white/60 p-4 rounded-xl text-slate-800 whitespace-pre-line font-medium border border-green-100">
              {currentProblem.solution}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
           {!showSolution && hintLevel < 4 && (
             <button 
               onClick={nextHint} 
               className="flex-1 bg-blue-50 text-blue-700 border border-blue-200 py-3 rounded-xl font-bold hover:bg-blue-100 transition-colors shadow-sm"
             >
               Xem gợi ý ({hintLevel}/4) 👇
             </button>
           )}
           
           {!showSolution && (
             <button 
                onClick={revealSolution}
                className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors shadow-lg"
             >
               Giải luôn 🏳️
             </button>
           )}

           {showSolution && (
             <button 
                onClick={startSession}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all transform hover:-translate-y-1"
             >
               Bài tiếp theo 🎲
             </button>
           )}

            <button 
                onClick={onBack}
                className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 font-medium transition-colors"
             >
               Thoát
             </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;
