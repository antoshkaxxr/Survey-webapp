import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import QuestionTypeModal from '../../components/parts-of-builder-survey/question-type-modal/question-type-modal';
import QuestionInputModal from '../../components/parts-of-builder-survey/question-input-modal/question-input-modal';
import Question from '../../components/parts-of-builder-survey/question/question';
import './custom-builder.css';
import {AppRoute} from "../../const.ts";
import SurveyTitle from "../../components/parts-of-builder-survey/survey-title/survey-title.tsx";
import ThemeSelector from "../../components/parts-of-builder-survey/theme-selector/theme-selector.tsx";
import EmptyQuestionItem from "../../components/parts-of-builder-survey/empty-question-item/empty-question-item.tsx";
import QuestionButtons from "../../components/parts-of-builder-survey/question-buttons/question-buttons.tsx";

function SurveyBuilderPage() {
    const { id } = useParams<{ id: string }>();
    const [isTypeModalOpen, setTypeModalOpen] = useState<boolean>(false);
    const [isInputModalOpen, setInputModalOpen] = useState<boolean>(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState<string | null>(null);
    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [surveyTitle, setSurveyTitle] = useState<string>('');
    const [backgroundImage, setBackgroundImage] = useState<Theme>(
        { name: 'Стандартная тема', theme: 'default', url: 'url(/images/default.jpg)' }
    );

    useEffect(() => {
        if (id) {
            const fetchSurvey = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/user/jenoshima42@despair.com/survey/${id}`);
                    if (!response.ok) {
                        throw new Error('Ошибка при загрузке опроса');
                    }
                    const data = await response.json();
                    setSurveyTitle(data.Name);
                    setQuestions(data.Survey);
                    setBackgroundImage(data.Theme);
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            };

            fetchSurvey();
        }
    }, [id]);

    const handleSelectQuestionType = (type: string) => {
        setSelectedQuestionType(type);
        setInputModalOpen(true);
        setTypeModalOpen(false);
    };

    const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substring(2, 9);
    };

    const handleSubmitQuestion = (question: string, options?: string[]) => {
        const newQuestion = {
            question,
            type: selectedQuestionType,
            options,
            questionId: generateUniqueId()
        };

        if (editIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[editIndex] = newQuestion;
            setQuestions(updatedQuestions);
            setEditIndex(null);
        } else {
            setQuestions([...questions, newQuestion]);
        }

        setInputModalOpen(false);
        setSelectedQuestionType(null);
    };

    const handleSubmit = async () => {
        const data = {
            Name: surveyTitle,
            Theme: backgroundImage,
            Survey: questions
        };

        try {
            let response;
            if (id) {
                response = await fetch(`http://localhost:8080/survey/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch('http://localhost:8080/user/jenoshima42@despair.com/survey', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={'builder-survey'}>
            <h1>Конструктор опросов</h1>
            <SurveyTitle surveyTitle={surveyTitle} setSurveyTitle={setSurveyTitle} />
            <ThemeSelector backgroundImage={backgroundImage} setBackgroundImage={setBackgroundImage} />
            <div className="questions-list" style={{ backgroundImage: backgroundImage.url, backgroundSize: 'cover' }}>
                {questions.length === 0 &&
                    <EmptyQuestionItem theme={backgroundImage.theme} />
                }
                {questions.length > 0 && questions.map((q, index) => (
                    <div key={index} className="question-item">
                        <Question
                            question={q.question}
                            type={q.type}
                            theme={backgroundImage.theme}
                        />
                        <QuestionButtons
                            index={index} setEditIndex={setEditIndex}
                            setSelectedQuestionType={setSelectedQuestionType}
                            questions={questions}
                            setInputModalOpen={setInputModalOpen}
                            setQuestions={setQuestions}
                        />
                    </div>
                ))}
            </div>
            <button className={'add-question-button'} onClick={() => setTypeModalOpen(true)}>Добавить вопрос</button>
            <Link to={AppRoute.MySurveys}>
                <button className={'save-survey-button'} onClick={handleSubmit}>Сохранить опрос</button>
            </Link>
            <QuestionTypeModal
                isOpen={isTypeModalOpen}
                onClose={() => setTypeModalOpen(false)}
                onSelect={handleSelectQuestionType}
            />
            <QuestionInputModal
                isOpen={isInputModalOpen}
                onClose={() => {
                    setInputModalOpen(false);
                    setEditIndex(null);
                }}
                questionType={selectedQuestionType}
                onSubmit={handleSubmitQuestion}
                initialQuestion={editIndex !== null ? questions[editIndex].question : ""}
                initialOptions={editIndex !== null && questions[editIndex].options ? questions[editIndex].options : []}
            />
        </div>
    );
}

export default SurveyBuilderPage;
