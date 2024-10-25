interface Question {
    type: string;
    questionId: number;
    question: string;
    options?: string[];
    min?: number;
    max?: number;
}

interface QuestionProps {
    questionInfo: Question;
    onAnswerChange: (questionId: number, question: string, answer: string) => void;
    reset: boolean;
}

interface SurveyQuestion {
    question: string;
    type: string | null;
    options?: string[];
    questionId: string;
}
