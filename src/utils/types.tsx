import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { store } from '../redux/store';

export type HeaderProps = {
  title: string;
}

export type AnswerButtonProps = {
  key: number;
  answer: string;
  onPress: () => void;
  correct: boolean;
  disabled: boolean;
}

export type Answer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export type AnswerProps = {
  userAnswer: Answer | undefined;
  answers: string[];
  setCorrectAnswer: any;
  checkAnswer: () => void;
}

export type QuestionProps = {
  questionNo: number;
  question: string;
}

export type Question = {
  category: string;
  incorrect_answers: string[];
  correct_answer: string;
  difficulty: string;
  question: string;
  type: string;
  answers: string[],
};

/*------------------------Navigation------------------------*/

export type QuizScreenProps = NativeStackScreenProps<StackParamList, "Quiz">;

export type StackParamList = {
  Quiz: undefined,
  Settings: undefined
};

/*------------------------Navigation------------------------*/

/*------------------------Redux Types------------------------*/

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThemeValue = {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
};

export type ThemeState = {
  type: string | null | undefined;
  value: ThemeValue;
};

/*------------------------Redux Types------------------------*/