import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SurveyPage.scss';
import { ComponentMap } from "../../const/ComponentMap.ts";
import { IP_ADDRESS } from "../../config.ts";
import {UnavailableSurvey} from "../../components/survey-parts/UnavailableSurvey/UnavailableSurvey.tsx";
import {sendGetResponseWhenLogged, sendChangingResponseWhenLogged, getEmail} from "../../sendResponseWhenLogged.ts";
import {getImage} from "../../sendResponseWhenLogged.ts";

interface SurveyData {
    Name: string;
    BackgroundImage: Theme | null;
    BackgroundColor: string;
    QuestionColor: string;
    TextColor: string;
    Survey: Question[];
}

export function SurveyPage() {
    const { id } = useParams<{ id: string }>();
    const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
    const [openStatus, setOpenStatus] = useState<boolean>(true);
    const [answers, setAnswers] = useState<{ [key: number]: { question: string; answer: string } }>({});
    const [reset, setReset] = useState(false);
    const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        const checkSurveyAccess = async () => {
            try {
                const response = await sendGetResponseWhenLogged(`http://${IP_ADDRESS}:8080/survey/${id}/access`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении доступа к опросу');
                }

                const accessData = await response.json();
                console.log(accessData);
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

                console.log(data);

                if (data.BackgroundImage) {
                    const imageUrl = await getImage(data.BackgroundImage.name);
                    setBackgroundUrl(imageUrl);
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

    return (
        <div className={'survey-page-container'} style={{background: surveyData ? surveyData.BackgroundColor : undefined}}>
            {!openStatus ? (
                <UnavailableSurvey />
            ) : (
                <>
                    {surveyData && (
                        <>
                            <div
                                className='header-img'
                                style={{
                                    backgroundImage: surveyData.BackgroundImage ? `url(${backgroundUrl})` : undefined,
                                    backgroundSize: 'cover',
                                    height: surveyData.BackgroundImage ? 200 : 0,
                                }}
                            >
                            </div>
                            <div className={'survey-content'}>
                                <h1 className={'survey-page-title'}>{surveyData.Name}</h1>
                                {surveyData.Survey.map((questionInfo) => {
                                    const QuestionComponent = ComponentMap[questionInfo.type]?.component;
                                    return (
                                        <QuestionComponent
                                            key={questionInfo.questionId}
                                            questionInfo={questionInfo}
                                            onAnswerChange={handleAnswerChange}
                                            reset={reset}
                                            isRequired={true}
                                            backgroundColor={surveyData.BackgroundColor}
                                            questionColor={surveyData.QuestionColor}
                                            textColor={surveyData.TextColor}
                                        />
                                    );
                                })}
                                <div className={'survey-page-buttons'}>
                                    <button className='send-button' onClick={handleSubmit}>
                                        Отправить
                                    </button>
                                    <button className='delete-button' onClick={handleClear}>
                                        Очистить всё
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
