import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SurveyPage.scss';
import { ComponentMap } from "../../const/ComponentMap.ts";
import { IP_ADDRESS } from "../../config.ts";
import {UnavailableSurvey} from "../../components/survey-parts/UnavailableSurvey/UnavailableSurvey.tsx";
import {sendGetResponseWhenLogged, sendChangingResponseWhenLogged} from "../../sendResponseWhenLogged.ts";
import {getImage, deleteAllCookies} from "../../sendResponseWhenLogged.ts";
import { AppRoute } from "../../const/AppRoute.ts";

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
    const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
    const [openStatus, setOpenStatus] = useState<boolean>(true);
    const [answers, setAnswers] = useState<{ [key: string]: { question: string; answer: string } }>({});
    const [reset, setReset] = useState(false);
    const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>(undefined);

    const [messageException, setMessageException] = useState<string>("");

    useEffect(() => {
        const checkSurveyAccess = async () => {
            try {
                const response = await sendGetResponseWhenLogged(`http://${IP_ADDRESS}:8080/survey/${id}/access`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении доступа к опросу');
                }

                const accessData = await response.json();
                console.log(accessData);
                if (accessData.isAvailable)
                    fetchSurvey();
                else {
                    setOpenStatus(false);
                    if (accessData.isLimited)
                        setMessageException(`Опрос доступен с ${accessData.startTime.split('T').slice(0, -1)} по ${accessData.endTime.split('T').slice(0, -1)}`)
                    else
                        setMessageException(`Опрос ещё не готов`)
                }

            } catch (error) {
                console.error('Ошибка:', error);
                setOpenStatus(false);
            }
        };

        const fetchSurvey = async () => {
            try {
                const response = await sendGetResponseWhenLogged(
                    `http://${IP_ADDRESS}:8080/survey/${id}`);
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

    const handleAnswerChange = (questionId: string, question: string, answer: string) => {
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
            if (surveyData === null){
                window.alert("ещё не загрузилось")
                return;
            }
            const canSubmit = surveyData?.Survey.every((x: SurveyQuestion) => {
                return !x.necessarily || (x.necessarily && answers[x.questionId] !== undefined);
            });
            if (!canSubmit){
                window.alert("Заполните все обязательные вопросы")
                return;
            }
            const response = await sendChangingResponseWhenLogged(
                'POST',
                `http://${IP_ADDRESS}:8080/survey/${id}/answer`,
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

    const email = getEmail()

    return (
        <div>
            <div className={'builder-menu-container'}>
                {
                    email !== null &&
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                        <div style={{ display: "flex", marginRight: "20px" }}>
                            <Link to={AppRoute.Root}>
                                <button className="WelcomeTransparent-btn">Home</button>
                            </Link>
                            <Link to={AppRoute.MySurveys}>
                                <button className="WelcomeTransparent-btn">My Surveys</button>
                            </Link>
                            <Link to={AppRoute.Login}>
                                <button className="WelcomeTransparent-btn" onClick={deleteAllCookies}>Logout</button>
                            </Link>
                        </div>
                        <h1>{email}</h1>
                    </div>
                }
            </div>
        <div className={'survey-page-container'} style={{background: surveyData ? surveyData.BackgroundColor : undefined}}>
            {!openStatus ? (
                <UnavailableSurvey
                    message = {messageException}
                />
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
                                        <div>
                                            {questionInfo.necessarily && <div className={"warning-block"}>*</div>}
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

                                        </div>
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
        </div>
    );
}
