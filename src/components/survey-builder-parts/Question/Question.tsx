import './Question.css';
import { ComponentMap } from "../../../const/ComponentMap.ts";

interface QuestionProps {
    question: string;
    type: number;
    textColor: string;
}

export function Question({ question, type, textColor }: QuestionProps) {
    return (
        <div>
            <h2 className={`question-h3`} style={{ color: textColor }}>
                {question}
            </h2>
            <h3 className={`question-type-p`} style={{ color: textColor }}>
                Тип вопроса: {ComponentMap[type].name}
            </h3>
        </div>
    );
}