import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getEmail, sendGetResponseWhenLogged} from "../../sendResponseWhenLogged.ts";
import {IP_ADDRESS} from "../../config.ts";
import {ComponentMap} from "../../const/ComponentMap.ts";
import {DisplayStatisticsMap} from "../../const/DisplayStatisticsMap.ts";

export function StatisticsPage() {
    const { surveyId} = useParams<{ surveyId: string }>();
    const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
    const [isLoadingStatistic, setLoadingStatistic] = useState<boolean>(false);
    const [currQuestion, setCurrQuestion] = useState<SurveyQuestion | null>(null);
    const [currAnswers, setCurrAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        const downloadDataSurvey = async () => {
            try {
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
    })

    const loadStatistic = async (questionInfo : SurveyQuestion) =>{
        setCurrQuestion(questionInfo);
        setLoadingStatistic(false);
        const downloadDataStatistic = async () => {
            try {
                const response = await sendGetResponseWhenLogged(
                    `http://${IP_ADDRESS}:8080/user/${getEmail()}/survey/${surveyId}/question/${questionInfo.questionId}`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                const data = await response.json();
                setCurrAnswers(data);
                setLoadingStatistic(true);
            } catch (error) {
                alert('Не удалось удалить опрос. Попробуйте снова.');
            }
        };
        downloadDataStatistic();
    }

    return (
        <div>
            {!surveyData && <h3>Загружается...</h3>}
            {surveyData && !currQuestion &&
                <table>
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
                                        className={"button-redirect"}
                                        onClick={() => loadStatistic(questionInfo)}>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            }
            {currQuestion && !isLoadingStatistic && <div>Статистика загружается</div>}
            {currQuestion && isLoadingStatistic &&
                <div>
                    <button onClick={() => setCurrQuestion(null)}></button>
                    {DisplayStatisticsMap[currQuestion.type]({
                            questionName: currQuestion.question,
                            answers: currAnswers
                        })})
                </div>}
        </div>
    );
}
