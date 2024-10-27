import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {QuestionTypeModal} from '../../components/survey-builder-parts/QuestionTypeModal/QuestionTypeModal.tsx';
import {QuestionInputModal} from '../../components/survey-builder-parts/QuestionInputModal/QuestionInputModal.tsx';
import {Question} from '../../components/survey-builder-parts/Question/Question.tsx';
import './SurveyBuilderPage.css';
import {AppRoute} from "../../const/AppRoute.ts";
import {SurveyTitle} from "../../components/survey-builder-parts/SurveyTitle/SurveyTitle.tsx";
import {ThemeSelector} from "../../components/survey-builder-parts/ThemeSelector/ThemeSelector.tsx";
import {EmptyQuestionItem} from "../../components/survey-builder-parts/EmptyQuestionItem/EmptyQuestionItem.tsx";
import {QuestionButtons} from "../../components/survey-builder-parts/QuestionButtons/QuestionButtons.tsx";
import {ColorPanel} from '../../components/survey-builder-parts/ColorPanel/ColorPanel.tsx';
import {IP_ADDRESS} from "../../config.ts";

export function SurveyBuilderPage() {
    const { id } = useParams<{ id: string }>();
    const [isTypeModalOpen, setTypeModalOpen] = useState<boolean>(false);
    const [isInputModalOpen, setInputModalOpen] = useState<boolean>(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState<number>(0);
    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [surveyTitle, setSurveyTitle] = useState<string>('');
    const [backgroundImage, setBackgroundImage] = useState<Theme>(
        { name: 'Стандартная тема', theme: 'default', url: 'url(/images/default.jpg)' }
    );
    const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');

    useEffect(() => {
        if (id) {
            const fetchSurvey = async () => {
                try {
                    const response = await fetch(`http://${IP_ADDRESS}:8080/user/jenoshima42@despair.com/survey/${id}`);
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

    const handleSelectQuestionType = (type: number) => {
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
        setSelectedQuestionType(0);
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
                response = await fetch(`http://${IP_ADDRESS}:8080/survey/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch(`http://${IP_ADDRESS}:8080/user/jenoshima42@despair.com/survey`, {
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

            <ColorPanel selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>

            
            {/* <ThemeSelector backgroundImage={backgroundImage} setBackgroundImage={setBackgroundImage} /> */}
            <div  className="questions-list" style={{ backgroundColor: selectedColor, backgroundSize: 'cover' }}>
            <SurveyTitle surveyTitle={surveyTitle} setSurveyTitle={setSurveyTitle} />
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
