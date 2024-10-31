import './Question.css';
import { ComponentMap } from "../../../const/ComponentMap.ts";

interface QuestionProps {
    question: string;
    type: number;
    textColor: string;
    initialOptions?: string[];
}

const optionQuestionTypes = [1, 2, 9];

export function Question({ question, type, textColor, initialOptions }: QuestionProps) {
    console.log(initialOptions);
    return (
        <div>
            <h2 className={`question-h3`} style={{ color: textColor }}>
                {question}
            </h2>
            <h3 className={`question-type-p`} style={{ color: textColor }}>
                Тип вопроса: {ComponentMap[type].name}
            </h3>
            {optionQuestionTypes.includes(type)  && initialOptions && (
                <>
                    <h3 className={`question-type-p`} style={{ color: textColor }}>
                        Варианты ответов:
                    </h3>
                    
                    <h3 className={`question-type-p`} style={{ color: textColor }}>
                        {initialOptions.map((option, index) => (
                            <li key={index} className="option-item">
                                {option}
                            </li>
                        ))}
                    </h3>
                </>)}
        </div>
    );
}