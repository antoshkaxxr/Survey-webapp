import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SurveyPage.scss';
import { ComponentMap } from "../../const/ComponentMap.ts";
import { IP_ADDRESS } from "../../config.ts";
import {UnavailableSurvey} from "../../components/survey-parts/UnavailableSurvey/UnavailableSurvey.tsx";
import {sendGetResponseWhenLogged, sendChangingResponseWhenLogged, getEmail} from "../../sendResponseWhenLogged.ts";

interface SurveyData {
    Name: string;
    Theme: {
        name: string;
        theme: string;
        url: string;
    }
    Survey: Question[];
}

export function SurveyPage() {
    const { id } = useParams<{ id: string }>();
    const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
    const [openStatus, setOpenStatus] = useState<boolean>(true);
    const [answers, setAnswers] = useState<{ [key: number]: { question: string; answer: string } }>({});
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const checkSurveyAccess = async () => {
            try {
                const response = await sendGetResponseWhenLogged(`http://${IP_ADDRESS}:8080/survey/${id}/access`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении доступа к опросу');
                }

                const accessData = await response.json();
                if (accessData.status === "Inactive") {
                    setOpenStatus(false);
                    return;
                } else if (accessData.status === "Active") {
                    if (accessData.isLimited) {
                        const currentTime = new Date();
                        const [startTime, endTime] = accessData.timeIntervals;
                        const start = startTime ? new Date(startTime) : null;
                        const end = endTime ? new Date(endTime) : null;

                        if (start && end && (currentTime < start || currentTime > end)) {
                            setOpenStatus(false);
                            console.log(openStatus);
                            return;
                        }
                    }
                    fetchSurvey();
                }
            } catch (error) {
                console.error('Ошибка:', error);
                setOpenStatus(false);
            }
        };

        const fetchSurvey = async () => {
            try {
                const response = await sendGetResponseWhenLogged(
                    `http://${IP_ADDRESS}:8080/user/${getEmail()}/survey/${id}`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                const data = await response.json();
                setSurveyData(data);

                if (data.Theme) {
                    document.body.style.backgroundImage = `${data.Theme.url}`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundRepeat = 'no-repeat';
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        checkSurveyAccess();
    }, [id, openStatus]);

    const handleAnswerChange = (questionId: number, question: string, answer: string) => {
        setAnswers(prevAnswers => {
            const newAnswers = { ...prevAnswers };
            if (answer === '') {
                delete newAnswers[questionId];
            } else {
                newAnswers[questionId] = { question, answer };
            }
            return newAnswers;
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await sendChangingResponseWhenLogged(
                'POST',
                `http://${IP_ADDRESS}:8080/user/${getEmail()}/survey/${id}/answer`,
                answers
            );

            if (!response || !response.ok) {
                throw new Error('Ошибка при отправке ответов');
            }

            alert('Ваши ответы успешно отправлены!');
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке ответов. Попробуйте еще раз.');
        }
    };

    const handleClear = () => {
        setAnswers({});
        setReset(true);
        setTimeout(() => setReset(false), 0);
    };

    if (!surveyData) {
        return <div>Загрузка опроса...</div>;
    }

    return (
        <div>
            {!openStatus ? (
                <UnavailableSurvey />
            ) : (
                <>
                    <h1>{surveyData ? surveyData.Name : "Загрузка опроса..."}</h1>
                    {surveyData && surveyData.Survey.map(questionInfo => {
                        const QuestionComponent = ComponentMap[questionInfo.type]?.component;
                        return (
                            <QuestionComponent
                                key={questionInfo.questionId}
                                questionInfo={questionInfo}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                                isRequired={true}
                            />
                        );
                    })}
                    <div>
                        <button className={'send-button'} onClick={handleSubmit}>
                            Отправить
                        </button>
                        <button className={'delete-button'} onClick={handleClear}>
                            Очистить всё
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
