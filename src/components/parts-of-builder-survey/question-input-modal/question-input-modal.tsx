import React, { useEffect, useState } from 'react';
import '../modal.css';

interface QuestionInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    questionType: string | null;
    onSubmit: (question: string, options?: string[]) => void;
}

const QuestionInputModal: React.FC<QuestionInputModalProps> = ({ isOpen, onClose, questionType, onSubmit }) => {
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<string>('');

    useEffect(() => {
        if (isOpen) {
            setQuestion('');
            setOptions('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        const optionsArray = options.split(',').map(opt => opt.trim()).filter(opt => opt !== '');
        onSubmit(question, questionType?.includes('choice') ? optionsArray : undefined);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Введите вопрос</h2>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Вопрос"
                />
                {questionType?.includes('choice') && (
                    <>
                        <h3>Введите варианты ответов (через запятую):</h3>
                        <input
                            type="text"
                            value={options}
                            onChange={(e) => setOptions(e.target.value)}
                            placeholder="Варианты ответов"
                        />
                    </>
                )}
                <button onClick={handleSubmit}>Сохранить вопрос</button>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default QuestionInputModal;
