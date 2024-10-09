import { useEffect, useState } from "react";
import './custom-my-surveys.css'

interface Question {
    type: string;
    questionId: number;
    question: string;
    options?: string[];
    min?: number;
    max?: number;
}

interface Survey {
    Name: string;
    Survey: Question[];
}

function MySurveysPage() {
    const [surveyData, setSurveyData] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/jenoshima42@despair.com/surveys`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                let data = await response.json();
                data = data.map((x: string) => JSON.parse(x));
                setSurveyData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveys();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>Мои опросы</h1>
            {surveyData.map((survey, index) => (
                <div className={'survey-container'} key={index}>
                    <h3>{survey.Name}</h3>
                </div>
            ))}
        </div>
    );
}

export default MySurveysPage;
