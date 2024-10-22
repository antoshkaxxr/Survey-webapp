import React from "react";
import './survey-title-styles.css';

interface SurveyTitleProps {
    surveyTitle: string;
    setSurveyTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function SurveyTitle({surveyTitle, setSurveyTitle}: SurveyTitleProps) {
    return (
        <div className="survey-title-container">
            <input
                type="text"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="Название формы"
                className="survey-title-input"
            />
        </div>
    );
}
