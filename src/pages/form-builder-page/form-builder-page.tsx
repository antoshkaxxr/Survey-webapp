import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import QuestionTypeModal from '../../components/parts-of-builder-survey/question-type-modal/question-type-modal';
import QuestionInputModal from '../../components/parts-of-builder-survey/question-input-modal/question-input-modal';
import Question from '../../components/parts-of-builder-survey/question/question';
import './custom-builder.css';
import {AppRoute} from "../../const.ts";

interface SurveyQuestion {
    question: string;
    type: string | null;
    options?: string[];
    questionId: string;
}

interface Theme {
    name: string;
    theme: string;
    url: string;
}

function FormBuilderPage() {
    const { id } = useParams<{ id: string }>(); // Получаем id из параметров маршрута
    const [isTypeModalOpen, setTypeModalOpen] = useState<boolean>(false);
    const [isInputModalOpen, setInputModalOpen] = useState<boolean>(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState<string | null>(null);
    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [formTitle, setFormTitle] = useState<string>('');
    const [backgroundImage, setBackgroundImage] = useState<Theme>(
        { name: 'Стандартная тема', theme: 'default', url: 'url(/images/default.jpg)' }
    );

    const themes = [
        { name: 'Стандартная тема', theme: 'default', url: 'url(/images/default.jpg)' },
        { name: 'Небоскребы', theme: 'theme1', url: 'url(/images/theme1.jpg)' },
        { name: 'Водная гладь', theme: 'theme2', url: 'url(/images/theme2.jpg)' }
    ];

    useEffect(() => {
        if (id) {
            const fetchSurvey = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/user/jenoshima42@despair.com/survey/${id}`);
                    if (!response.ok) {
                        throw new Error('Ошибка при загрузке опроса');
                    }
                    const data = await response.json();
                    setFormTitle(data.Name);
                    setQuestions(data.Survey);
                    setBackgroundImage(data.Theme);
                } catch (error) {
                    console.error('Ошибка:', error);
                }
            };

            fetchSurvey();
        }
    }, [id]);

    const handleSelectTheme = (theme: Theme) => {
        setBackgroundImage(theme);
    };

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

    const handleEditQuestion = (index: number) => {
        setEditIndex(index);
        setSelectedQuestionType(questions[index].type);
        setInputModalOpen(true);
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newQuestions = [...questions];
        [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
        setQuestions(newQuestions);
    };

    const handleMoveDown = (index: number) => {
        if (index === questions.length - 1) return;
        const newQuestions = [...questions];
        [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
        setQuestions(newQuestions);
    };

    const handleDeleteQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        const data = {
            Name: formTitle,
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
            <h1>Конструктор форм</h1>
            <div className="form-title-container">
                <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Название формы"
                    className="form-title-input"
                />
            </div>
            <div className="theme-selector">
                {themes.map(theme => (
                    <button
                        key={theme.name}
                        onClick={() => handleSelectTheme(theme)}
                        className={backgroundImage.name === theme.name ? 'active' : ''}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
            <div className="questions-list" style={{ backgroundImage: backgroundImage.url, backgroundSize: 'cover' }}>
                {questions.length === 0 &&
                    <div key={'question-item-0'} className="question-item">
                        <Question
                            question={'Добавьте Ваш первый вопрос'}
                            type={'на выбор из списка'}
                            theme={backgroundImage.theme}
                        />
                    </div>
                }
                {questions.length > 0 && questions.map((q, index) => (
                    <div key={index} className="question-item">
                        <Question
                            question={q.question}
                            type={q.type}
                            theme={backgroundImage.theme}
                        />
                        <div className={'arrows'}>
                            <button onClick={() => handleEditQuestion(index)}>
                                <img src="/icons/edit.svg" alt="Редактировать" />
                            </button>
                            <button onClick={() => handleMoveUp(index)} disabled={index === 0}>
                                <img src="/icons/arrow-up-circle.svg" alt="Переместить вверх" />
                            </button>
                            <button onClick={() => handleMoveDown(index)} disabled={index === questions.length - 1}>
                                <img src="/icons/arrow-down-circle.svg" alt="Переместить вниз" />
                            </button>
                            <button onClick={() => handleDeleteQuestion(index)}>
                                <img src="/icons/trash-solid.svg" alt="Удалить" />
                            </button>
                        </div>
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

export default FormBuilderPage;
