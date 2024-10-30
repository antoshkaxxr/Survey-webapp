interface ParsedSurvey {
    surveyId: string;
    parsedSurvey: {
        Name: string;
        Survey: Question[];
    }
}
