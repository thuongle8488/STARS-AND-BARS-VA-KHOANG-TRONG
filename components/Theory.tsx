
import React from 'react';

// Common wrapper for theory cards to ensure consistency
const SectionCard: React.FC<{ title: string; children: React.ReactNode; colorClass: string; icon?: string }> = ({ title, children, colorClass, icon }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden transition-all hover:shadow-xl">
    <div className={`${colorClass} px-5 py-3 border-b border-white/10 flex items-center gap-2`}>
      {icon && <span className="text-xl">{icon}</span>}
      <h3 className="font-bold text-white text-lg tracking-wide">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const StepBox: React.FC<{ num: number; title: string; children: React.ReactNode; color: string }> = ({ num, title, children, color }) => (
  <div className="relative pl-12 pb-8 last:pb-0 group">
    <div className={`absolute left-0 top-0 w-8 h-8 rounded-full ${color} text-white flex items-center justify-center font-black shadow-md z-10 group-hover:scale-110 transition-transform`}>
      {num}
    </div>
    <div className="absolute left-4 top-8 w-0.5 h-full bg-slate-100 group-last:hidden"></div>
    <div>
      <h4 className="font-bold text-slate-800 text-lg mb-2">{title}</h4>
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export const ProcessSB: React.FC = () => (
  <div className="space-y-8 animate-fadeIn">
    <div className="text-center mb-10">
      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Phương pháp Vách ngăn</span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">Quy trình vận dụng 4 Bước</h2>
    </div>

    <div className="max-w-3xl mx-auto">
      <StepBox num={1} title="Phân tích và Mô hình hóa" color="bg-blue-500">
        <p className="mb-3">Đọc kỹ đề bài, xác định rõ:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          <li>Số lượng vật phẩm giống nhau ($n$).</li>
          <li>Số lượng hộp hoặc người nhận vật phẩm ($k$).</li>
          <li>Các điều kiện ràng buộc (rỗng, ít nhất, không quá...).</li>
          <li>Chuyển về dạng phương trình nghiệm nguyên: $x_1 + x_2 + ... + x_k = n$.</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <p className="font-bold text-blue-800 text-xs uppercase mb-2">⚡ Xử lý ràng buộc:</p>
          <ul className="text-xs space-y-1 text-blue-700">
            <li>• Nghiệm dương ($x_i \ge 1$): Phát trước mỗi hộp 1 vật, dùng $n' = n - k$.</li>
            <li>• Cận dưới ($x_i \ge a_i$): Phát trước $a_i$ vật, dùng $n' = n - \sum a_i$.</li>
            <li>• Cận trên ($x_i \le b_i$): Thường dùng <strong>Nguyên lý bù trừ</strong>.</li>
          </ul>
        </div>
      </StepBox>

      <StepBox num={2} title="Biểu diễn trực quan" color="bg-blue-600">
        <p>Vẽ mô hình để kiểm tra tư duy:</p>
        <div className="mt-3 flex flex-col items-center">
           <div className="text-2xl font-mono tracking-widest text-slate-400 mb-2">
             ★ ★ ★ <span className="text-blue-500 font-bold text-3xl">|</span> ★ ★ <span className="text-blue-500 font-bold text-3xl">|</span> ★
           </div>
           <p className="text-xs italic">Vẽ $n$ ngôi sao (★) và $k-1$ vách ngăn (|).</p>
        </div>
      </StepBox>

      <StepBox num={3} title="Áp dụng công thức" color="bg-blue-700">
        <p className="mb-2">Sau khi đã có $n'$ (sau xử lý điều kiện) và $k$, áp dụng công thức:</p>
        <div className="bg-slate-900 text-white p-4 rounded-xl text-center font-mono text-2xl font-bold shadow-inner">
          {'$C_{n\' + k - 1}^{k - 1}$'}
        </div>
      </StepBox>

      <StepBox num={4} title="Tính toán và kiểm tra" color="bg-blue-800">
        <p>Thực hiện phép tính tổ hợp và đối chiếu lại các điều kiện biên của đề bài để đảm bảo không bỏ sót trường hợp nào.</p>
      </StepBox>
    </div>
  </div>
);

export const ProcessKT: React.FC = () => (
  <div className="space-y-8 animate-fadeIn">
    <div className="text-center mb-10">
      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Kỹ thuật chèn khe</span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900">Quy trình vận dụng 3 Bước</h2>
    </div>

    <div className="max-w-3xl mx-auto">
      <StepBox num={1} title="Nhận diện và xác định đối tượng" color="bg-green-500">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase">Nhóm A</span>
            <p className="text-sm font-bold text-slate-700">Đối tượng "Cố định"</p>
            <p className="text-[10px] text-slate-500 mt-1">Không bị ràng buộc, có thể đứng cạnh nhau.</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <span className="text-xs font-bold text-green-400 uppercase">Nhóm B</span>
            <p className="text-sm font-bold text-green-700">Đối tượng "Ràng buộc"</p>
            <p className="text-[10px] text-green-500 mt-1">Cần cách ly, không được đứng cạnh nhau.</p>
          </div>
        </div>
      </StepBox>

      <StepBox num={2} title="Sắp xếp qua hai công đoạn" color="bg-green-600">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-bold text-slate-700 mb-1">Công đoạn 1: Sắp xếp nhóm A</p>
            <p className="text-xs text-slate-500">Xếp $m$ phần tử nhóm A tạo vách ngăn. Số cách xếp: $m!$ (nếu khác nhau) hoặc 1 (nếu giống nhau).</p>
            <div className="mt-2 text-center text-xl font-mono text-green-600">
               _ A _ A _ A _
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100">
            <p className="text-sm font-bold text-slate-700 mb-1">Công đoạn 2: Chọn khe cho nhóm B</p>
            <p className="text-xs text-slate-500">Xác định số khe: $m+1$. Chọn khe để đặt nhóm B vào. Dùng tổ hợp $C$ (nếu B giống nhau) hoặc chỉnh hợp $A$ (nếu B khác nhau).</p>
          </div>
        </div>
      </StepBox>

      <StepBox num={3} title="Áp dụng quy tắc nhân" color="bg-green-700">
        <p className="mb-2">Kết quả cuối cùng của bài toán là tích số cách của hai công đoạn:</p>
        <div className="bg-slate-900 text-white p-4 rounded-xl text-center font-mono text-xl font-bold shadow-inner">
          Số cách xếp = (Cách xếp A) $\times$ (Cách xếp B vào khe)
        </div>
      </StepBox>
    </div>
  </div>
);

export const TheorySB: React.FC = () => (
  <div className="space-y-8 animate-fadeIn">
    <div className="text-center mb-8">
       <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Chủ đề 1</span>
       <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800">Stars and Bars</h2>
       <p className="text-blue-600 mt-2 font-medium">(Bài toán chia kẹo / Vách ngăn)</p>
    </div>
    
    <SectionCard title="1. Khái niệm" colorClass="bg-gradient-to-r from-blue-500 to-blue-600" icon="📘">
      <ul className="list-disc pl-5 space-y-2 text-slate-700 text-lg">
        <li>Đếm số nghiệm nguyên của phương trình: <span className="math-text font-bold bg-blue-50 px-2 py-1 rounded">x₁ + x₂ + ... + xₖ = n</span></li>
        <li>Hoặc phân phối <span className="font-bold text-blue-600">n</span> vật giống nhau vào <span className="font-bold text-blue-600">k</span> nhóm phân biệt.</li>
      </ul>
    </SectionCard>

    <SectionCard title="2. Mô hình trực quan" colorClass="bg-gradient-to-r from-indigo-500 to-indigo-600" icon="👀">
      <p className="text-slate-700 mb-6 text-lg">
        Dùng <span className="font-bold text-indigo-600">n ngôi sao</span> (vật) và <span className="font-bold text-indigo-600">k-1 vách ngăn</span> (chia thành k phần).
      </p>
      
      <div className="bg-slate-900 rounded-xl p-6 text-center shadow-inner relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Minh họa (6 sao, 3 nhóm)</p>
        <div className="text-3xl sm:text-4xl font-mono font-bold text-yellow-400 tracking-widest mb-2 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
          ★ ★ ★ <span className="text-white mx-1 opacity-80">|</span> ★ ★ <span className="text-white mx-1 opacity-80">|</span> ★
        </div>
        <p className="text-sm text-slate-400 mt-3">
          2 vách ngăn chia 6 sao thành 3 nhóm: <strong>3, 2, 1</strong>
        </p>
      </div>
    </SectionCard>

    <div className="relative">
      <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-20 rounded-full"></div>
      <SectionCard title="3. Công thức (Ghi nhớ)" colorClass="bg-gradient-to-r from-orange-400 to-orange-500" icon="⚡">
        <div className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <p className="font-bold text-orange-900 uppercase text-sm mb-1">Trường hợp 1: Nghiệm không âm (<span className="math-text">xᵢ ≥ 0</span>)</p>
            <div className="flex items-center gap-3">
               <span className="text-3xl">👉</span>
               <p className="text-slate-800 text-lg">Số nghiệm = <span className="font-bold text-2xl ml-2 text-orange-600">{'$C_{n + k - 1}^{k - 1}$'}</span></p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <p className="font-bold text-blue-900 uppercase text-sm mb-1">Trường hợp 2: Nghiệm nguyên dương (<span className="math-text">xᵢ ≥ 1</span>)</p>
            <p className="text-slate-600 mb-2 italic">Đặt <span className="math-text">yᵢ = xᵢ - 1 ≥ 0</span>. Tổng mới là <span className="math-text">n - k</span>.</p>
            <div className="flex items-center gap-3">
               <span className="text-3xl">👉</span>
               <p className="text-slate-800 text-lg">Số nghiệm = <span className="font-bold text-2xl ml-2 text-blue-600">{'$C_{n - 1}^{k - 1}$'}</span></p>
            </div>
            <p className="text-xs text-blue-400 font-semibold mt-2 text-right">(Điều kiện: n ≥ k)</p>
          </div>
        </div>
      </SectionCard>
    </div>

    <SectionCard title="4. Checklist giải bài" colorClass="bg-gradient-to-r from-slate-600 to-slate-700" icon="📝">
      <ol className="space-y-3">
        {['Đặt biến cho các nhóm', 'Viết phương trình tổng', 'Xét điều kiện cận dưới', 'Đổi biến phụ (nếu cần)', 'Áp dụng tổ hợp'].map((step, i) => (
          <li key={i} className="flex items-center gap-3 text-slate-700 p-2 bg-slate-50 rounded-lg">
            <span className="w-6 h-6 flex items-center justify-center bg-slate-200 text-slate-700 font-bold rounded-full text-xs">{i+1}</span>
            {step}
          </li>
        ))}
      </ol>
    </SectionCard>

    <SectionCard title="5. Các dạng bài toán điển hình" colorClass="bg-gradient-to-r from-slate-700 to-slate-800" icon="💡">
      <div className="space-y-8">
        <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-700 text-lg mb-3">Dạng 1: Phân phối vật phẩm giống nhau vào các hộp khác nhau</h4>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Đây là dạng cơ bản, tương đương bài toán tìm số nghiệm nguyên không âm của phương trình: $x_1 + x_2 + \dots + x_k = n$.
          </p>
          <div className="bg-white p-3 rounded-lg border border-slate-200 mb-3 text-sm">
             <p className="font-bold text-slate-700 mb-1">Công thức: {'$C_{n+k-1}^{k-1}$'}</p>
             <p className="italic text-slate-500">Ví dụ: Chia 10 chiếc bút chì giống nhau cho 4 học sinh (mỗi học sinh có thể không nhận được chiếc nào).</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm">
             <span className="font-bold text-blue-600">Kết quả:</span> {'$C_{10+4-1}^{4-1} = 286$'} cách.
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-indigo-500">
          <h4 className="font-bold text-indigo-700 text-lg mb-3">Dạng 2: Mỗi hộp phải có ít nhất một vật phẩm</h4>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Tương đương tìm số nghiệm nguyên dương: $x_i \ge 1$.
          </p>
          <div className="bg-white p-3 rounded-lg border border-slate-200 mb-3 text-sm">
             <p className="font-bold text-slate-700 mb-2">Cách xử lý:</p>
             <p className="italic text-slate-600 underline">Phát trước 1 vật vào mỗi hộp.</p>
             <p className="mt-1 font-bold text-indigo-600">Công thức rút gọn: {'$C_{n-1}^{k-1}$'}</p>
          </div>
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 text-sm">
             <p className="text-indigo-900"><strong>Ví dụ:</strong> Chia 10 bút chì cho 4 học sinh, ai cũng có ít nhất 1 cái.</p>
             <p className="mt-1 font-bold">Kết quả: {'$C_{10-1}^{4-1} = 84$'} cách.</p>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-purple-500">
          <h4 className="font-bold text-purple-700 text-lg mb-3">Dạng 3: Các biến thể phức tạp (Có giới hạn trên hoặc dưới)</h4>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Sử dụng phương pháp đổi biến số hoặc <strong>Nguyên lý bù trừ</strong> để giải quyết các ràng buộc phức tạp hơn.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
             <p className="text-xs font-bold text-purple-600 mb-2 uppercase tracking-widest">Ví dụ tiêu biểu:</p>
             <p className="text-sm text-slate-700 mb-2">Tìm nghiệm không âm của $x_1+x_2+x_3=8$ với điều kiện $x_1 \le 3$.</p>
             <ul className="text-xs space-y-1 text-slate-600 list-disc pl-4">
               <li>Tổng số nghiệm không điều kiện: {'$C_{8+3-1}^{3-1} = C_{10}^{2} = 45$'} .</li>
               <li>Số nghiệm vi phạm ($x_1 \ge 4$): {'$C_{(8-4)+3-1}^{3-1} = C_{6}^{2} = 15$'} .</li>
               <li>Kết quả = Tổng - Vi phạm = $45 - 15 = 30$.</li>
             </ul>
          </div>
        </div>
      </div>
    </SectionCard>
  </div>
);

export const TheoryKT: React.FC = () => (
  <div className="space-y-8 animate-fadeIn">
    <div className="text-center mb-8">
       <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-2">Chủ đề 2</span>
       <h2 className="text-3xl sm:text-4xl font-extrabold text-green-800">Kỹ thuật Khoảng Trống</h2>
       <p className="text-green-600 mt-2 font-medium">(Gaps / Slots / Vị trí xen kẽ)</p>
    </div>
    
    <SectionCard title="1. Dấu hiệu nhận biết" colorClass="bg-gradient-to-r from-green-600 to-emerald-600" icon="📗">
      <ul className="list-disc pl-5 space-y-2 text-slate-700 text-lg">
        <li>Từ khóa: <strong className="text-green-700 bg-green-50 px-1">không kề nhau</strong>.</li>
        <li>Cách nhau ít nhất 1 đơn vị.</li>
        <li>Chèn vật vào khe giữa các vật khác.</li>
      </ul>
    </SectionCard>

    <SectionCard title="2. Nguyên lý vàng" colorClass="bg-gradient-to-r from-teal-500 to-teal-600" icon="🏆">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6">
        {['Xếp vật khác trước', 'Tạo khe', 'Đặt vào khe'].map((step, i) => (
          <React.Fragment key={i}>
            <div className="px-4 py-2 bg-teal-50 border-2 border-teal-200 text-teal-800 font-bold rounded-lg shadow-sm">
              {step}
            </div>
            {i < 2 && <span className="text-teal-400 font-bold text-xl">→</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-slate-900 rounded-xl p-6 text-center shadow-inner relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500"></div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Minh họa (3 vật A tạo khe)</p>
        <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-widest mb-2 drop-shadow-md">
          <span className="text-green-400 animate-pulse">_</span> A <span className="text-green-400 animate-pulse">_</span> A <span className="text-green-400 animate-pulse">_</span> A <span className="text-green-400 animate-pulse">_</span>
        </div>
        <p className="text-sm text-slate-400 mt-3">
          Các dấu <span className="text-green-400 font-bold">_</span> là khoảng trống tiềm năng.
        </p>
      </div>
    </SectionCard>

    <div className="relative">
      <div className="absolute inset-0 bg-green-400 blur-xl opacity-20 rounded-full"></div>
      <SectionCard title="3. Công thức tính khe" colorClass="bg-gradient-to-r from-green-500 to-lime-600" icon="🧮">
        <div className="text-center py-4">
          <p className="text-slate-600 text-lg mb-2">Nếu xếp <span className="math-text font-bold text-green-700">m</span> phần tử lên hàng ngang:</p>
          <div className="inline-block bg-green-100 px-8 py-3 rounded-xl border-2 border-green-300 transform rotate-1 hover:rotate-0 transition-transform">
             <span className="text-2xl font-bold text-green-800">Số khe = m + 1</span>
          </div>
          <p className="text-sm text-slate-500 mt-3 italic">(Đã tính cả 2 đầu trái phải)</p>
        </div>
      </SectionCard>
    </div>

    <SectionCard title="4. Checklist giải bài" colorClass="bg-gradient-to-r from-slate-600 to-slate-700" icon="📝">
      <ol className="space-y-3">
        {[
          'Nhận diện nhóm "cần cách ly" (B) và nhóm "khung" (A)', 
          'Xếp nhóm A trước (nhân hoán vị A!)', 
          'Đếm số khe tạo bởi A',
          'Chọn khe và đặt B vào (C hoặc A)',
          'Nhân kết quả lại'
        ].map((step, i) => (
          <li key={i} className="flex items-center gap-3 text-slate-700 p-2 bg-slate-50 rounded-lg">
            <span className="w-6 h-6 flex items-center justify-center bg-slate-200 text-slate-700 font-bold rounded-full text-xs">{i+1}</span>
            {step}
          </li>
        ))}
      </ol>
    </SectionCard>

    <SectionCard title="5. Các dạng bài toán điển hình" colorClass="bg-gradient-to-r from-slate-700 to-slate-800" icon="💡">
      <div className="space-y-8">
        <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-indigo-500">
          <h4 className="font-bold text-indigo-700 text-lg mb-3">Dạng 1: Sắp xếp hai loại đối tượng (Một loại không đứng cạnh nhau)</h4>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Đặc trưng: Có hai nhóm đối tượng khác nhau, trong đó một nhóm bị ràng buộc bởi điều kiện "không có hai đối tượng đứng cạnh nhau".
          </p>
          <div className="bg-white p-3 rounded-lg border border-slate-200 mb-3">
             <p className="text-sm font-bold text-slate-700 uppercase mb-2">Cách giải:</p>
             <p className="text-sm text-slate-600 italic">Sắp xếp nhóm không bị ràng buộc trước để tạo khung $\rightarrow$ Phân phối nhóm bị ràng buộc vào các khe trống.</p>
          </div>
          <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
             <p className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-tighter">Ví dụ:</p>
             <p className="text-sm text-indigo-900 font-medium">Xếp 5 bạn nam và 3 bạn nữ thành một hàng ngang sao cho không có hai bạn nữ nào đứng cạnh nhau.</p>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-teal-500">
          <h4 className="font-bold text-teal-700 text-lg mb-3">Dạng 2: Có khoảng cách tối thiểu & Điều kiện biên</h4>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Đặc trưng: Các đối tượng bị ràng buộc không kề nhau hoặc cách nhau ít nhất một vị trí xác định, đôi khi đi kèm điều kiện ở hai đầu hàng.
          </p>
          <div className="bg-white p-3 rounded-lg border border-slate-200 mb-3">
             <p className="text-sm font-bold text-slate-700 uppercase mb-2">Cách giải:</p>
             <p className="text-sm text-slate-600 italic">Sau khi tạo khung, chỉ chọn một số khoảng trống thỏa mãn điều kiện biên (ví dụ không chọn 2 khe ở đầu nếu đầu hàng phải là vật cố định).</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
             <p className="text-xs font-bold text-teal-600 mb-1 uppercase tracking-tighter">Ví dụ:</p>
             <p className="text-sm text-teal-900 font-medium">Xếp 8 bạn nam và 6 bạn nữ sao cho không có hai bạn nữ nào đứng cạnh nhau và hai đầu hàng đều là bạn nam.</p>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-amber-500">
          <h4 className="font-bold text-amber-700 text-lg mb-3">Dạng 3: Bài toán sắp xếp có nhiều điều kiện kết hợp</h4>
          <p className="text-sm text-slate-600 mb-3 leading-relaxed">
            Đặc trưng: Kết hợp điều kiện không kề nhau, điều kiện vị trí, tính giống/khác nhau hoặc các ngữ cảnh thực tiễn phức tạp.
          </p>
          <div className="bg-white p-3 rounded-lg border border-slate-200 mb-3">
             <p className="text-sm font-bold text-slate-700 uppercase mb-2">Cách giải:</p>
             <p className="text-sm text-slate-600 italic">Vận dụng linh hoạt kỹ thuật khoảng trống kết hợp với các quy tắc nhân, hoán vị và tổ hợp theo từng giai đoạn.</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
             <p className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-tighter">Ví dụ:</p>
             <p className="text-sm text-amber-900 font-medium">Có bốn ngăn kệ và bảy quyển sách khác nhau, xếp các quyển sách vào các ngăn sao cho mỗi ngăn có ít nhất một quyển và thứ tự các quyển sách trong từng ngăn được xét đến.</p>
          </div>
        </div>
      </div>
    </SectionCard>
  </div>
);

export const CompareView: React.FC = () => (
  <div className="space-y-12 animate-fadeIn">
     <div className="text-center">
       <h2 className="text-3xl font-extrabold text-purple-800">Phân Biệt Nhanh</h2>
       <p className="text-slate-500 mt-2 italic">Hiểu bản chất để không bao giờ chọn nhầm công thức.</p>
     </div>
     
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-2xl border-t-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">⭐</div>
             <h3 className="text-blue-800 font-bold text-xl">Stars and Bars</h3>
          </div>
          <ul className="space-y-3">
            {[
              'Tổng bằng n (cố định)',
              'Chia vật giống nhau',
              'Nghiệm nguyên phương trình',
              'Mua đồ được lặp lại'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>{item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-2xl border-t-4 border-green-500 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">🧠</div>
             <h3 className="text-green-800 font-bold text-xl">Khoảng Trống</h3>
          </div>
          <ul className="space-y-3">
            {[
              'Không kề nhau / Cách ly',
              'Xếp hàng nam nữ xen kẽ',
              'Chèn số vào dãy',
              'Tạo khe giữa các vật'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{item}
              </li>
            ))}
          </ul>
        </div>
     </div>

     <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-30 -mr-16 -mt-16"></div>
        <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <span className="bg-purple-100 p-2 rounded-lg">📐</span> So sánh mô hình trực quan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-black">1.</span>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">Mô hình VÁCH NGĂN</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-blue-100 min-h-[140px] flex flex-col justify-center items-center text-center">
              <div className="text-2xl font-mono text-slate-700 mb-3 tracking-widest">
                ★ ★ <span className="text-blue-500 font-bold text-3xl">|</span> ★ <span className="text-blue-500 font-bold text-3xl">|</span> ★ ★ ★
              </div>
              <p className="text-xs text-slate-500 px-4 leading-relaxed">
                Vách ngăn <span className="text-blue-500 font-bold">|</span> dùng để <strong>chia tổng</strong>. 
                <br/>Có thể đứng kề nhau (nhóm nhận 0 vật).
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
               <p className="text-xs text-blue-800"><strong>Tính chất:</strong> Vách ngăn là "biên giới" linh hoạt, không chiếm chỗ cố định của vật.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-black">2.</span>
              <p className="text-sm font-bold text-green-600 uppercase tracking-widest">Mô hình KHOẢNG TRỐNG</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-green-100 min-h-[140px] flex flex-col justify-center items-center text-center">
              <div className="text-2xl font-mono text-slate-700 mb-3 tracking-widest">
                <span className="text-green-500 font-bold underline">_</span> O <span className="text-green-500 font-bold underline">_</span> O <span className="text-green-500 font-bold underline">_</span> O <span className="text-green-500 font-bold underline">_</span>
              </div>
              <p className="text-xs text-slate-500 px-4 leading-relaxed">
                Khoảng trống <span className="text-green-500 font-bold">_</span> dùng để <strong>cách ly</strong>. 
                <br/>Mỗi chỗ chỉ chứa tối đa 1 vật (không được kề nhau).
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
               <p className="text-xs text-green-800"><strong>Tính chất:</strong> Khoảng trống là "vị trí" nghiêm ngặt, buộc các vật phải có khoảng cách.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-4 font-bold border-r border-slate-700">Đặc điểm</th>
                <th className="p-4 font-bold border-r border-slate-700 bg-blue-900/50">Mô hình Vách ngăn</th>
                <th className="p-4 font-bold bg-green-900/50">Mô hình Khoảng trống</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold bg-slate-50">Mục tiêu chính</td>
                <td className="p-4">Chia <strong>n</strong> vật vào <strong>k</strong> nhóm</td>
                <td className="p-4">Ngăn chặn sự <strong>tiếp xúc kề nhau</strong></td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold bg-slate-50">Quy tắc đặt</td>
                <td className="p-4">Vách có thể kề vách (nhóm 0 vật)</td>
                <td className="p-4">Mỗi khe tối đa 1 vật (cách ít nhất 1)</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold bg-slate-50">Đối tượng chèn</td>
                <td className="p-4">Vách ngăn (vô hình, chỉ chia vùng)</td>
                <td className="p-4">Vật thể thật (có vị trí xác định)</td>
              </tr>
            </tbody>
          </table>
        </div>
     </div>

     <div className="relative">
        <div className="absolute inset-0 bg-yellow-300 blur-lg opacity-30"></div>
        <div className="relative bg-gradient-to-r from-yellow-50 to-amber-50 p-8 rounded-2xl border-2 border-yellow-300 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
            <h3 className="text-amber-800 font-extrabold text-2xl uppercase mb-4 tracking-wider">⚡ Mẹo 3 giây</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-12">
               <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                  <span className="block text-sm text-slate-400 font-bold uppercase">Thấy</span>
                  <span className="block text-xl font-bold text-blue-600 mt-1">"Tổng cố định"</span>
                  <span className="block text-2xl mt-2">👇</span>
                  <span className="block font-bold text-slate-800 mt-2 italic">Dùng Vách Ngăn</span>
               </div>
               <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100">
                  <span className="block text-sm text-slate-400 font-bold uppercase">Thấy</span>
                  <span className="block text-xl font-bold text-green-600 mt-1">"Không kề nhau"</span>
                  <span className="block text-2xl mt-2">👇</span>
                  <span className="block font-bold text-slate-800 mt-2 italic">Dùng Khoảng Trống</span>
               </div>
            </div>
        </div>
     </div>
  </div>
);

export const ExamplesView: React.FC = () => (
  <div className="space-y-8 animate-fadeIn">
    <h2 className="text-3xl font-bold text-slate-800 border-b-2 border-slate-200 pb-4">✅ Ví dụ minh họa</h2>
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:border-blue-300 transition-all">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <span className="font-bold text-lg">Ví dụ 1</span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Mô hình Vách ngăn</span>
      </div>
      <div className="p-6">
        <p className="text-lg font-medium text-slate-800 mb-4">
          Tìm nghiệm nguyên không âm của: <br/>
          <span className="math-text text-2xl text-blue-700 block mt-2 text-center bg-blue-50 py-2 rounded-lg">x₁ + x₂ + x₃ + x₄ = 10</span>
        </p>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
          <p className="text-slate-500 mb-2 text-xs uppercase font-bold tracking-wider">Lời giải:</p>
          <p className="text-slate-700 mb-2">Áp dụng công thức trực tiếp với <span className="math-text font-bold">n = 10</span> và <span className="math-text font-bold">k = 4</span>.</p>
          <div className="flex items-center justify-center mt-4">
             <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-blue-200 text-blue-800 font-mono text-xl font-bold">
               {'$C_{10 + 4 - 1}^{4 - 1} = C_{13}^{3} = 286$'}
             </div>
          </div>
        </div>
      </div>
    </div>

    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:border-green-300 transition-all">
      <div className="bg-green-600 text-white p-4 flex justify-between items-center">
        <span className="font-bold text-lg">Ví dụ 2</span>
        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">Mô hình Khoảng trống</span>
      </div>
      <div className="p-6">
        <p className="text-lg font-medium text-slate-800 mb-4">
          6 nam, 3 nữ xếp hàng. Hỏi có bao nhiêu cách để <span className="text-red-600 font-bold">không có 2 nữ kề nhau</span>?
        </p>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
          <p className="text-slate-500 mb-2 text-xs uppercase font-bold tracking-wider">Lời giải:</p>
          <ul className="list-decimal pl-5 space-y-2 text-slate-700 mb-4">
            <li>Xếp 6 nam: <strong>6!</strong> cách.</li>
            <li>Tạo ra <span className="font-bold text-green-600">7 khoảng trống</span> (giữa và 2 đầu).</li>
            <li>Chọn 3 chỗ cho nữ từ 7 chỗ: <strong>{'$C_{7}^{3}$'}</strong>.</li>
            <li>Xếp 3 nữ vào 3 chỗ đó: <strong>3!</strong>.</li>
          </ul>
          <div className="border-t border-slate-200 pt-3 text-center">
            <span className="text-slate-500 text-sm mr-2">Kết quả:</span>
            <span className="font-mono text-xl text-green-700 font-bold">{'$6! \\times C_{7}^{3} \\times 3! = 151,200$'}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
