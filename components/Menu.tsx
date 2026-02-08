
// Add missing React import
import React from 'react';
import { AppView } from '../types';

interface MenuProps {
  onNavigate: (view: AppView) => void;
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ onNavigate, className }) => {
  const menuItems: { label: string; subLabel: string; view: AppView; icon: string; style: string }[] = [
    { 
      label: "Lý thuyết Stars & Bars", 
      subLabel: "Chia kẹo, tổng n",
      view: 'THEORY_SB', 
      icon: "📘", 
      style: "from-blue-50 to-blue-100 border-blue-200 text-blue-800 shadow-blue-100" 
    },
    { 
      label: "Quy trình Stars & Bars", 
      subLabel: "4 Bước vận dụng chuẩn",
      view: 'PROCESS_SB', 
      icon: "🛤️", 
      style: "from-blue-600 to-blue-700 border-blue-500 text-white shadow-blue-200" 
    },
    { 
      label: "Lý thuyết Khoảng trống", 
      subLabel: "Không kề, chèn khe",
      view: 'THEORY_KT', 
      icon: "📗", 
      style: "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-800 shadow-emerald-100" 
    },
    { 
      label: "Quy trình Khoảng trống", 
      subLabel: "3 Bước vận dụng chuẩn",
      view: 'PROCESS_KT', 
      icon: "🚀", 
      style: "from-emerald-600 to-emerald-700 border-emerald-500 text-white shadow-emerald-200" 
    },
    { 
      label: "Phân biệt nhanh", 
      subLabel: "Mẹo 3 giây",
      view: 'COMPARE', 
      icon: "🔍", 
      style: "from-purple-50 to-purple-100 border-purple-200 text-purple-800 shadow-purple-100" 
    },
    { 
      label: "Luyện tập", 
      subLabel: "Gợi ý từng bước",
      view: 'PRACTICE_CONFIG', 
      icon: "🧩", 
      style: "from-orange-50 to-orange-100 border-orange-200 text-orange-800 shadow-orange-100" 
    },
    { 
      label: "Kiểm tra", 
      subLabel: "Trắc nghiệm trúng thưởng",
      view: 'QUIZ_CONFIG', 
      icon: "🧪", 
      style: "from-rose-50 to-rose-100 border-rose-200 text-rose-800 shadow-rose-100" 
    },
    { 
      label: "Gia sư AI Thông minh", 
      subLabel: "Hỏi đáp, gửi ảnh đề bài",
      view: 'AI_ASSISTANT', 
      icon: "🤖", 
      style: "from-indigo-500 to-purple-600 border-indigo-400 text-white shadow-indigo-200" 
    },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 uppercase tracking-wider">
            📌 MENU CHỨC NĂNG
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`
                relative group overflow-hidden p-4 rounded-2xl border-2 transition-all duration-300 
                bg-gradient-to-br ${item.style} hover:shadow-lg hover:-translate-y-1
              `}
            >
              <div className="flex items-center gap-4 relative z-10">
                <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <div className="text-left">
                  <span className="block font-bold leading-tight mb-1 text-lg">
                    {item.label}
                  </span>
                  <span className="block text-xs font-semibold opacity-80 uppercase tracking-wide">
                    {item.subLabel}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
