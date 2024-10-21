interface Question {
    type: string;
    questionId: number;
    question: string;
    options?: string[];
    min?: number;
    max?: number;
}

interface Survey {
    surveyId: number;
    survey: string;
}

interface ParsedSurvey {
    surveyId: number;
    parsedSurvey: {
        Name: string;
        Survey: Question[];
    }
}

interface ButtonProps {
    surveyId: number;
}

interface Theme {
    name: string;
    theme: string;
    url: string;
}

interface SurveyQuestion {
    question: string;
    type: string | null;
    options?: string[];
    questionId: string;
}

interface Question {
    type: string;
    questionId: number;
    question: string;
    options?: string[];
    min?: number;
    max?: number;
}

interface SurveyData {
    Name: string;
    Theme: {
        name: string;
        theme: string;
        url: string;
    }
    Survey: Question[];
}
