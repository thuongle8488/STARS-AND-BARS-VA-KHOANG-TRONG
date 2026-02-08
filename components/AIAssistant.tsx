
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Bạn là 'Gia sư Tổ hợp Thông minh'. 
Chuyên môn: Phương pháp Stars and Bars (Chia kẹo) và Kỹ thuật Khoảng trống (Gaps).

QUY TẮC DẠY HỌC (Socratic Method):
1. PHÂN TÍCH: Khi nhận đề bài (văn bản hoặc ảnh), hãy xác định dạng toán và chia làm 3-4 bước logic.
2. DẪN DẮT TỪNG BƯỚC:
   - CHỈ đưa ra yêu cầu/câu hỏi cho Bước 1. 
   - KHÔNG được đưa ra lời giải cho các bước sau hoặc đáp số cuối cùng ngay lập tức.
3. KIỂM TRA ĐÁP ÁN: 
   - Khi học sinh trả lời, hãy nhận định ĐÚNG hay SAI.
   - Nếu SAI: Chỉ ra lỗi sai nhẹ nhàng, gợi ý thêm kiến thức liên quan và yêu cầu học sinh thử lại bước đó. KHÔNG qua bước mới.
   - Nếu ĐÚNG: Khen ngợi và đưa ra yêu cầu/gợi ý cho BƯỚC TIẾP THEO.
4. XEM LỜI GIẢI NGAY: Nếu học sinh yêu cầu xem lời giải hoặc nhấn nút "Xem lời giải ngay", hãy trình bày lời giải chi tiết bằng LaTeX ($...$) và giải thích cặn kẽ.
5. PHONG CÁCH: Thân thiện, khích lệ, dùng Markdown để trình bày rõ ràng.`;

interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
  isStepFeedback?: boolean;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Chào bạn! Mình là Gia sư Stars & Bars đây. Gửi cho mình đề bài (chụp ảnh hoặc nhập text) để chúng ta cùng giải từng bước nhé! 🎓" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Cast to any to avoid TypeScript property error on window
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise?.();
    }
  }, [messages, loading]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() && !attachedImage) return;

    const userMsg: Message = { role: 'user', text: textToSend, image: attachedImage || undefined };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachedImage(null);
    setLoading(true);

    try {
      // Re-initialize GoogleGenAI right before the call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const currentParts: any[] = [{ text: textToSend }];
      if (userMsg.image) {
        currentParts.push({
          inlineData: {
            mimeType: 'image/jpeg',
            data: userMsg.image.split(',')[1]
          }
        });
      }

      // Updated to gemini-3-pro-preview for advanced math reasoning tasks
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...history,
          { role: 'user', parts: currentParts }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.4, // Giảm temperature để AI bám sát quy trình hơn
        }
      });

      const modelText = response.text || "Mình chưa nghĩ ra, bạn nói lại được không?";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Kết nối có chút vấn đề, bạn kiểm tra lại mạng nhé!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[75vh] max-h-[900px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 animate-fadeIn relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 p-4 text-white flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">🤖</div>
             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-indigo-600 rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-lg leading-none mb-1">Gia sư AI Tương tác</h3>
            <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Học theo phương pháp Socratic</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'model', text: "Đã sẵn sàng cho bài toán mới! Bạn gửi đề đi nào. 🚀" }])}
          className="text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full font-bold transition-all border border-white/20 uppercase"
        >
          Làm mới
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30 scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`group relative max-w-[85%] rounded-2xl p-4 shadow-sm transition-all ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
            }`}>
              {m.image && (
                <div className="mb-3 overflow-hidden rounded-lg border-2 border-white/20 shadow-sm">
                  <img src={m.image} alt="Đính kèm" className="max-w-full h-auto" />
                </div>
              )}
              <div className="prose prose-slate prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-indigo-400">
                 {m.text.split('\n').map((line, idx) => (
                   <p key={idx} className="mb-1 last:mb-0">{line}</p>
                 ))}
              </div>
              <div className={`text-[9px] mt-2 font-bold opacity-30 uppercase tracking-tighter ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {m.role === 'user' ? 'Bạn' : 'Gia sư'}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 flex gap-2 items-center shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-xs text-slate-400 font-bold ml-2 uppercase tracking-tight">Gia sư đang phân tích...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 bg-white/80 backdrop-blur-sm border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => sendMessage("Mình đã sẵn sàng, hãy cho mình câu hỏi Bước 1.")}
          disabled={loading}
          className="whitespace-nowrap bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[11px] font-bold border border-indigo-100 hover:bg-indigo-100 transition-all shadow-sm"
        >
          🚀 Bắt đầu ngay
        </button>
        <button 
          onClick={() => sendMessage("Cho mình xin một gợi ý nhỏ cho bước này.")}
          disabled={loading}
          className="whitespace-nowrap bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[11px] font-bold border border-blue-100 hover:bg-blue-100 transition-all shadow-sm"
        >
          💡 Xin gợi ý
        </button>
        <button 
          onClick={() => sendMessage("Mình muốn xem lời giải chi tiết và đáp án ngay.")}
          disabled={loading}
          className="whitespace-nowrap bg-rose-50 text-rose-700 px-4 py-1.5 rounded-full text-[11px] font-bold border border-rose-100 hover:bg-rose-100 transition-all shadow-sm"
        >
          🏳️ Xem lời giải ngay
        </button>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          {attachedImage && (
            <div className="relative inline-block mb-3 group animate-fadeIn">
              <img src={attachedImage} className="h-20 w-20 object-cover rounded-xl border-2 border-indigo-500 shadow-md" />
              <button 
                onClick={() => setAttachedImage(null)}
                className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg hover:bg-rose-600 transition-colors"
              >✕</button>
            </div>
          )}
          
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea 
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Nhập câu trả lời hoặc gửi ảnh đề bài..."
                className="w-full bg-slate-100 rounded-2xl pl-4 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-sm min-h-[52px] max-h-32"
                disabled={loading}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-3 bottom-3 text-slate-400 hover:text-indigo-600 transition-colors"
                title="Đính kèm ảnh/tệp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            <button 
              onClick={() => sendMessage()}
              disabled={loading || (!input.trim() && !attachedImage)}
              className="h-[52px] w-[52px] bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-indigo-200 active:scale-95 shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center font-medium italic">Nhấn Shift + Enter để xuống dòng. Nhấn Enter để gửi.</p>
        </div>
      </div>
    </div>
  );
}
