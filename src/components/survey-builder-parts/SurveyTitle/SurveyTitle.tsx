import React from "react";
import './SurveyTitle.css';

interface SurveyTitleProps {
    surveyTitle: string;
    setSurveyTitle: React.Dispatch<React.SetStateAction<string>>;
}

export function SurveyTitle({surveyTitle, setSurveyTitle}: SurveyTitleProps) {
    return (
        <div className="survey-title-container">
            <input
                type="text"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="Без названия"
                className="survey-title-input"
            />
        </div>
    );
}
