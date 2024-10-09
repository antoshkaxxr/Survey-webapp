import React, { useState } from 'react';
import QuestionTypeModal from '../../components/parts-of-builder-survey/question-type-modal/question-type-modal';
import './custom-builder.css';

const FormBuilderPage: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [_, setSelectedQuestionType] = useState<string | null>(null);

    const handleSelectQuestionType = (type: string) => {
        setSelectedQuestionType(type);
        console.log('Выбранный тип вопроса:', type); // Логика для обработки выбранного вопроса
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
            <button className={'adder'} onClick={() => setModalOpen(true)}></button>
            <button className={'submit'} onClick={handleSubmit}>Отправить опрос</button>
            <QuestionTypeModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSelect={handleSelectQuestionType}
            />
        </div>
    );
};

export default FormBuilderPage;
