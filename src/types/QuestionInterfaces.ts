interface Question {
    type: number;
    questionId: number;
    question: string;
    options?: string[];
    min?: number;
    max?: number;
}

interface QuestionProps {
    questionInfo: Question;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
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
}
