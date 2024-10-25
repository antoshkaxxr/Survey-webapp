interface ParsedSurvey {
    surveyId: number;
    parsedSurvey: {
        Name: string;
        Survey: Question[];
    }
}
