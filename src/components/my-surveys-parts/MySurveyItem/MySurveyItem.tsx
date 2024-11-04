import React from "react";
import {AppRoute} from "../../../const/AppRoute.ts";
import {Link} from "react-router-dom";
import {IP_ADDRESS} from "../../../config.ts";
import {sendChangingResponseWhenLogged, sendGetSheetResponseWhenLogged, getEmail} from "../../../sendResponseWhenLogged.ts";

interface MySurveyItemProps {
    surveyId: string;
    surveyName: string;
    setSurveyData: React.Dispatch<React.SetStateAction<ParsedSurvey[]>>;
    setAccessModalOpen: (open: boolean) => void;
    setAccessSurveyId: (id: string) => void;
}

const copyToClipboard = (surveyId: string) => {

    navigator.clipboard.writeText(`http://localhost:3000/survey/${surveyId}`).then(() => {
        alert("Ссылка на опрос скопирована в буфер обмена!");
    });
};

async function handleExport(surveyId: string) {
    const email = getEmail();
    const url = `http://localhost:8080/user/${email}/survey/${surveyId}/generate_excel`;

    try {
        const response = await sendGetSheetResponseWhenLogged(url);

        if (!response || !response.ok) {
            throw new Error(`HTTP error! status: ${response && response.status}`);
        }

        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = urlBlob;
        a.download = 'exported_survey.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
        console.error('Ошибка при экспорте:', error);
    }
}

export function MySurveyItem({surveyId, surveyName, setSurveyData, setAccessModalOpen, setAccessSurveyId} : MySurveyItemProps) {
    const handleDelete = async (surveyId: string) => {
        const confirmDeletion = window.confirm("Вы уверены, что хотите удалить этот опрос?");
        if (confirmDeletion) {
            try {
                const response = await sendChangingResponseWhenLogged('DELETE',
                    `http://${IP_ADDRESS}:8080/survey/${surveyId}`, {});

                if (!response || !response.ok) {
                    throw new Error('Ошибка при удалении опроса');
                }

                setSurveyData((prevData) => prevData.filter(survey => survey.surveyId !== surveyId));
            } catch (error) {
                alert('Не удалось удалить опрос. Попробуйте снова.');
            }
        }
    };

    return (
        <div className={'survey-container'}>
            <div className="survey-header">
                <h3>{surveyName !== '' ? surveyName : 'Без названия'}</h3>
                <div className="survey-buttons">
                    <Link to={`${AppRoute.Survey}/${surveyId}`}>
                        <button>
                            <img src="/icons/icon-preview.svg" alt="Предпросмотр"/>
                        </button>
                    </Link>
                    <button onClick={() => copyToClipboard(surveyId)}>
                        <img src="/icons/icon-copy.svg" alt="Скопировать"/>
                    </button>
                    <button onClick={() => {
                        setAccessModalOpen(true);
                        setAccessSurveyId(surveyId);
                    }}>
                        <img src="/icons/icon-access.svg" alt="Доступ"/>
                    </button>
                    <button onClick={() => handleExport(surveyId)}>
                        <img src="/icons/icon-export.svg" alt="Экспорт"/>
                    </button>
                    <Link to={`${AppRoute.FormBuilder}/${surveyId}`}>
                        <button>
                            <img src="/icons/icon-edit.svg" alt="Редактировать"/>
                        </button>
                    </Link>
                    <button onClick={() => handleDelete(surveyId)}>
                        <img src="/icons/icon-delete.svg" alt="Удалить"/>
                    </button>
                </div>
            </div>
        </div>
    );
}
