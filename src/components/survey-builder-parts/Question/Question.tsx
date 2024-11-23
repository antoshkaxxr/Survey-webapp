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
                                {type === 1 &&
                                    <svg className="option-img" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path fill={textColor} d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                                        </g>
                                    </svg>}
                                {type === 2 &&
                                    <svg className="option-img" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Interface / Checkbox_Unchecked">
                                            <path id="Vector" d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z" stroke={textColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                    </svg>}
                                <div className='optionText'>
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
