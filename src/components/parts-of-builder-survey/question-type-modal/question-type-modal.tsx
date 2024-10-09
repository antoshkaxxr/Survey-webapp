import React from 'react';
import './modal.css';

interface QuestionTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: string) => void;
}

const QuestionTypeModal: React.FC<QuestionTypeModalProps> = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    const questionTypes = [
        "single-choice-question",
        "multiple-choice-question",
        "text-question",
        "number-question",
        "yes-no-question",
        "date-question",
        "url-question",
        "file-question",
        "select-question",
        "slider-question"
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Выберите тип вопроса</h2>
                <ul>
                    {questionTypes.map((type) => (
                        <li key={type} onClick={() => { onSelect(type); onClose(); }}>
                            {type.replace(/-/g, ' ')}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default QuestionTypeModal;
