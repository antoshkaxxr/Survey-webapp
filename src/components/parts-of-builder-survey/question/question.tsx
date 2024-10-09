import React from 'react';
import './question.css';

interface QuestionProps {
    question: string;
    type: string | null;
}

const Question: React.FC<QuestionProps> = ({ question, type }) => {
    return (
        <div className="question-container">
            <h3>{question}</h3>
            <p>Тип вопроса: {type?.replace(/-/g, ' ')}</p>
        </div>
    );
};

export default Question;
