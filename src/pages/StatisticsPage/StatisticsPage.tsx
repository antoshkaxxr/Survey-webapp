import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {sendGetResponseWhenLogged, getEmail, deleteAllCookies} from "../../sendResponseWhenLogged.ts";
import {IP_ADDRESS} from "../../config.ts";
import {ComponentMap} from "../../const/ComponentMap.ts";
import {BaseStatistic} from "../../components/display-statistics/BaseStatics/BaseStatistic.tsx";
import {AppRoute} from "../../const/AppRoute.ts";
import "./StatisticsPage.css"

interface DisplayStatisticsPropsResponse {
    questionId: string;
    question: string;
    answers: StatisticVariant[];
}

interface SurveyData {
    Name: string;
    Theme: {
        name: string;
        theme: string;
        url: string;
    }
    Survey: SurveyQuestion[];
}

export function StatisticsPage() {
    const {surveyId} = useParams<{ surveyId: string }>();
    const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
    const [isLoadingStatistic, setLoadingStatistic] = useState<boolean>(false);
    const [currQuestion, setCurrQuestion] = useState<SurveyQuestion | null>(null);
    const [propsDisplayStatisticsByIdQuestion, setPropsDisplayStatisticsByIdQuestion] = useState<Record<string, DisplayStatisticsProps>>({});

    useEffect(() => {
        const downloadDataSurvey = async () => {
            try {
                if (surveyData !== null)
                    return;
                const response = await sendGetResponseWhenLogged(
                    `http://${IP_ADDRESS}:8080/survey/${surveyId}`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                const data = await response.json();
                setSurveyData(data);
            } catch (error) {
                alert('Не удалось удалить опрос. Попробуйте снова.');
            }
        };
        downloadDataSurvey();
        setLoadingStatistic(false);
        const downloadDataStatistic = async () => {
            try {
                const response = await sendGetResponseWhenLogged(
                    `http://${IP_ADDRESS}:8080/survey/${surveyId}/statistic`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                const data = await response.json();
                let propsDict = data.reduce((acc: any, item: DisplayStatisticsPropsResponse) => {
                    const {questionId, question, answers} = item as DisplayStatisticsPropsResponse;
                    acc[questionId] = {
                        "question": question,
                        "answers": answers
                    };
                    return acc;
                }, {});
                setPropsDisplayStatisticsByIdQuestion(propsDict);
                setLoadingStatistic(true);
            } catch (error) {
                alert('Не удалось удалить опрос. Попробуйте снова.');
            }
        };
        downloadDataStatistic();
    }, [surveyId, surveyData])

    const loadStatistic = async (questionInfo: SurveyQuestion) => {
        setCurrQuestion(questionInfo);
    }

    const email = getEmail();

    return (
        <div>
            {!surveyData && <h3>Загружается...</h3>}
            {surveyData && !currQuestion &&
                <div>
                    <div className={'statistics-menu-container'}>
                        {
                            email !== null &&
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                width: "100%"
                            }}>
                                <div style={{display: "flex", marginRight: "20px"}}>
                                    <Link to={AppRoute.Root}>
                                        <button className="WelcomeTransparent-btn">Home</button>
                                    </Link>
                                    <Link to={AppRoute.MySurveys}>
                                        <button className="WelcomeTransparent-btn">My Surveys</button>
                                    </Link>
                                    <Link to={AppRoute.Login}>
                                        <button className="WelcomeTransparent-btn" onClick={deleteAllCookies}>Logout
                                        </button>
                                    </Link>
                                </div>
                                <h1>{email}</h1>
                            </div>
                        }
                    </div>
                    <div className="table-container">
                        <table className="survey-table">
                            <thead>
                            <tr>
                                <th style={{borderRadius: '10px 0 0 0'}}>Имя вопроса</th>
                                <th>Тип вопроса</th>
                                <th style={{borderRadius: '0 10px 0 0'}}>Кнопка</th>
                            </tr>
                            </thead>
                            <tbody>
                            {surveyData.Survey.map(questionInfo => {
                                const questionType = ComponentMap[questionInfo.type]?.name || "";
                                const questionName = questionInfo.question;
                                return (
                                    <tr key={questionInfo.questionId}>
                                        <td>{questionName}</td>
                                        <td>{questionType}</td>
                                        <td>
                                            <button
                                                className="blue-button"
                                                onClick={() => loadStatistic(questionInfo)}
                                            >
                                                Статистика
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {currQuestion && !isLoadingStatistic && <div>Статистика загружается</div>}
            {currQuestion && isLoadingStatistic &&
                <div>
                    <BaseStatistic
                        questionInfo={currQuestion}
                        answers={propsDisplayStatisticsByIdQuestion[currQuestion.questionId].answers}
                        onClose={() => {
                            setCurrQuestion(null)
                        }}>
                    </BaseStatistic>
                </div>}
        </div>
    );
}
