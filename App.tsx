
import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import Menu from './components/Menu';
import { TheorySB, TheoryKT, CompareView, ExamplesView, ProcessSB, ProcessKT } from './components/Theory';
import Practice from './components/Practice';
import Quiz from './components/Quiz';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const [view, setView] = useState<AppView>('HOME');

  // Xử lý khi đổi View: Cuộn lên đầu và Render MathJax
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const timer = setTimeout(() => {
      if ((window as any).MathJax) {
        (window as any).MathJax.typesetPromise?.();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case 'HOME':
        return (
          <div className="text-center py-10 space-y-8 animate-fadeIn">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-30 rounded-full animate-pulse"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto flex items-center justify-center text-6xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                🎓
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
                Xin chào!<br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  Gia sư Tổ hợp
                </span>
              </h1>
              <div className="inline-block px-8 py-3 bg-white/60 backdrop-blur-sm rounded-3xl border border-blue-100 shadow-sm">
                 <p className="text-slate-600 text-lg font-medium">
                   Chuyên đề: <br className="sm:hidden"/>
                   <strong className="text-indigo-700 uppercase">Phương pháp Stars and Bars và Khoảng trống</strong>
                 </p>
              </div>
            </div>

            <p className="text-slate-500 max-w-md mx-auto">
              Hệ thống học tập thông minh giúp bạn làm chủ các kỹ thuật đếm nâng cao thông qua lý thuyết, bài tập và Gia sư AI.
            </p>
          </div>
        );
      case 'THEORY_SB': return <TheorySB />;
      case 'THEORY_KT': return <TheoryKT />;
      case 'PROCESS_SB': return <ProcessSB />;
      case 'PROCESS_KT': return <ProcessKT />;
      case 'COMPARE': return <CompareView />;
      case 'EXAMPLES': return <ExamplesView />;
      case 'AI_ASSISTANT': return <AIAssistant />;
      case 'PRACTICE_CONFIG':
      case 'PRACTICE_SESSION':
        return <Practice onBack={() => setView('HOME')} />;
      case 'QUIZ_CONFIG':
      case 'QUIZ_SESSION':
        return <Quiz onBack={() => setView('HOME')} />;
      default:
        return <div>Nội dung đang được cập nhật...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col font-sans text-slate-800 pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={() => setView('HOME')}
            className="font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🎓</span> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 hidden sm:inline">
              Stars and Bars và Khoảng trống
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 sm:hidden">
              Gia sư Vách ngăn
            </span>
          </div>
          
          {view !== 'HOME' && (
             <button 
               onClick={() => setView('HOME')}
               className="px-4 py-1.5 rounded-full bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-all shadow-md active:scale-95"
             >
               🏠 Trang chủ
             </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main key={view} className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 relative z-10 animate-fadeIn">
        {renderContent()}
      </main>

      {/* Footer Navigation Menu */}
      <section className="w-full max-w-4xl mx-auto px-4 mt-12 mb-12">
        <div className="relative">
          <div className="absolute inset-x-0 -top-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <Menu 
            onNavigate={(newView) => setView(newView)} 
            className="mt-4"
          />
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="text-center py-8 text-slate-400 text-xs font-medium uppercase tracking-widest">
        &copy; 2024 App VÁCH NGĂN - Gia sư Tổ hợp AI
      </footer>
    </div>
  );
}
