import './Question.css';
import {ComponentMap} from "../../../const/ComponentMap.ts";

interface QuestionProps {
    question: string;
    type: number;
    theme: string;
}

export function Question({ question, type, theme } : QuestionProps) {
    return (
        <div className={`question-container-${theme}`}>
            <h2 className={`question-h3-${theme}`}>{question}</h2>
            <h3 className={`question-type-p-${theme}`}>Тип вопроса: {ComponentMap[type].name}</h3>
        </div>
    );
}
