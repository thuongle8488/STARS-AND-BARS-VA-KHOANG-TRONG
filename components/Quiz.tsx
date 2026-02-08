
import React, { useState, useEffect } from 'react';
import { QUIZ_DATA } from '../constants';
import { QuizQuestion } from '../types';

interface QuizProps {
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onBack }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Trigger MathJax when question changes or answer is revealed
  useEffect(() => {
    setTimeout(() => {
      // Cast to any to access MathJax property on window
      (window as any).MathJax?.typesetPromise?.();
    }, 100);
  }, [currentQIndex, isAnswered, isFinished]);

  const question = QUIZ_DATA[currentQIndex];
  const progress = ((currentQIndex) / QUIZ_DATA.length) * 100;

  const handleAnswer = (key: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOption(key);
    setIsAnswered(true);
    if (isCorrect) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentQIndex < QUIZ_DATA.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-8 py-10 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-slate-800">🎉 Kết quả Kiểm Tra</h2>
        
        <div className="relative inline-block">
            <div className={`text-9xl transform transition-transform duration-700 hover:scale-110 cursor-default`}>
                {score >= 4 ? '🏆' : score >= 3 ? '😊' : '😅'}
            </div>
            {score >= 4 && <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 animate-pulse"></div>}
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <p className="text-slate-400 uppercase tracking-widest font-bold text-xs mb-3">Điểm số của bạn</p>
          <div className="flex items-end justify-center gap-2">
              <span className={`text-6xl font-black ${score >= 3 ? 'text-green-600' : 'text-orange-500'}`}>
                {score}
              </span>
              <span className="text-2xl font-bold text-slate-400 mb-2">/ {QUIZ_DATA.length}</span>
          </div>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl text-slate-700 font-medium">
          {score === 5 ? "Tuyệt vời! Bạn là bậc thầy Vách Ngăn." :
           score >= 3 ? "Khá tốt! Ôn lại chút xíu là hoàn hảo." :
           "Đừng buồn! Hãy thử xem lại lý thuyết nhé."}
        </div>

        <button 
          onClick={onBack}
          className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 shadow-xl hover:shadow-2xl transform transition hover:-translate-y-1"
        >
          Trở về Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-32 animate-fadeIn">
      {/* Header Info */}
      <div className="flex justify-between items-end mb-4 px-2">
        <div>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tiến độ</p>
           <p className="text-xl font-black text-slate-800">Câu {currentQIndex + 1}<span className="text-slate-400 text-lg font-medium">/{QUIZ_DATA.length}</span></p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 font-bold text-slate-700">
           Điểm: <span className="text-blue-600">{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-200 rounded-full mb-8 overflow-hidden">
        <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-100 mb-8 min-h-[160px] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100 rounded-full blur-2xl opacity-50 -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 -ml-10 -mb-10"></div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-normal relative z-10">{question.question}</h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((opt) => {
           let btnClass = "bg-white border-b-4 border-slate-200 hover:border-blue-400 hover:-translate-y-0.5 text-slate-700";
           let icon = null;
           
           if (isAnswered) {
             if (opt.isCorrect) {
                 btnClass = "bg-green-100 border-b-4 border-green-500 text-green-900";
                 icon = "✅";
             } else if (selectedOption === opt.key) {
                 btnClass = "bg-red-100 border-b-4 border-red-500 text-red-900";
                 icon = "❌";
             } else {
                 btnClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50 scale-95";
             }
           } else {
             if (selectedOption === opt.key) btnClass = "bg-blue-100 border-blue-500 text-blue-800";
           }

           return (
             <button
                key={opt.key}
                onClick={() => handleAnswer(opt.key, opt.isCorrect)}
                disabled={isAnswered}
                className={`
                    w-full p-4 rounded-2xl transition-all duration-200 flex items-center gap-4 text-left shadow-sm
                    ${btnClass}
                `}
             >
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                   isAnswered && opt.isCorrect ? 'bg-green-200 text-green-800' :
                   isAnswered && selectedOption === opt.key ? 'bg-red-200 text-red-800' :
                   'bg-slate-100 text-slate-500'
               }`}>
                   {opt.key}
               </div>
               <span className="font-semibold text-lg">{opt.text}</span>
               {icon && <span className="ml-auto text-xl">{icon}</span>}
             </button>
           );
        })}
      </div>

      {/* Explanation & Next Button */}
      {isAnswered && (
        <div className="mt-8 animate-fadeInUp">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-24 relative">
             <div className="absolute -top-3 left-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Giải thích</div>
             <p className="text-slate-800 font-medium mt-2">{question.options.find(o => o.isCorrect)?.explanation}</p>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
             <button
                onClick={nextQuestion}
                className="bg-slate-900 text-white px-12 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-slate-800 hover:scale-105 transition-all pointer-events-auto flex items-center gap-2"
             >
               {currentQIndex < QUIZ_DATA.length - 1 ? "Câu Tiếp Theo ➜" : "Xem Kết Quả 🏁"}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
