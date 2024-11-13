import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getEmail, sendGetResponseWhenLogged} from "../../sendResponseWhenLogged.ts";
import {IP_ADDRESS} from "../../config.ts";
import {ComponentMap} from "../../const/ComponentMap.ts";
import {BaseStatistic} from "../../components/display-statistics/BaseStatics/BaseStatistic.tsx";
import "./StatisticsPage.css"

interface DisplayStatisticsPropsResponse{
    questionId: string;
    question: string;
    answers: StatisticVariant[];
}
export function StatisticsPage() {
    const { surveyId} = useParams<{ surveyId: string }>();
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
                    `http://${IP_ADDRESS}:8080/user/${getEmail()}/survey/${surveyId}`);
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
                    `http://${IP_ADDRESS}:8080/user/${getEmail()}/survey-statistic/${surveyId}`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                const data = await response.json();
                let propsDict = data.reduce((acc : any, item : DisplayStatisticsPropsResponse) => {
                    const { questionId, question, answers } = item as DisplayStatisticsPropsResponse;
                    const propsDisplayStatistics : DisplayStatisticsProps = {
                        "question": question,
                        "answers": answers
                    }
                    acc[questionId] = propsDisplayStatistics;
                    return acc;
                }, {});
                setPropsDisplayStatisticsByIdQuestion(propsDict);
                setLoadingStatistic(true);
            } catch (error) {
                alert('Не удалось удалить опрос. Попробуйте снова.');
            }
        };
        downloadDataStatistic();
    }, [surveyId, surveyData] )

    const loadStatistic = async (questionInfo : SurveyQuestion) =>{
        setCurrQuestion(questionInfo);
    }

    return (
        <div>
            {!surveyData && <h3>Загружается...</h3>}
            {surveyData && !currQuestion &&
                <div className="table-container">
                    <table className="survey-table">
                        <thead>
                        <tr>
                            <th>Имя вопроса</th>
                            <th>Тип вопроса</th>
                            <th>Кнопка</th>
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
