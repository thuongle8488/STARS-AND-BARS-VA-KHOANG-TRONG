
export type TechType = 'SB' | 'KT'; // Stars&Bars or KhoangTrong
export type Level = 'D' | 'TB' | 'K'; // De, Trung Binh, Kho

export interface Problem {
  id: number;
  type: TechType;
  level: Level;
  question: string;
  hints: string[]; // 4 levels of hints
  solution: string; // Full solution
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export type AppView = 
  | 'HOME' 
  | 'THEORY_SB' 
  | 'THEORY_KT' 
  | 'PROCESS_SB'
  | 'PROCESS_KT'
  | 'COMPARE' 
  | 'EXAMPLES' 
  | 'PRACTICE_CONFIG' 
  | 'PRACTICE_SESSION' 
  | 'QUIZ_CONFIG' 
  | 'QUIZ_SESSION'
  | 'AI_ASSISTANT';
