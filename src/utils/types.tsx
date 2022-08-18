export interface HeaderProps {
  title: string;
}

export interface AnswerButtonProps {
  key: number;
  answer: string;
  onPress: () => void;
  correct: boolean;
  disabled: boolean;
}

export interface Answer {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export interface AnswerProps {
  userAnswer: Answer | undefined;
  answers: string[];
  setCorrectAnswer: any;
  checkAnswer: () => void;
}

export interface QuestionProps {
  questionNo: number;
  question: string;
}

export interface Question {
  category: string;
  incorrect_answers: string[];
  correct_answer: string;
  difficulty: string;
  question: string;
  type: string;
  answers: string[],
 };