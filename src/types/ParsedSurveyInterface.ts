interface ParsedSurvey {
    surveyId: string;
    parsedSurvey: {
        Name: string;
        Survey: SurveyQuestion[];
    }
}
interface SurveyData {
    Name: string;
    Theme: {
        name: string;
        theme: string;
        url: string;
    }
    Survey: SurveyQuestion[];
}

