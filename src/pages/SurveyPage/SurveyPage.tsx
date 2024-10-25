import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SurveyPage.scss';
import {ComponentMap} from "../../const/ComponentMap.ts";

interface SurveyData {
    Name: string;
    Theme: {
        name: string;
        theme: string;
        url: string;
    }
    Survey: Question[];
}

export function SurveyPage() {
    const { id } = useParams<{ id: string }>();
    const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
    const [answers, setAnswers] = useState<{ [key: number]: { question: string; answer: string } }>({});
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/jenoshima42@despair.com/survey/${id}`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных опроса');
                }
                const data = await response.json();
                setSurveyData(data);

                if (data.Theme) {
                    document.body.style.backgroundImage = `${data.Theme.url}`;
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundRepeat = 'no-repeat';
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchSurvey();
    }, [id]);

    const handleAnswerChange = (questionId: number, question: string, answer: string) => {
        setAnswers(prevAnswers => {
            const newAnswers = { ...prevAnswers };

            if (answer === '') {
                delete newAnswers[questionId];
            } else {
                newAnswers[questionId] = {
                    question: question,
                    answer: answer
                };
            }

            return newAnswers;
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/jenoshima42@despair.com/survey/${id}/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });

            if (!response.ok) {
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

    if (!surveyData) {
        return <div>Загрузка опроса...</div>;
    }

    return (
        <div>
            <h1>{surveyData.Name}</h1>
            {surveyData.Survey.map(questionInfo => {
                const QuestionComponent = ComponentMap[questionInfo.type];
                return (
                    <QuestionComponent
                        key={questionInfo.questionId}
                        questionInfo={questionInfo}
                        onAnswerChange={handleAnswerChange}
                        reset={reset}
                    />
                );
            })}
            <div>
                <button className={'send-button'} onClick={handleSubmit}>
                    Отправить
                </button>
                <button className={'delete-button'} onClick={handleClear}>
                    Очистить всё
                </button>
            </div>
        </div>
    );
}
