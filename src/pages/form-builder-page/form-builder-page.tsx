import React, { useState } from 'react';
import QuestionTypeModal from '../../components/parts-of-builder-survey/question-type-modal/question-type-modal';
import QuestionInputModal from '../../components/parts-of-builder-survey/question-input-modal/question-input-modal';
import './custom-builder.css';

const FormBuilderPage: React.FC = () => {
    const [isTypeModalOpen, setTypeModalOpen] = useState<boolean>(false);
    const [isInputModalOpen, setInputModalOpen] = useState<boolean>(false);
    const [selectedQuestionType, setSelectedQuestionType] = useState<string | null>(null);

    const handleSelectQuestionType = (type: string) => {
        setSelectedQuestionType(type);
        console.log('Выбранный тип вопроса:', type); // Логика для обработки выбранного вопроса
        setInputModalOpen(true); // Открываем модальное окно для ввода вопроса
        setTypeModalOpen(false); // Закрываем модальное окно выбора типа
    };

    const handleSubmitQuestion = (question: string, options?: string[]) => {
        console.log('Сохранённый вопрос:', question, options);
        // Здесь вы можете добавить логику для сохранения вопроса в survey
    };

    const handleSubmit = async () => {
        const data = {
            Name: "Преподаватели Радиофака",
            Survey: [
                // Ваши вопросы
            ]
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
