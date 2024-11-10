import { ChangeEvent, useEffect, useState } from 'react';
import {BaseQuestion} from "../BaseQuestion/BaseQuestion.tsx";
import './SingleChoiceQuestion.css';

export function SingleChoiceQuestion({ questionInfo, onAnswerChange, isRequired,
                                       reset, questionColor, textColor }: QuestionProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const answer = event.target.value;
        setSelectedOption(answer);
        onAnswerChange(questionInfo.questionId, questionInfo.question, answer);
    };

    const handleClearSelection = () => {
        setSelectedOption(null);
        onAnswerChange(questionInfo.questionId, questionInfo.question, '');
    };

    useEffect(() => {
        if (reset) {
            setSelectedOption(null);
        }
    }, [reset]);

    return (
        <BaseQuestion
            question={questionInfo.question}
            answer={selectedOption}
            handleClear={handleClearSelection}
            isRequired={isRequired}
            questionColor={questionColor}
            textColor={textColor}
        >
            {questionInfo.options && questionInfo.options.map((option, index) => (
                <label key={index} className={'radio-label'}>
                    <input
                        type="radio"
                        className={'custom-radio'}
                        id={`${questionInfo.questionId}-option-${index}`}
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                    />
                    <span className={'radio-value'}>{option || `Вариант ${index + 1}`}</span>
                    <span
                        className={'radio-value'}
                        style={{color: textColor}}
                    >
                        {option}
                    </span>
                </label>
            ))}
        </BaseQuestion>
    );
}
