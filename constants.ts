import { Problem, QuizQuestion } from './types';

export const PROBLEMS: Problem[] = [
  {
    id: 1,
    type: 'SB',
    level: 'D',
    question: "Tìm số nghiệm nguyên không âm của phương trình: $x_1 + x_2 + x_3 + x_4 = 20$",
    hints: [
      "Dạng bài này là tổng = n cố định. Sử dụng kỹ thuật Stars and Bars.",
      "Mô hình hóa: Ta có n = 20 ngôi sao và k = 4 biến (cần k-1 = 3 vách ngăn).",
      "Điều kiện $x_i \\ge 0$ là điều kiện chuẩn, không cần đổi biến.",
      "Công thức: $C_{n + k - 1}^{k - 1}$."
    ],
    solution: "Áp dụng công thức Stars and Bars cho nghiệm không âm:\n$n=20, k=4$.\nSố nghiệm là $C_{20+4-1}^{4-1} = C_{23}^{3} = \\frac{23 \\times 22 \\times 21}{6} = 1771$."
  },
  {
    id: 2,
    type: 'SB',
    level: 'D',
    question: "Tìm số nghiệm nguyên dương của phương trình: $x_1 + x_2 + x_3 = 15$ ($x_i \\ge 1$)",
    hints: [
      "Dạng bài tổng = n, nhưng điều kiện là nguyên dương ($x_i \\ge 1$).",
      "Cần đổi biến để đưa về dạng không âm chuẩn.",
      "Đặt $y_i = x_i - 1 \\ge 0$. Khi đó phương trình trở thành $y_1 + y_2 + y_3 = 15 - 3$.",
      "Áp dụng công thức cho tổng mới $n' = 12$ và $k = 3$."
    ],
    solution: "Đặt $y_i = x_i - 1 \\ge 0$. \nPhương trình trở thành: $(y_1+1) + (y_2+1) + (y_3+1) = 15 \\Rightarrow y_1+y_2+y_3 = 12$.\nSố nghiệm là $C_{12+3-1}^{3-1} = C_{14}^{2} = 91$."
  },
  {
    id: 3,
    type: 'SB',
    level: 'TB',
    question: "Tìm số nghiệm của $x_1+x_2+x_3+x_4=30$ với $x_1 \\ge 2, x_2 \\ge 1, x_3 \\ge 3, x_4 \\ge 0$.",
    hints: [
      "Bài toán tổng = n có các cận dưới khác nhau.",
      "Cần đặt ẩn phụ để triệt tiêu các cận dưới này.",
      "Đặt $y_1=x_1-2, y_2=x_2-1, y_3=x_3-3, y_4=x_4$. Tổng các hằng số giảm đi là $2+1+3+0=6$.",
      "Phương trình mới: $y_1+y_2+y_3+y_4 = 30 - 6 = 24$. Áp dụng Stars and Bars."
    ],
    solution: "Đặt ẩn phụ tương ứng, ta có tổng mới $n' = 30 - (2+1+3+0) = 24$.\nSố biến $k=4$.\nSố nghiệm là $C_{24+4-1}^{4-1} = C_{27}^{3} = 2925$."
  },
  {
    id: 4,
    type: 'SB',
    level: 'TB',
    question: "Chia 12 chiếc kẹo giống nhau cho 5 bạn nhỏ, sao cho mỗi bạn có ít nhất 1 chiếc.",
    hints: [
      "Chia vật giống nhau vào các nhóm phân biệt $\\rightarrow$ Stars and Bars.",
      "Điều kiện 'ít nhất 1' nghĩa là nghiệm nguyên dương.",
      "Phát trước cho mỗi bạn 1 kẹo. Số kẹo còn lại là $12 - 5 = 7$.",
      "Chia 7 kẹo còn lại cho 5 bạn (không cần điều kiện gì thêm): $C_{7+5-1}^{5-1}$."
    ],
    solution: "Phát trước mỗi bạn 1 cái (hết 5 cái). Còn lại 7 cái chia cho 5 bạn tùy ý.\nÁp dụng Stars and Bars với $n=7, k=5$.\nKết quả: $C_{7+5-1}^{5-1} = C_{11}^{4} = 330$."
  },
  {
    id: 5,
    type: 'SB',
    level: 'TB',
    question: "Có 6 loại bánh khác nhau. Bạn muốn mua 10 chiếc bánh (có thể chọn lặp lại). Hỏi có bao nhiêu cách?",
    hints: [
      "Mua 10 chiếc từ 6 loại $\\rightarrow$ Tổng số bánh = 10.",
      "Gọi $x_i$ là số bánh loại $i$ mua được. Ta có $x_1 + \\dots + x_6 = 10, x_i \\ge 0$.",
      "Đây là bài toán chia kẹo (Stars and Bars) cơ bản.",
      "Số nghiệm là $C_{n+k-1}^{k-1}$ với $n=10, k=6$."
    ],
    solution: "Phương trình: $x_1 + \\dots + x_6 = 10$ ($x_i \\ge 0$).\nSố cách chọn là $C_{10+6-1}^{6-1} = C_{15}^{5} = 3003$."
  },
  {
    id: 6,
    type: 'KT',
    level: 'D',
    question: "Có 12 chiếc ghế xếp thành hàng ngang. Chọn ra 5 chiếc ghế sao cho không có 2 chiếc nào kề nhau.",
    hints: [
      "Từ khóa: 'không kề nhau' $\\rightarrow$ Dùng Kỹ thuật Khoảng trống (Gaps).",
      "Bước 1: Xếp các đối tượng KHÔNG được chọn trước. Có $12-5=7$ ghế không được chọn.",
      "Bước 2: 7 ghế này tạo ra 8 khoảng trống (tính cả 2 đầu).",
      "Bước 3: Đặt 5 ghế được chọn vào 8 khoảng trống đó."
    ],
    solution: "Xếp 7 ghế không được chọn ra hàng: O O O O O O O\nSố khoảng trống tạo ra là $7+1=8$ khe.\nChọn 5 khe để đặt 5 ghế được chọn vào: $C_{8}^{5} = 56$."
  },
  {
    id: 7,
    type: 'KT',
    level: 'TB',
    question: "Có 6 nam và 4 nữ xếp thành một hàng ngang. Hỏi có bao nhiêu cách xếp sao cho không có 2 bạn nữ nào đứng cạnh nhau?",
    hints: [
      "Yêu cầu: Nữ không kề nhau $\\rightarrow$ Xếp Nam trước, Nữ chèn khe.",
      "Bước 1: Xếp 6 nam thành hàng. Có $6!$ cách.",
      "Bước 2: 6 nam tạo ra 7 khoảng trống.",
      "Bước 3: Chọn 4 khoảng trống từ 7, xếp 4 nữ vào đó (có thứ tự)."
    ],
    solution: "Xếp 6 nam: $6!$ cách.\nTạo ra 7 khe. Chọn 4 khe và xếp 4 nữ vào: $A_{7}^{4}$ (hoặc $C_{7}^{4} \\times 4!$).\nTổng số cách: $6! \\times \\frac{7!}{3!} = 720 \\times 840 = 604800$."
  },
  {
    id: 8,
    type: 'KT',
    level: 'TB',
    question: "Có bao nhiêu chuỗi nhị phân độ dài 10 chứa đúng 4 số 1 và không có hai số 1 nào đứng cạnh nhau?",
    hints: [
      "Đối tượng cần 'cách ly' là số 1. Đối tượng 'vách ngăn' là số 0.",
      "Có 4 số 1, suy ra có $10-4=6$ số 0.",
      "Bước 1: Xếp 6 số 0. (Chỉ có 1 cách vì các số 0 giống nhau).",
      "Bước 2: 6 số 0 tạo ra 7 khe. Đặt 4 số 1 vào 7 khe đó."
    ],
    solution: "Xếp 6 số 0 thành hàng (1 cách).\nTạo ra 7 khoảng trống.\nĐặt 4 số 1 vào 7 khoảng trống: $C_{7}^{4}$ cách (vì các số 1 giống nhau).\nKết quả: $C_{7}^{4} = 35$."
  },
  {
    id: 9,
    type: 'KT',
    level: 'K',
    question: "Chọn 6 số từ tập $\\{1, 2, \\dots, 30\\}$ sao cho hiệu của hai số bất kỳ được chọn có trị tuyệt đối ít nhất là 3.",
    hints: [
      "Điều kiện $|a_i - a_j| \\ge 3$ nghĩa là giữa 2 số được chọn phải có ít nhất 2 số không được chọn.",
      "Đây là bài toán mở rộng của 'không kề nhau' (kề nhau là cách nhau 1, đây cần cách $\\ge 3$).",
      "Cách giải: Giả sử chọn $x_1 < x_2 < \\dots < x_6$. Đặt biến phụ $y_1=x_1, y_2=x_2-2, y_3=x_3-4 \\dots$ hoặc dùng tư duy xếp vật.",
      "Mẹo: Coi 6 số được chọn là 6 'viên bi', mỗi viên bi phải 'cõng' theo 2 viên bi đệm bên phải (trừ viên cuối). Tức là ta 'bó' cứng các khối."
    ],
    solution: "Gọi 6 số được chọn là $x_1 < x_2 < \\dots < x_6$.\nĐiều kiện: $x_{i+1} - x_i \\ge 3$.\nĐặt $y_1 = x_1 (\\ge 1)$\n$y_2 = x_2 - 2$\n$y_3 = x_3 - 4$\n...\n$y_6 = x_6 - 10$.\nĐiều kiện $1 \\le x_1$ và $x_6 \\le 30$ trở thành $1 \\le y_1 < y_2 < \\dots < y_6 \\le 30-10=20$.\nBài toán trở thành chọn 6 số phân biệt từ tập 20 số: $C_{20}^{6} = 38760$."
  },
  {
    id: 10,
    type: 'KT',
    level: 'TB',
    question: "Có 7 chữ A và 3 chữ B. Xếp chúng thành hàng sao cho không có 2 chữ B nào đứng cạnh nhau.",
    hints: [
      "Đối tượng cần cách ly: B. Vách ngăn: A.",
      "Bước 1: Xếp 7 chữ A. (1 cách vì A giống nhau).",
      "Bước 2: 7 chữ A tạo ra 8 khoảng trống.",
      "Bước 3: Đặt 3 chữ B vào 8 khoảng trống đó."
    ],
    solution: "Xếp 7 chữ A: 1 cách.\nTạo ra 8 khe.\nChọn 3 khe từ 8 khe để đặt B: $C_{8}^{3}$ (vì B giống nhau nên dùng tổ hợp).\nKết quả: $C_{8}^{3} = 56$."
  }
];

