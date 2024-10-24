import React from "react";
import {CopyButton} from "../copy-button/copy-button.tsx";
import {PreviewButton} from "../preview-button/preview-button.tsx";
import {AccessButton} from "../access-button/access-button.tsx";
import {EditButton} from "../edit-button/edit-button.tsx";
import {DeleteButton} from "../delete-button/delete-button.tsx";
import {ExportButton} from "../export-button/export-button.tsx";

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
