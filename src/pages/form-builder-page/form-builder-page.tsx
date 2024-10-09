import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

    const handleSelectQuestionType = (type: string) => {
        setSelectedQuestionType(type);
        setInputModalOpen(true);
        setTypeModalOpen(false);
    };

    const handleSubmitQuestion = (question: string, options?: string[]) => {
        const newQuestion = { question, type: selectedQuestionType, options };
        setQuestions([...questions, newQuestion]);
        console.log('Сохранённый вопрос:', newQuestion);
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

    // Функция для обработки перетаскивания
    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const updatedQuestions = Array.from(questions);
        const [movedQuestion] = updatedQuestions.splice(result.source.index, 1);
        updatedQuestions.splice(result.destination.index, 0, movedQuestion);

        setQuestions(updatedQuestions);
    };

    return (
        <div className={'builder-survey'}>
            <h1>Конструктор форм</h1>
            <p>Введите название формы:</p>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="questionsList">
                    {(provided) => (
                        <div
                            className="questions-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {questions.map((q, index) => (
                                <Draggable key={index} draggableId={`question-${index}`} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Question question={q.question} type={q.type} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder} {/* Это нужно для корректного расчета высоты списка */}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button className={'adder'} onClick={() => setTypeModalOpen(true)}>Добавить вопрос</button>
            <button className={'submit'} onClick={handleSubmit}>Отправить опрос</button>
            <QuestionTypeModal
                isOpen={isTypeModalOpen}
                onClose={() => setTypeModalOpen(false)}
                onSelect={handleSelectQuestionType}
            />
            <QuestionInputModal
                isOpen={isInputModalOpen}
                onClose={() => setInputModalOpen(false)}
                questionType={selectedQuestionType}
                onSubmit={handleSubmitQuestion}
            />
        </div>
    );
};

export default FormBuilderPage;
