import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './SurveyPage.scss';
import { ComponentMap } from "../../const/ComponentMap.ts";
import { BACK_ADDRESS } from "../../config.ts";
import { UnavailableSurvey } from "../../components/survey-parts/UnavailableSurvey/UnavailableSurvey.tsx";
import { sendGetResponseWhenLogged, sendChangingResponseWhenLogged } from "../../sendResponseWhenLogged.ts";
import { Header } from "../../components/Header/Header.tsx";
import { ToastContainer, toast } from 'react-toastify';

interface SurveyData {
    Name: string;
    BackgroundImage: Theme | null;
    BackgroundColor: string;
    QuestionColor: string;
    TextColor: string;
    Survey: SurveyQuestion[];
}

export function SurveyPage() {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const isPreview = searchParams.get('preview') === 'true';

    const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
    const [openStatus, setOpenStatus] = useState<boolean>(true);
    const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>(undefined);
    const [messageException, setMessageException] = useState<string>("");
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const checkSurveyAccess = async () => {
            try {
                const response = await sendGetResponseWhenLogged(`http://${BACK_ADDRESS}/survey/${id}/access`);
                if (!response.ok) throw new Error('Ошибка при получении доступа к опросу');

                const accessData = await response.json();
                if (accessData.isAvailable) {
                    fetchSurvey();
                } else {
                    setOpenStatus(false);
                    setMessageException(accessData.isLimited
                        ? `Опрос доступен с ${accessData.startTime.split('T').slice(0, -1)} по ${accessData.endTime.split('T').slice(0, -1)}`
                        : 'Опрос ещё не готов');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                setOpenStatus(false);
            }
        };

        const fetchSurvey = async () => {
            try {
                const response = await sendGetResponseWhenLogged(`http://${BACK_ADDRESS}/survey/${id}`);
                if (!response.ok) throw new Error('Ошибка при получении данных опроса');

                const data = await response.json();
                setSurveyData(data);

                if (data.BackgroundImage) {
                    setBackgroundUrl(data.BackgroundImage.url);
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        checkSurveyAccess();
    }, [id]);

    const handleSubmit = async () => {
        if (!surveyData) {
            toast.warning('Ещё не загрузилось');
            return;
        }

        const missingRequiredAnswers = surveyData.Survey.filter(question =>
            question.isRequired && !answers[question.questionId]
        );

        if (missingRequiredAnswers.length > 0) {
            toast.warning('Заполните все обязательные вопросы');
            return;
        }

        for (const question of surveyData.Survey) {
            if (!answers[question.questionId]) {
                answers[question.questionId] = '';
            }
        }

        let sortedAnswers: { [p: string]: string } = {};
        surveyData.Survey.forEach(question => {
            sortedAnswers[question.questionId] = answers[question.questionId]
        });

        try {
            const response = await sendChangingResponseWhenLogged(
                'POST',
                `http://${BACK_ADDRESS}/survey/${id}/answer`,
                sortedAnswers
            );

            if (!response.ok) throw new Error('Ошибка при отправке ответов');
            toast.success('Ваши ответы успешно отправлены!');

        } catch (error) {
            console.error('Ошибка:', error);
            toast.error('Произошла ошибка при отправке ответов. Попробуйте еще раз.');
        }
    };

    const handleClear = () => setAnswers({});

    return (
        <div>
            <Header />
            <div className={'survey-page-container'} style={{ background: surveyData?.BackgroundColor }}>
                {!openStatus ? (
                    <UnavailableSurvey message={messageException} />
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
                                />
                                <div className={'survey-content'}>
                                    <h1 className={'survey-page-title'}>{surveyData.Name || 'Без названия'}</h1>
                                    {surveyData.Survey.map(questionInfo => {
                                        const QuestionComponent = ComponentMap[questionInfo.type]?.component;
                                        return (
                                            <QuestionComponent
                                                key={questionInfo.questionId}
                                                questionInfo={questionInfo}
                                                answer={answers[questionInfo.questionId] || ''}
                                                setAnswer={value => setAnswers(prev => ({ ...prev, [questionInfo.questionId]: value }))}
                                                backgroundColor={surveyData.BackgroundColor}
                                                questionColor={surveyData.QuestionColor}
                                                textColor={surveyData.TextColor}
                                            />
                                        );
                                    })}
                                    <div className={'survey-page-buttons'}>
                                        <button
                                            className='send-button'
                                            onClick={handleSubmit}
                                            disabled={isPreview}
                                            title={isPreview ? "Кнопка недоступна в режиме предпросмотра" : ""}
                                        >
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
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
                draggable
            />
        </div>
    );
}
