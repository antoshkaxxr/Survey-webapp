import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const.ts";
import './custom-my-surveys.css';

interface Question {
    type: string;
    questionId: number;
    question: string;
    options?: string[];
    min?: number;
    max?: number;
}

interface Survey {
    surveyId: number;
    survey: string;
}

interface ParsedSurvey {
    surveyId: number;
    parsedSurvey: {
        Name: string;
        Survey: Question[];
    }
}

function MySurveysPage() {
    const [surveyData, setSurveyData] = useState<ParsedSurvey[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/jenoshima42@despair.com/surveys`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                let data: Survey[] = await response.json();
                const parsedData: ParsedSurvey[] = data.map((survey) => ({
                    surveyId: survey.surveyId,
                    parsedSurvey: JSON.parse(survey.survey)
                }));
                setSurveyData(parsedData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveys();
    }, []);

    const copyToClipboard = (surveyId: number) => {
        navigator.clipboard.writeText(`http://localhost:3000/survey/${surveyId}`).then(() => {
            alert("Ссылка на опрос скопирована в буфер обмена!");
        });
    };

    const handleAccess = (surveyId: number) => {
        alert(`Доступ к опросу с ID ${surveyId}`);
    };

    const handleDelete = async (surveyId: number) => {
        const confirmDeletion = window.confirm("Вы уверены, что хотите удалить этот опрос?");
        if (confirmDeletion) {
            try {
                console.log(surveyId);
                const response = await fetch(`http://localhost:8080/survey/${surveyId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Ошибка при удалении опроса');
                }

                setSurveyData((prevData) => prevData.filter(survey => survey.surveyId !== surveyId));
            } catch (error) {
                console.log(error);
                alert('Не удалось удалить опрос. Попробуйте снова.');
            }
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>Мои опросы</h1>
            <Link to={AppRoute.FormBuilder}>
                <button className="create-survey-button">Создать новый опрос</button>
            </Link>
            {surveyData.map((survey) => (
                <div className={'survey-container'} key={survey.surveyId}>
                    <div className="survey-header">
                        <h3>{survey.parsedSurvey.Name !== '' ? survey.parsedSurvey.Name : 'Без названия'}</h3>
                        <div className="survey-buttons">
                            <Link to={`${AppRoute.Survey}/${survey.surveyId}`}>
                                <button>
                                    <img src="/icons/icon-preview.svg" alt="Предпросмотр"/>
                                </button>
                            </Link>
                            <button onClick={() => copyToClipboard(survey.surveyId)}>
                            <img src="/icons/icon-copy.svg" alt="Скопировать"/>
                            </button>
                            <button onClick={() => handleAccess(survey.surveyId)}>
                                <img src="/icons/icon-access.svg" alt="Доступ"/>
                            </button>
                            <Link to={`${AppRoute.FormBuilder}/${survey.surveyId}`}>
                                <button>
                                    <img src="/icons/icon-edit.svg" alt="Редактировать"/>
                                </button>
                            </Link>
                            <button onClick={() => handleDelete(survey.surveyId)}>
                                <img src="/icons/icon-delete.svg" alt="Удалить"/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MySurveysPage;
