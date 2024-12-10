import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {sendGetResponseWhenLogged} from "../../sendResponseWhenLogged.ts";
import {BACK_ADDRESS} from "../../config.ts";
import {ComponentMap} from "../../const/ComponentMap.ts";
import {BaseStatistic} from "../../components/display-statistics/BaseStatistics/BaseStatistic.tsx";
import Swal from 'sweetalert2';
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
    const [propsDisplayStatisticsByIdQuestion, setPropsDisplayStatisticsByIdQuestion] = useState<Record<string, DisplayStatisticsProps>>({});
    const [questionIdForViewStatistic, setQuestionIdForViewStatistic] = useState<string[]>(new Array<string>());

    const handleOpenStatisticQuestion = (id : string ) => {
        setQuestionIdForViewStatistic([...questionIdForViewStatistic, id]);
    };
    const handleCloseStatisticQuestion = (idToRemove : string) => {
        setQuestionIdForViewStatistic(questionIdForViewStatistic.filter((id) => id !== idToRemove));
    };


    useEffect(() => {
        const downloadDataSurvey = async () => {
            try {
                if (surveyData !== null)
                    return;
                const response = await sendGetResponseWhenLogged(
                    `http://${BACK_ADDRESS}/survey/${surveyId}`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                const data = await response.json();
                setSurveyData(data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка!',
                    text: 'Не удалось получить данные опроса. Попробуйте снова.',
                });
            }
        };
        downloadDataSurvey();
        setLoadingStatistic(false);
        const downloadDataStatistic = async () => {
            try {
                const response = await sendGetResponseWhenLogged(
                    `http://${BACK_ADDRESS}/survey/${surveyId}/statistic`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                const data = await response.json();
                console.log(data);
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
                Swal.fire({
                    icon: 'error',
                    title: 'Ошибка!',
                    text: 'Не удалось получить данные статистики. Попробуйте снова.',
                });
            }
        };
        downloadDataStatistic();
    }, [surveyId, surveyData])


    return (
        <div className="page-statistic">
            <h1>{surveyData === null ? "" : surveyData.Name}</h1>
            {!surveyData && <h3>Загружается...</h3>}
            {surveyData &&
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
                                <>
                                    <tr key={questionInfo.questionId}>
                                        <td className="fixed-width-cell">{questionName}</td>
                                        <td className="fixed-width-cell">{questionType}</td>
                                        <td>
                                            <button
                                                className="blue-button"
                                                onClick={() => handleOpenStatisticQuestion(questionInfo.questionId)}
                                            >
                                                Статистика
                                            </button>
                                        </td>
                                    </tr>
                                    {!isLoadingStatistic && questionIdForViewStatistic.includes(questionInfo.questionId) &&
                                        <tr key={questionInfo.questionId + "_statistic"}>
                                            <td>Статистика загружается</td>
                                        </tr>
                                    }
                                    {isLoadingStatistic && questionIdForViewStatistic.includes(questionInfo.questionId) &&
                                        <tr key={questionInfo.questionId + "_statistic"} className="fall-in">
                                            <td colSpan={3}>
                                                <BaseStatistic
                                                    questionInfo={questionInfo}
                                                    answers={propsDisplayStatisticsByIdQuestion[questionInfo.questionId].answers}
                                                    onClose={() => {
                                                        handleCloseStatisticQuestion(questionInfo.questionId);
                                                    }}>
                                                </BaseStatistic>
                                            </td>
                                        </tr>
                                    }
                                </>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
