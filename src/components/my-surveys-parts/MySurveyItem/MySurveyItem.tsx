import React from "react";
import {CopyButton} from "../CopyButton/CopyButton.tsx";
import {PreviewButton} from "../PreviewButton/PreviewButton.tsx";
import {AccessButton} from "../AccessButton/AccessButton.tsx";
import {EditButton} from "../EditButton/EditButton.tsx";
import {DeleteButton} from "../DeleteButton/DeleteButton.tsx";
import {ExportButton} from "../ExportButton/ExportButton.tsx";

interface MySurveyItemProps {
    surveyId: number;
    surveyName: string;
    setSurveyData: React.Dispatch<React.SetStateAction<ParsedSurvey[]>>;
}

export function MySurveyItem({surveyId, surveyName, setSurveyData} : MySurveyItemProps) {
    return (
        <div className={'survey-container'}>
            <div className="survey-header">
                <h3>{surveyName !== '' ? surveyName : 'Без названия'}</h3>
                <div className="survey-buttons">
                    <PreviewButton surveyId={surveyId} />
                    <CopyButton surveyId={surveyId} />
                    <AccessButton surveyId={surveyId} />
                    <ExportButton surveyId={surveyId} />
                    <EditButton surveyId={surveyId} />
                    <DeleteButton surveyId={surveyId} setSurveyData={setSurveyData} />
                </div>
            </div>
        </div>
    );
}
