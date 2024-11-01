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
    return (
        <div>
            <h2 className="question-h3" style={{ color: textColor }}>
                {question}
            </h2>
            <h3 className="question-type-p" style={{ color: textColor }}>
                Тип вопроса: {ComponentMap[type].name}
            </h3>
            {optionQuestionTypes.includes(type) && initialOptions && (
                <>
                    <h3 className="question-type-p" style={{ color: textColor }}>
                        Варианты ответов:
                    </h3>
                    {initialOptions.map((option, index) => (


                        <h3 key={index} className="option-item" style={{ color: textColor }}>
                            <div className='option'>
                                {type === 1 && <img className="option-img" src="/icons/select.svg" alt="select icon" />}
                                {type === 2 && <img className="option-img" src="/icons/checkbox.svg" alt="checkbox icon"style={{ stroke: textColor }} />}
                                <div className='optionText' >
                                    {option.trim() === "" ? `Вариант ${index + 1}` : option}
                                </div>
                                
                            </div>


                        </h3>
                    ))}
                </>
            )}
        </div>
    );
}
