import React from "react";

interface DeleteButtonProps {
    surveyId: number;
    setSurveyData: React.Dispatch<React.SetStateAction<ParsedSurvey[]>>;
}

export function DeleteButton({surveyId, setSurveyData} : DeleteButtonProps) {
    const handleDelete = async (surveyId: number) => {
        const confirmDeletion = window.confirm("Вы уверены, что хотите удалить этот опрос?");
        if (confirmDeletion) {
            try {
                const response = await fetch(`http://localhost:8080/survey/${surveyId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Ошибка при удалении опроса');
                }

                setSurveyData((prevData) => prevData.filter(survey => survey.surveyId !== surveyId));
            } catch (error) {
                alert('Не удалось удалить опрос. Попробуйте снова.');
            }
        }
    };

    return (
        <button onClick={() => handleDelete(surveyId)}>
            <img src="/icons/icon-delete.svg" alt="Удалить"/>
        </button>
    );
}
