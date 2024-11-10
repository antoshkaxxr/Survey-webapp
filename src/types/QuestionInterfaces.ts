interface Question {
    type: number;
    questionId: number;
    question: string;
    options?: string[];
}

interface QuestionProps {
    questionInfo: SurveyQuestion;
    onAnswerChange: (questionId: string, question: string, answer: string) => void;
    isRequired: boolean;
    reset: boolean;
    backgroundColor: string;
    questionColor: string;
    textColor: string;
}

interface SurveyQuestion {
    question: string;
    type: number;
    options?: string[];
    questionId: string;
    necessarily: boolean
    min?: number;
    max?: number;
}
