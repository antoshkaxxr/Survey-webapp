import React, {useState} from "react";
import {AppRoute} from "../../../const/AppRoute.ts";
import {Link} from "react-router-dom";
import {IP_ADDRESS} from "../../../config.ts";
import {sendChangingResponseWhenLogged, getEmail} from "../../../sendResponseWhenLogged.ts";
import './MySurveyItem.css';
import {ExportModal} from "../ExportModal/ExportModal.tsx";

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



export function MySurveyItem({surveyId, surveyName, setSurveyData, setAccessModalOpen, setAccessSurveyId} : MySurveyItemProps) {
    const [isExportModalOpen, setExportModalOpen] = useState<boolean>(false);

    const handleDelete = async (surveyId: string) => {
        const confirmDeletion = window.confirm("Вы уверены, что хотите удалить этот опрос?");
        if (confirmDeletion) {
            try {
                const response = await sendChangingResponseWhenLogged('DELETE',
                    `http://${IP_ADDRESS}:8080/user/${getEmail()}/survey/${surveyId}`, {});

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
        <div>
            <div className={'survey-container'}>
                <div className="survey-header">
                    <h3  className="my-survey-title">{surveyName !== '' ? surveyName : 'Без названия'}</h3>
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
                        <button onClick={() => setExportModalOpen(true)}>
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
                {isExportModalOpen && <ExportModal
                    surveyId={surveyId}
                    surveyName={surveyName}
                    onClose={() => setExportModalOpen(false)}>
                </ExportModal>}
        </div>
)
    ;
}
