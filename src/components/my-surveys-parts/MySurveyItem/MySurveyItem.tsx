import React, { useState } from "react";
import { AppRoute } from "../../../const/AppRoute.ts";
import { Link, useNavigate } from "react-router-dom";
import { BACK_ADDRESS, FRONT_ADDRESS } from "../../../config.ts";
import { sendChangingResponseWhenLogged } from "../../../sendResponseWhenLogged.ts";
import './MySurveyItem.css';
import { ExportModal } from "../../modals/ExportModal/ExportModal.tsx";
import { toast } from 'react-toastify';
import { Tooltip } from "react-tooltip";

interface MySurveyItemProps {
    surveyId: string;
    surveyName: string;
    setSurveyData: React.Dispatch<React.SetStateAction<ParsedSurvey[]>>;
    setAccessModalOpen: (open: boolean) => void;
    setAccessSurveyId: (id: string) => void;
}

const copyToClipboard = (surveyId: string) => {
    const url = `https://${FRONT_ADDRESS}/survey/${surveyId}`;
    navigator.clipboard.writeText(url).then(() => {
        toast.success('Ссылка скопирована!');
    }).catch(() => {
        toast.error('Не удалось скопировать ссылку!');
    });
};

export function MySurveyItem({ surveyId, surveyName, setSurveyData, setAccessModalOpen, setAccessSurveyId }: MySurveyItemProps) {
    const [isExportModalOpen, setExportModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDelete = async (surveyId: string) => {
        const confirmDelete = window.confirm('Вы уверены? Вы не сможете вернуть этот опрос после удаления!');

        if (confirmDelete) {
            try {
                const response = await sendChangingResponseWhenLogged('DELETE',
                    `${BACK_ADDRESS}/survey/${surveyId}`, {});

                if (!response || !response.ok) {
                    throw new Error('Ошибка при удалении опроса');
                }

                setSurveyData((prevData) => prevData.filter(survey => survey.surveyId !== surveyId));

                toast.success('Опрос успешно удален!');
            } catch (error) {
                toast.error('Не удалось удалить опрос. Попробуйте снова.');
            }
        }
    };

    return (
        <div>
            <div className={'survey-container'}>
                <div className="survey-header">
                    <h3 className="my-survey-title">{surveyName !== '' ? surveyName : 'Без названия'}</h3>
                    <div className="survey-buttons">
                        <Link to={`${AppRoute.Survey}/${surveyId}?preview=true`}>
                            <button data-tooltip-id="tooltip" data-tooltip-content="Предпросмотр">
                                <img src="/icons/icon-preview.svg" alt="Предпросмотр" />
                            </button>
                        </Link>
                        <button data-tooltip-id="tooltip" data-tooltip-content="Скопировать ссылку" onClick={() => copyToClipboard(surveyId)}>
                            <img src="/icons/icon-copy.svg" alt="Скопировать" />
                        </button>
                        <button data-tooltip-id="tooltip" data-tooltip-content="Управление доступом" onClick={() => {
                            setAccessModalOpen(true);
                            setAccessSurveyId(surveyId);
                        }}>
                            <img src="/icons/icon-access.svg" alt="Доступ" />
                        </button>
                        <button data-tooltip-id="tooltip" data-tooltip-content="Статистика" onClick={() => navigate(`${AppRoute.Statistic}/${surveyId}`)}>
                            <img src="/icons/icon-statistic.svg" alt="Статистика" />
                        </button>
                        <button data-tooltip-id="tooltip" data-tooltip-content="Экспорт" onClick={() => setExportModalOpen(true)}>
                            <img src="/icons/icon-export.svg" alt="Экспорт" />
                        </button>
                        <Link to={`${AppRoute.FormBuilder}/${surveyId}`}>
                            <button data-tooltip-id="tooltip" data-tooltip-content="Редактировать">
                                <img src="/icons/icon-edit.svg" alt="Редактировать" />
                            </button>
                        </Link>
                        <button data-tooltip-id="tooltip" data-tooltip-content="Удалить" onClick={() => handleDelete(surveyId)}>
                            <img src="/icons/icon-delete.svg" alt="Удалить" />
                        </button>
                    </div>
                </div>
            </div>
            {isExportModalOpen && <ExportModal
                surveyId={surveyId}
                surveyName={surveyName}
                onClose={() => setExportModalOpen(false)}>
            </ExportModal>}
            <Tooltip id="tooltip" place="top" />
        </div>
    );
}
