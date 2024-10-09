import React, { useState } from 'react';
import QuestionTypeModal from '../../components/parts-of-builder-survey/question-type-modal/question-type-modal';
import QuestionInputModal from '../../components/parts-of-builder-survey/question-input-modal/question-input-modal';
import Question from '../../components/parts-of-builder-survey/question/question';
import './custom-builder.css';

interface SurveyQuestion {
    question: string;
    type: string | null;
    options?: string[];
}

const FormBuilderPage: React.FC = () => {
    const [isTypeModalOpen, setTypeModalOpen] = useState<boolean>(false);
    const [isInputModalOpen, setInputModalOpen] = useState<boolean>(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState<string | null>(null);
    const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleSelectQuestionType = (type: string) => {
        setSelectedQuestionType(type);
        setInputModalOpen(true);
        setTypeModalOpen(false);
    };

    const handleSubmitQuestion = (question: string, options?: string[]) => {
        const newQuestion = { question, type: selectedQuestionType, options };

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
            Name: "Преподаватели Радиофака",
            Survey: questions
        };

        try {
            const response = await fetch('http://localhost:8080/user/jenoshima42@despair.com/survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={'builder-survey'}>
            <h1>Конструктор форм</h1>
            <p>Введите название формы:</p>
            <div className="questions-list">
                {questions.map((q, index) => (
                    <div key={index} className="question-item">
                        <Question question={q.question} type={q.type}/>
                        <div className={'arrows'}>
                            <button onClick={() => handleEditQuestion(index)}>
                                <img src="/icons/edit.svg" alt="Редактировать"/>
                            </button>
                            <button onClick={() => handleMoveUp(index)} disabled={index === 0}>
                                <img src="/icons/arrow-up-circle.svg" alt="Переместить вверх"/>
                            </button>
                            <button onClick={() => handleMoveDown(index)} disabled={index === questions.length - 1}>
                                <img src="/icons/arrow-down-circle.svg" alt="Переместить вниз"/>
                            </button>
                            <button onClick={() => handleDeleteQuestion(index)}>
                                <img src="/icons/trash-solid.svg" alt="Удалить"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className={'adder'} onClick={() => setTypeModalOpen(true)}>Добавить вопрос</button>
            <button className={'submit'} onClick={handleSubmit}>Отправить опрос</button>
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
};

export default FormBuilderPage;
