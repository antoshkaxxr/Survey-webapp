interface QuestionProps {
    questionInfo: SurveyQuestion;
    answer: string;
    setAnswer: (p: string) => void;
    backgroundColor: string;
    questionColor: string;
    textColor: string;
}

interface SurveyQuestion {
    question: string;
    type: number;
    options?: string[];
    questionId: string;
    isRequired: boolean
    ranges?: string[];
}