// Sample quiz questions based on the logic requested
export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: "Số nghiệm nguyên không âm của $x_1 + x_2 + x_3 = 10$ là bao nhiêu?",
    options: [
      { key: 'A', text: "66", isCorrect: true, explanation: "Đúng! $n=10, k=3$. CT: $C_{10+3-1}^{3-1} = C_{12}^{2} = 66$." },
      { key: 'B', text: "12", isCorrect: false, explanation: "Sai. Bạn có thể nhầm $C_{n}^{k}$." },
      { key: 'C', text: "36", isCorrect: false, explanation: "Sai. Hãy kiểm tra lại công thức $C_{n+k-1}^{k-1}$." },
      { key: 'D', text: "220", isCorrect: false, explanation: "Sai. Đây là $C_{12}^{3}$, bạn áp dụng nhầm $k$ thay vì $k-1$." }
    ]
  },
  {
    id: 2,
    question: "Xếp 5 nam, 3 nữ sao cho không có 2 nữ kề nhau. Bước đầu tiên là gì?",
    options: [
      { key: 'A', text: "Xếp 3 nữ trước", isCorrect: false, explanation: "Sai. Nguyên tắc khoảng trống là xếp đối tượng 'bình thường' trước, đối tượng cần cách ly xếp sau." },
      { key: 'B', text: "Xếp 5 nam trước", isCorrect: true, explanation: "Đúng! Xếp nam tạo khung, sau đó nữ chèn khe." },
      { key: 'C', text: "Xếp cả 8 người bất kỳ", isCorrect: false, explanation: "Sai. Như vậy không đảm bảo điều kiện không kề nhau." },
      { key: 'D', text: "Chọn 3 ghế cho nữ", isCorrect: false, explanation: "Sai. Đây là bài toán xếp hàng (hoán vị), không phải chọn ghế cố định." }
    ]
  },
  {
    id: 3,
    question: "Số nghiệm nguyên dương ($x_i \\ge 1$) của $x_1+x_2+x_3+x_4=12$?",
    options: [
      { key: 'A', text: "455", isCorrect: false, explanation: "Sai. Đây là nghiệm không âm ($C_{15}^{3}$)." },
      { key: 'B', text: "165", isCorrect: true, explanation: "Đúng! Đổi biến $n' = 12-4 = 8$. KQ: $C_{8+3}^{3} = C_{11}^{3} = 165$." },
      { key: 'C', text: "495", isCorrect: false, explanation: "Sai." },
      { key: 'D', text: "120", isCorrect: false, explanation: "Sai." }
    ]
  },
  {
    id: 4,
    question: "Mẹo nhanh 3 giây để phân biệt Stars and Bars và Khoảng Trống?",
    options: [
      { key: 'A', text: "Tổng n dùng Khoảng Trống", isCorrect: false, explanation: "Sai. Tổng n dùng Stars and Bars." },
      { key: 'B', text: "Không kề nhau dùng Stars and Bars", isCorrect: false, explanation: "Sai. Không kề dùng Khoảng trống." },
      { key: 'C', text: "Tổng n -> Stars & Bars; Không kề -> Khoảng trống", isCorrect: true, explanation: "Chính xác! Đây là quy tắc vàng." },
      { key: 'D', text: "Cả hai đều giống nhau", isCorrect: false, explanation: "Sai." }
    ]
  },
  {
    id: 5,
    question: "Trong bài toán chia kẹo Euler (Stars & Bars), số vách ngăn cần dùng cho k nhóm là bao nhiêu?",
    options: [
      { key: 'A', text: "k", isCorrect: false, explanation: "Sai." },
      { key: 'B', text: "k + 1", isCorrect: false, explanation: "Sai." },
      { key: 'C', text: "k - 1", isCorrect: true, explanation: "Đúng! Để chia thành k phần, ta cần k-1 vách ngăn." },
      { key: 'D', text: "n - 1", isCorrect: false, explanation: "Sai." }
    ]
  }
];