import './question.css';

interface QuestionProps {
    question: string;
    type: string | null;
    theme: string;
}

export default function Question({ question, type, theme } : QuestionProps) {
    return (
        <div className={`question-container-${theme}`}>
            <h2 className={`question-h3-${theme}`}>{question}</h2>
            <h3 className={`question-type-p-${theme}`}>Тип вопроса: {type}</h3>
        </div>
    );
}
