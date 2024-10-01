import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleChoiceQuestion from "../../components/questions/single-choice-question/single-choice-question.tsx";
import MultipleChoiceQuestion from "../../components/questions/multiple-choice-question/multiple-choice-question.tsx";
import TextQuestion from "../../components/questions/text-question/text-question.tsx";
import NumberQuestion from "../../components/questions/number-question/number-question.tsx";
import YesNoQuestion from "../../components/questions/yes-no-question/yes-no-question.tsx";
import DateQuestion from "../../components/questions/date-question/date-question.tsx";
import UrlQuestion from "../../components/questions/url-question/url-question.tsx";
import FileQuestion from "../../components/questions/file-question/file-question.tsx";
import SelectQuestion from "../../components/questions/select-question/select-question.tsx";
import SliderQuestion from "../../components/questions/slider-question/slider-question.tsx";
import './custom-servey.scss';

interface Question {
    type: string;
    questionId: number;
    question: string;
    options?: string[];
    min?: number;
    max?: number;
}

interface SurveyData {
    Name: string;
    Survey: Question[];
}

function SurveyPage() {
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

            const result = await response.json();
            console.log('Ответы успешно отправлены:', result);
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
            {surveyData.Survey.map(question => {
                switch (question.type) {
                    case 'single-choice-question':
                        return (
                            <SingleChoiceQuestion
                                key={question.questionId}
                                question={question.question}
                                options={question.options || []}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    case 'multiple-choice-question':
                        return (
                            <MultipleChoiceQuestion
                                key={question.questionId}
                                question={question.question}
                                options={question.options || []}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    case 'text-question':
                        return (
                            <TextQuestion
                                key={question.questionId}
                                question={question.question}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    case 'number-question':
                        return (
                            <NumberQuestion
                                key={question.questionId}
                                question={question.question}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    case 'yes-no-question':
                        return (
                            <YesNoQuestion
                                key={question.questionId}
                                question={question.question}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    case 'date-question':
                        return (
                            <DateQuestion
                                key={question.questionId}
                                question={question.question}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    case 'url-question':
                        return (
                            <UrlQuestion
                                key={question.questionId}
                                question={question.question}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    case 'file-question':
                        return (
                            <FileQuestion
                                key={question.questionId}
                                question={question.question}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    case 'select-question':
                        return (
                            <SelectQuestion
                                key={question.questionId}
                                question={question.question}
                                options={question.options || []}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    case 'slider-question':
                        return (
                            <SliderQuestion
                                key={question.questionId}
                                question={question.question}
                                min={question.min || 1}
                                max={question.max || 10}
                                questionId={question.questionId}
                                onAnswerChange={handleAnswerChange}
                                reset={reset}
                            />
                        );
                    default:
                        return <div key={question.questionId}>Неизвестный тип вопроса</div>;
                }
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

export default SurveyPage;
