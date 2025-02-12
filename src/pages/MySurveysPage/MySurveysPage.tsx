import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const/AppRoute.ts";
import './MySurveysPage.css';
import { MySurveyItem } from "../../components/my-surveys-parts/MySurveyItem/MySurveyItem.tsx";
import { BACK_ADDRESS } from "../../config.ts";
import { AccessModal } from "../../components/modals/AccessModal/AccessModal.tsx";
import { sendGetResponseWhenLogged, getEmail } from "../../sendResponseWhenLogged.ts";
import { ToastContainer } from 'react-toastify';
import {Helmet} from "react-helmet-async";

interface Survey {
    id: string;
    survey: string;
}

export function MySurveysPage() {
    const [surveyData, setSurveyData] = useState<ParsedSurvey[]>([]);
    const [loading, setLoading] = useState(true);
    const [accessSurveyId, setAccessSurveyId] = useState<string | null>(null);
    const [isAccessModalOpen, setAccessModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await sendGetResponseWhenLogged(
                    `https://${BACK_ADDRESS}/surveys?email=${getEmail()}`);
                if (!response || !response.ok) {
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
        <div className="my-surveys-container">
            <Helmet>
                <title>Мои опросы - 66Бит.Опросы</title>
            </Helmet>
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
                    setAccessModalOpen={setAccessModalOpen}
                    setAccessSurveyId={setAccessSurveyId}
                />
            ))}
            <AccessModal
                isOpen={isAccessModalOpen}
                onClose={() => setAccessModalOpen(false)}
                onConfirm={() => setAccessModalOpen(false)}
                accessSurveyId={accessSurveyId}
            />
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
