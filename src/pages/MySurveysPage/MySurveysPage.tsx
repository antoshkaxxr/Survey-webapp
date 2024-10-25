import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const/AppRoute.ts";
import './MySurveysPage.css';
import {MySurveyItem} from "../../components/my-surveys-parts/MySurveyItem/MySurveyItem.tsx";

interface Survey {
    id: number;
    survey: string;
}

export function MySurveysPage() {
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
                    surveyId: survey.id,
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
        document.body.style.backgroundImage = '';
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>Мои опросы</h1>
            <Link to={AppRoute.FormBuilder}>
                <button className="create-survey-button">Создать новый опрос</button>
            </Link>
            {surveyData.map((survey, index) => (
                <MySurveyItem
                    key={index}
                    surveyId={survey.surveyId}
                    surveyName={survey.parsedSurvey.Name}
                    setSurveyData={setSurveyData}
                />
            ))}
        </div>
    );
}
